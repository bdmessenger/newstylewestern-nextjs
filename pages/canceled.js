import { useRouter } from 'next/router'
import Layout from '@/components/Layout'
import { Box, Stack, Heading, Text, Button } from '@chakra-ui/react'

export default function CanceledPage() {
    const { push } = useRouter()

    return (
        <Layout title="Canceled Payment">
            <Stack spacing={5}>
                <Heading as="h1">Payment failed</Heading>
                <Text as="p">Payment was not successful</Text>
                <Box>
                    <Button colorScheme="blue" onClick={() => push('/shop')}>Continue Shopping</Button>
                </Box>
            </Stack>
        </Layout>
    )
}
