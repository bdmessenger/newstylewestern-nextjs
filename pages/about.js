import Layout from '@/components/Layout'
import { Link, Stack, Heading, Text } from '@chakra-ui/react'

export default function AboutPage() {
    return (
        <Layout title="About New Style Western">
            <Stack>
                <Heading as="h2">About New Style Western</Heading>
                <Text>A fake store built with React and NodeJS. Implemented <Link href="https://stripe.com/">Stripe</Link> for the checkout process.</Text>
                <Text>
                    Data for the hats was obtained from
                    {' '}
                    <Link href="https://stetson.com/">https://stetson.com</Link>
                </Text>
                <Text>Developed By: Brant Messenger</Text>
            </Stack>
        </Layout>
    )
}
