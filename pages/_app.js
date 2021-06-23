import '@/styles/globals.css'
import { Elements } from '@stripe/react-stripe-js'
import { loadStripe } from '@stripe/stripe-js'
import UserContextProvider from '@/contexts/userContext'
import { ChakraProvider, extendTheme } from "@chakra-ui/react"

import { wrapper } from '../store'

const theme = extendTheme({
  fonts: {
    heading: "'Fira Sans', sans-serif",
    body: "'Fira Sans', sans-serif",
  }
})

const stripePromise = loadStripe(process.env.NEXT_PUBLIC_PUBLISHABLE_KEY)

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider theme={theme}>
      <Elements stripe={stripePromise}>
        <UserContextProvider>
          <Component {...pageProps} />
        </UserContextProvider>
      </Elements>
    </ChakraProvider>
  )
}

MyApp.getInitialProps = wrapper.getInitialAppProps()

export default wrapper.withRedux(MyApp)
