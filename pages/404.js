import Layout from '@/components/Layout'
import { Center, Icon, Stack, Text  } from "@chakra-ui/react"
import {ImWarning} from 'react-icons/im'

export default function NotFoundPage() {
    return (
        <Layout>
            <Center width="100%" height="70vh" fontSize={{base: '50px', md: '60px'}}>
                <Stack textAlign="center">
                    <Icon marginX="auto" as={ImWarning}/>
                    <Text>Whoops!</Text>
                    <Text>Page Does Not Exist</Text>
                </Stack>
            </Center>
        </Layout>
    )
}