import { CowboyHats } from './db'
import { LIST_OF_QUANTITIES, LIST_OF_SIZES } from '@/config/index'

export function getProducts() {
    const products = CowboyHats.map((product, i) => {
        const quantity = LIST_OF_QUANTITIES[i] || 0

        return {...product, quantity, sizes: LIST_OF_SIZES}
    })

    return products
}