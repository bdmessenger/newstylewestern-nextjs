import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { useFormik } from 'formik'
import Layout from '@/components/Layout'
import { Button, Stack, Heading, FormControl, FormLabel, Input, Text, Box, Link } from '@chakra-ui/react'
import * as Yup from 'yup'
import { auth, createUserProfileDocument } from '../firebase'
import withAuth from '@/helpers/withAuth'

const SignUpSchema = Yup.object().shape({
    firstName: Yup.string().max(10, 'Too long for first name').required('Required First Name'),
    email: Yup.string().email('Invalid Email').required('Required Email'),
    password: Yup.string().min(8, 'Too short for a password').required('Required Password')
})


function SignUpPage() {
    const [error, setError] = useState(null)
    const { push } = useRouter()

    const onSubmit = async (values, { setSubmitting }) => {
        const { firstName, email, password } = values
    
        try {
            const { user } = await auth.createUserWithEmailAndPassword(email, password)
            await createUserProfileDocument(user, { displayName: firstName})
            setSubmitting(false)
            push('/shop')
        } catch (error) {
            console.log('error', error)
            setSubmitting(false)
            setError(error)
        }
    }

    const formik = useFormik({
        initialValues: {
            firstName: '',
            email: '',
            password: ''
        },
        onSubmit,
        validationSchema: SignUpSchema
    })

    useEffect(() => {
        setError(null)
    }, [formik.values.firstName, formik.values.email, formik.values.password])


    return (
        <Layout title="Sign Up">
            <Stack spacing={6}>
                <Heading>Sign Up</Heading>
                { error && <Text color="red" fontSize="17px">Cannot Create User</Text>}
                <form onSubmit={formik.handleSubmit}>
                    <Stack spacing={4} maxW={{base: '100%', lg: '50%'}}>
                        <FormControl id="firstName">
                            <FormLabel>First Name</FormLabel>
                            <Input
                                type="text" 
                                name="firstName" 
                                onChange={formik.handleChange}
                                value={formik.values.firstName}
                            />
                            <Box p={2} color="red">{formik.errors.firstName}</Box>
                        </FormControl>
                        <FormControl id="email">
                            <FormLabel>Email</FormLabel>
                            <Input
                                type="email" 
                                name="email" 
                                onChange={formik.handleChange}
                                value={formik.values.email}
                            />
                            <Box p={2} color="red">{formik.errors.email}</Box>
                        </FormControl>
                        <FormControl id="password">
                            <FormLabel>Password</FormLabel>
                            <Input 
                                type="password" 
                                name="password" 
                                onChange={formik.handleChange}
                                value={formik.values.password}
                            />
                            <Box p={2} color="red">{formik.errors.password}</Box>
                        </FormControl>
                        <Button colorScheme="teal" size="lg" type="submit">
                            Sign Up
                        </Button>
                    </Stack>
                </form>    
                <Link onClick={() => push('/signin')}>Have an account? Sign in.</Link>
            </Stack>
        </Layout>
    )
}

export default withAuth(SignUpPage)
