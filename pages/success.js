import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import {
    selectCart,
    clearCart,
    useAppDispatch
} from '../store'
import { Box, Stack, Heading, Text, Button } from '@chakra-ui/react'
import Layout from '@/components/Layout'

export default function SuccessPage() {
    const { push } = useRouter()
    const dispatch = useAppDispatch()
    const { items } = useSelector(selectCart)

    useEffect(() => items.length !== 0 && dispatch(clearCart()), [dispatch, items])

    return (
        <Layout title="Payment Successful">
            <Stack spacing={5}>
                <Heading as="h1">Thank you for your order</Heading>
                <Text as="p">We are currently processing your order and 
                will send you a confirmation email shortly.
                </Text>
                <Box>
                    <Button colorScheme="blue" onClick={() => push('/shop')}>Continue Shopping</Button>
                </Box>
            </Stack>
        </Layout>
    )
}
