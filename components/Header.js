import { useContext } from 'react'
import { UserContext } from '@/contexts/userContext'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { auth } from '../firebase'
import { Box, Flex, Heading, Icon, Avatar, Circle, Container, Spacer, Text } from "@chakra-ui/react"
import { AiOutlineShopping } from 'react-icons/ai'
import { RiAccountCircleFill } from 'react-icons/ri'

import { selectCart } from '../store'



export default function Header() {
    const {pathname, push} = useRouter()
    const { items, itemCount } = useSelector(selectCart)
    const { user } = useContext(UserContext)

    const CustomLink = ({children, href}) => (
        <Link href={href} passHref={true}>
            <Box cursor="pointer" _hover={{borderBottom: '1px solid white'}} borderBottom={pathname === href ? '1px solid white' : ''}>
                {children}
            </Box>
        </Link>
    )


    return (
        <Box position="relative" zIndex={10} bg={pathname !== '/' ? '#caae7f' : ''} padding={4} color="white">
            <Container maxW="container.xl">
                <Flex alignItems="center" gridGap={2} flexDirection={{base: 'column', md: 'row'}}>
                    <Heading cursor="pointer" onClick={() => push('/')} fontSize={{base: 'xl', lg: '2xl'}}>New Style Western</Heading>
                    <Spacer/>
                    <Flex fontSize={{base: '13px', md: "16px"}} alignItems="center" gridGap={8}>
                        <CustomLink href="/">Home</CustomLink>
                        <CustomLink href="/shop">Shop</CustomLink>
                        <CustomLink href="/about">About</CustomLink>

                        { user ? (
                            <Flex _hover={{borderBottom: '1px solid white'}} cursor="pointer" alignItems="center" gridGap={2} onClick={async () => {
                                await auth.signOut()
                                push('/signin')
                            }}>
                                Sign Out
                                {' '}
                                <Avatar src="/images/profile-icon.jpg" size="xs" />
                            </Flex>
                        ) : (
                            <CustomLink href="/signin">
                                <Flex cursor="pointer" alignItems="center" gridGap={2}>
                                    <Text>Sign In </Text>
                                    {/* <Icon as={RiAccountCircleFill} w={7} h={7} /> */}
                                </Flex>
                            </CustomLink>
                        )}

                        <Box cursor="pointer" position="relative" onClick={() => push('/cart')}>
                            <Icon as={AiOutlineShopping} w={8} h={8} />
                            { items.length !== 0 && (
                                <Circle top={-1} right={-2} fontSize="10px" fontWeight="semibold" size="20px" position="absolute"  bg="#645233" color="white">
                                    {itemCount}
                                </Circle>
                            )}
                        </Box>
                    </Flex>
                </Flex>
            </Container>
        </Box>
    )
}
