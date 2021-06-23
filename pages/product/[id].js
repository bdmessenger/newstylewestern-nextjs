import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Layout from '@/components/Layout'
import { getProducts } from '@/lib/products'
import { addItem, useAppDispatch } from '../../store'
import {TiArrowBack} from 'react-icons/ti'
import {FiMinus, FiPlus} from 'react-icons/fi'
import { Box, Grid, Stack, Heading, Text, Link as ChakraLink, Icon, Flex, Circle, Divider, Button, useToast  } from '@chakra-ui/react'

const sizeDescriptions = [
    'Small', 
    'Medium',
    'Large', 
    'X-Large'
]

export default function ProductPage({product}) {
    const dispatch = useAppDispatch()
    const toast = useToast()
    const [currentColorIndex, setCurrentColorIndex] = useState(0)
    const [currentSizeIndex, setCurrentSizeIndex] = useState(0)
    const [quantity, setQuantity] = useState(1)

    const { 
        title, 
        price, 
        description, 
        colors, 
        sizes, 
        quantity: maxQuantity 
    } = product

    const { name: colorName, image: productImage } = colors[currentColorIndex]

    const handleAddCart = () => {
        dispatch(addItem({
            title: product.title,
            description: product.description,
            price: product.price,
            maxQuantity: product.quantity,
            quantity,
            color: product.colors[currentColorIndex],
            size: product.sizes[currentSizeIndex]
        }))

        toast({
            position: "top-right",
            title: 'Item(s) Added To Cart',
            status: 'success',
            isClosable: true,
            duration: 4000
        })
    }

    return (
        <Layout title={title}>
            <Stack spacing={5}>
                <ChakraLink  as={Link} href="/shop">
                    <Flex alignItems="center" maxWidth="150px" cursor="pointer">
                        <Icon fontSize="20px" as={TiArrowBack}/>
                        {' '}
                        Go Back To Shop
                    </Flex>
                </ChakraLink>
                <Grid gridGap={["40px","40px","60px"]} templateColumns={{lg: 'repeat(2,1fr)'}}>
                    <Box position="relative" backgroundColor="#f2eee9" width={["100%", "100%", "80%", "100%"]} height={["300px", "400px", "600px"]}>
                        <Image alt={title} src={productImage} layout="fill"/>
                    </Box>
                    <Stack spacing={6}>
                        <Heading>{title}</Heading>
                        <Text fontSize="25px">${price.toFixed(2)}</Text>
                        <Text>
                            Color:  <Text as="span" fontWeight="semibold">{colorName}</Text>
                        </Text>
                        <Flex gridGap={5}>
                            {colors.map((color, i) => (
                                <Circle key={i} cursor="pointer" onClick={() => setCurrentColorIndex(i)} border={i === currentColorIndex ? '3px solid white' : ''} boxShadow={`0 0 0 ${i === currentColorIndex ? '3px' : '0'} ${color.hexCode}`} bg={color.hexCode} size="40px" />
                            ))}
                        </Flex>
                        <Divider/>
                        <Text>
                            Size:
                            {' '}
                            <Text as="span" fontWeight="semibold">
                                {sizeDescriptions[currentSizeIndex]}
                            </Text>
                        </Text>
                        <Flex gridGap={5}>
                            {sizes.map((size, i) => (
                                <Box
                                    key={i}
                                    userSelect="none" 
                                    cursor="pointer" 
                                    border={i === currentSizeIndex ? '1px solid black' : '1px solid #e9eae5'} 
                                    py={2} 
                                    px={3}
                                    onClick={() => setCurrentSizeIndex(i)}
                                >
                                    {size}
                                </Box>
                            ))}
                        </Flex>
                        <Divider/>
                        <Text>{description}</Text>
                        {
                            maxQuantity > 0 ? (
                                <>
                                    <Flex>
                                        <Button onClick={() => setQuantity(state => {
                                            if(state > 1) state--
                                            return state
                                        })} border="none" borderRadius={0}>
                                            <Icon as={FiMinus} />
                                        </Button>
                                        <Text py={2} px={5}>{quantity}</Text>
                                        <Button onClick={() => setQuantity(state => {
                                            if(state < maxQuantity) state++
                                            return state
                                        })} border="none" borderRadius={0}>
                                            <Icon as={FiPlus} />
                                        </Button>
                                    </Flex>
                                    <Button onClick={handleAddCart} maxWidth={{md: '80%'}} _hover={{bg: '#caae7f'}} bg="#f1d19c">Add To Cart</Button>
                                </>
                            ) : (
                                <Text fontSize="30px">Out of Stock</Text>
                            )
                        }
                    </Stack>
                </Grid>
            </Stack>
        </Layout>
    )
}

export async function getStaticPaths() {
    const products = getProducts()

    const paths = products.map(product => ({
        params: {
            id: product.id.toString()
        }
    }))

    return {
        paths,
        fallback: false
    }
}

export async function getStaticProps({params: {id}}) {
    const product = getProducts().find(product => product.id.toString() === id)

    return {
        props: {
            product
        }
    }
}