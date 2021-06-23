import { useEffect, useContext } from 'react'
import { useRouter } from 'next/router'
import { UserContext } from '@/contexts/userContext'

const withAuth = (Component) => {
    const Auth = (props) => {
        const { push } = useRouter()
        const { user } = useContext(UserContext)

        useEffect(() => {
            if(user) push('/shop')
        }, [])

        return (
            <>
                { !user ? <Component {...props} /> : null}
            </>
        )
    }

    if (Component.getInitialProps) {
        Auth.getInitialProps = Component.getInitialProps
    }
    
    return Auth
}

export default withAuth