import { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import { useFormik } from 'formik'
import { auth } from '../firebase'
import { Button, Stack, Heading, FormControl, FormLabel, Input, Text, Box, Link } from '@chakra-ui/react'
import * as Yup from 'yup'
import withAuth from '@/helpers/withAuth'


const SignInSchema = Yup.object().shape({
    email: Yup.string().email('Invalid Email').required('Required Email'),
    password: Yup.string().min(8, 'Too short for a password').required('Required Password')
})

function SignInPage() {
    const { push } = useRouter()
    const [error, setError] = useState(null)

    const onSubmit = async (values, { setSubmitting }) => {
        const { email, password } = values
    
        try {
            await auth.signInWithEmailAndPassword(email, password)
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
            email: '',
            password: ''
        },
        onSubmit,
        validationSchema: SignInSchema
    })

    useEffect(() => {
        setError(null)
    }, [formik.values.email, formik.values.password])

    return (
        <Layout title="Sign In">
            <Stack spacing={8}>
                <Heading>Sign In</Heading>
                { error && <Text color="red" fontSize="17px">Invalid Email / Password</Text>}
                <form onSubmit={formik.handleSubmit}>
                    <Stack spacing={4} maxW={{base: '100%', lg: '50%'}}>
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
                            Sign In
                        </Button>
                    </Stack>
                </form>
                <Link onClick={() => push('/signup')}>Don&apos;t have an account? Sign up.</Link>
            </Stack>
        </Layout>
    )
}

export default withAuth(SignInPage)
