import { useState, useEffect, useContext } from 'react'
import { UserContext } from '@/contexts/userContext'
import { useRouter } from 'next/router'
import { useSelector } from 'react-redux'
import { useStripe } from '@stripe/react-stripe-js'
import Layout from '@/components/Layout'
import {
    selectCart
} from '../store'
import { Heading, Stack, Input, Button, FormControl, FormLabel } from '@chakra-ui/react'

export default function CheckoutPage() {
    const { push } = useRouter()
    const stripe = useStripe()
    const { items, itemCount, totalCost } = useSelector(selectCart)

    const { user } = useContext(UserContext)

    const [email, setEmail] = useState('')

    const checkout = async (customer_email = email) => {
        const line_items = items.map(item => ({
            quantity: item.quantity,
            price_data: {
                currency: 'usd',
                unit_amount: item.price * 100,
                product_data: {
                    name: item.title,
                    description: item.description,
                    images: [item.color.image]
                }
            }
        }))

        const res = await fetch('/api/checkout', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ line_items, customer_email})
        })

        const { sessionId } = await res.json()

        const { error } = await stripe.redirectToCheckout({ sessionId })

        if (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if(items.length === 0) push('/shop')
    }, [items, push])

    
    useEffect(() => {
        if(user?.email) checkout(user.email)
    }, [user, items, stripe])

    const handleGuestCheckout = async e => {
        e.preventDefault()
        checkout()
    }

    return (
        <Layout title="Checkout">
            <Stack marginBottom={12} spacing={4}>
                <Heading as="h2" size="2xl">Checkout Summary</Heading>
                <Heading as="h3" size="xl">Total Items: {itemCount}</Heading>
                <Heading as="h4" size="lg">Amount to Pay: ${totalCost.toFixed(2)}</Heading>
            </Stack>
            {
                user?.email ? (
                    <div>Redirecting to shopping cart...</div>
                ) : (
                    <form onSubmit={handleGuestCheckout}>
                        <Stack maxWidth="700px" spacing={5}>
                            <FormControl>
                                <FormLabel htmlFor="email">Email</FormLabel>
                                <Input
                                    required={true}
                                    type='email'
                                    name="email"
                                    onChange={e => setEmail(e.target.value)}
                                    placeholder='Email'
                                    value={email}
                                />
                            </FormControl>
                            <Button type='submit'>Continue To Checkout</Button>
                        </Stack>
                    </form>
                )
            }
            
        </Layout>
    )
}
