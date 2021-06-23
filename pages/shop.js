import { useState } from 'react'
import Image from 'next/image'
import {useRouter} from 'next/router'
import Layout from '@/components/Layout'
import { getProducts } from '@/lib/products'
import { Flex, Grid, Box, Text, Menu, MenuButton, MenuList, MenuItemOption, MenuOptionGroup, Button } from "@chakra-ui/react"

export default function ShopPage({products}) {
    const { push } = useRouter()

    const [sortType, setSortType] = useState(1)

    const handleSort = (a, b) => {
        switch(sortType) {
            case 1:
                if(a.title > b.title) return 1
                if(a.title < b.title) return -1
                return 0
            case 2:
                if(a.title < b.title) return 1
                if(a.title > b.title) return -1
                return 0
            case 3:
                if(a.price > b.price) return 1
                if(a.price < b.price) return -1
                return 0
            case 4:
                if(a.price > b.price) return -1
                if(a.price < b.price) return 1
                return 0
            default:
                return 0
        }
    }

    return (
        <Layout>
            <Flex marginBottom={4} fontWeight="semibold" justifyContent="space-between" alignItems="center">
                <Text>Items ({products.length})</Text>
                <Menu closeOnSelect={false} placement="bottom-end">
                    <MenuButton as={Button} colorScheme="orange">
                        Sort By
                    </MenuButton>
                    <MenuList>
                        <MenuOptionGroup defaultValue={1} value={sortType} type="radio">
                            <MenuItemOption value={1} onClick={() => setSortType(1)}>Name, A-Z</MenuItemOption>
                            <MenuItemOption value={2}  onClick={() => setSortType(2)}>Name, Z-A</MenuItemOption>
                            <MenuItemOption value={3} onClick={() => setSortType(3)}>Low to High Price</MenuItemOption>
                            <MenuItemOption value={4} onClick={() => setSortType(4)}>High to Low Price</MenuItemOption>
                        </MenuOptionGroup>
                    </MenuList>
                </Menu>
            </Flex>
            <Grid templateColumns={{base: "repeat(2, 1fr)", lg: "repeat(3,1fr)", xl: "repeat(4, 1fr)"}} gap={6}>
                { products.sort(handleSort).map(product => (
                    <Box cursor="pointer" onClick={() => push(`/product/${product.id}`)} key={product.id}>
                        <Box backgroundColor="#f2eee9" cursor="pointer" _hover={{ transform: 'scale(1.05,1.05)'}} marginBottom={3}>
                            <Image alt={product.title} className="shop-product-image" src={product.colors[0].image} width="500px" height="500px" />
                        </Box>
                        <Box fontWeight="semibold" textAlign={{base: 'center', md: 'start'}}>
                            <Text fontSize={['13px', '15px', '17px']}>{product.title}</Text>
                            <Flex flexDirection={{base: 'column', md: "row" }} justifyContent="space-between">
                                <Text>${product.price.toFixed(2)}</Text>
                                {product.quantity === 0 && <Text fontWeight="bold" fontStyle="italic">Out of Stock</Text>}
                            </Flex>
                        </Box>
                    </Box>
                ))}
            </Grid>
        </Layout>
    )
}

export async function getStaticProps(){

    return {
        props: {
            products: getProducts()
        }
    }
}