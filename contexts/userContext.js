import { createContext, useState, useEffect } from 'react'
import {Center, Spinner} from '@chakra-ui/react'
import { auth, createUserProfileDocument } from '../firebase/index'

export const UserContext = createContext()

const UserContextProvider = ({children}) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
            if (userAuth) {
                const userRef = await createUserProfileDocument(userAuth)
                userRef.onSnapshot(snapShot => {
                    setUser({
                        id: snapShot.id,
                        ...snapShot.data()
                    })
                    setLoading(false)
                })
            } else {
                setUser(userAuth)
                setLoading(false)
            }
        })

        return () => unsubscribeFromAuth()
    }, [])

    const userValues = { user, loading}

    if (loading) return <Center bg="black" color="white" height="100vh"><Spinner color="red.500" size="xl" /></Center>

    return (
        <UserContext.Provider value={userValues}>
            { children }
        </UserContext.Provider>
    )
}

export default UserContextProvider