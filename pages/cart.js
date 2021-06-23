import Link from 'next/link'
import { useSelector } from 'react-redux'
import {
    useAppDispatch, 
    selectCart, 
    removeItem as removeProduct,
    increaseItemQuantity as increase,
    decreaseItemQuantity as decrease,
    clearCart
} from '../store'
import Layout from '@/components/Layout'
import {FaTrash} from 'react-icons/fa'
import {Box, Flex, Text, Heading, Grid, Image, GridItem, Stack, StackDivider, Button, Icon, Spacer} from '@chakra-ui/react'

export default function CartPage() {
    const dispatch = useAppDispatch()
    const { items, totalCost } = useSelector(selectCart)
    return (
        <Layout title="Cart">
            <Stack spacing={{base: 2, lg: 5}}>
                <Heading>My Cart</Heading>
                { items.length > 0 ? (
                    <Stack 
                        fontWeight="semibold"
                        divider={<StackDivider borderColor="gray.200"/>}
                        spacing={5}
                    >
                        <Grid display={{base: 'none', md: 'grid'}} alignItems="center" gap={10} gridTemplateColumns={{base: "1.5fr 0.5fr 0.5fr 0.3fr 0.1fr", md: "2fr 0.5fr 1fr 0.5fr 0.2fr", lg: "1.2fr 0.3fr 0.5fr 0.5fr 0.1fr"}}>
                            <GridItem>Product</GridItem>
                            <GridItem>Price</GridItem>
                            <GridItem>QTY</GridItem>
                            <GridItem>Total</GridItem>
                        </Grid>
                        { items.map((item, i) => (
                                <Grid key={i} alignItems="center" gap={10} gridTemplateColumns={{base: "1fr", md: "2fr 0.5fr 1fr 0.5fr 0.1fr", lg: "1.2fr 0.3fr 0.5fr 0.5fr 0.1fr"}}>
                                    <Flex alignItems="center" gridGap="50px">
                                        <Image alt={item.title} width="150px" height="150px" src={item.color.image} />
                                        <Text>{item.title} - {item.color.name} / {item.size}</Text>
                                    </Flex>
                                    <Text>
                                        <Text display={['inline', 'inline', 'none']} as="span">Price: </Text>
                                        ${item.price.toFixed(2)}
                                    </Text>
                                    <Stack>
                                        <Text display={['block', 'block', 'none']}>Quantity</Text>
                                        <Flex alignItems="center" width={["100%", "100%", "80%"]}>
                                            <Button onClick={() => dispatch(decrease(item))}>-</Button>
                                            <Spacer/>
                                            {item.quantity}
                                            <Spacer/>
                                            <Button onClick={() => dispatch(increase(item))}>+</Button>
                                        </Flex>
                                    </Stack>
                                    <Text>
                                        <Text display={['inline', 'inline', 'none']} as="span">Total Amount: </Text>
                                        ${(item.quantity * item.price).toFixed(2)}
                                    </Text>
                                    <Button onClick={() => dispatch(removeProduct(item))} colorScheme="red">
                                        <Icon as={FaTrash} />
                                    </Button>
                                </Grid>
                        ))}
                        <Flex alignItems="center" justifyContent="space-between" width="100%">
                            <Box>Subtotal: ${totalCost.toFixed(2)}</Box>
                            <Button onClick={() => {
                            if(window.confirm('Are you sure?')) {
                                dispatch(clearCart())
                            }
                            }} colorScheme="red">Clear Cart</Button>
                        </Flex>
                        <Link href="/checkout" passHref={true}>
                            <Button colorScheme="linkedin">Proceed To Checkout</Button>
                        </Link>
                    </Stack>
                ): (
                    <Stack spacing={5}>
                        <Text fontSize="20px">Cart&apos;s Empty</Text>
                        <Link href="/shop" passHref={true}>
                            <Button maxWidth="600px" colorScheme="orange">Return To Shop</Button>
                        </Link>
                    </Stack>
                )}
            </Stack>
        </Layout>
    )
}
