import Head from 'next/head'
import { Box, Container} from '@chakra-ui/react'


function Layout({children, title, description, keywords}) {
    return (
        <Box>
            <Head>
                <title>{title}</title>
                <meta name="description" content={description} />
                <meta name="keywords" content={keywords} />
            </Head>
            <Container maxW="container.xl" marginY={5}>
                {children}
            </Container>
        </Box>
    )
}

Layout.defaultProps = {
    title: 'New Style Western | Modern Cowboy Hats',
    description: 'The best site to buy modern cowboy hats for all ages.',
    keywords: 'New Style Western, Western, Cowboy Hats, Hats, cowboy hats store'
}

export default Layout