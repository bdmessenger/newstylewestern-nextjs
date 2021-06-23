import {
	configureStore,
	createSlice,
} from "@reduxjs/toolkit"
import {nextReduxCookieMiddleware, wrapMakeStore} from "next-redux-cookie-wrapper"
import {HYDRATE, createWrapper} from "next-redux-wrapper"
import {useDispatch} from "react-redux"

const findCartItemIndex = (state, action) => state.items.findIndex(item => (item.size === action.payload.size & item.color.name === action.payload.color.name))

const sumItems = state => {
    state.itemCount = state.items.reduce((total, product) => total + product.quantity, 0),
    state.totalCost = state.items.reduce((total, product) => total + (product.price * product.quantity), 0)
}

export const cartSlice = createSlice({
    name: "cart",
    initialState: {
        items: [],
        itemCount: 0,
        totalCost: 0
    },
    reducers: {
        addItem (state, action) {
            const itemIndex = findCartItemIndex(state, action)
            if (itemIndex === -1) {
                state.items.push({
                    ...action.payload
                })
            } else {
                state.items[itemIndex] = action.payload
            }

            sumItems(state)
        },
        increaseItemQuantity (state, action) {
            const increaseIndex = findCartItemIndex(state, action)

            if(state.items[increaseIndex].maxQuantity >= state.items[increaseIndex].quantity + 1) {
                state.items[increaseIndex].quantity++
            }

            sumItems(state)
        },
        decreaseItemQuantity (state, action) {
            const decreaseIndex = findCartItemIndex(state, action)

            if(state.items[decreaseIndex].quantity > 1) {
                state.items[decreaseIndex].quantity--
            }

            sumItems(state)
        },
        removeItem (state, action) {
            state.items = state.items.filter(item => !(item.size === action.payload.size & item.color.name === action.payload.color.name))

            sumItems(state)
        },
        clearCart (state) {
            state.items = []
            state.itemCount = 0
            state.totalCost = 0
        }
    },
    extraReducers: {
		[HYDRATE]: (state, {payload}) => ({
			...state,
			...payload.cart,
		}),
	},
})

export const { addItem, increaseItemQuantity, decreaseItemQuantity, removeItem, clearCart } = cartSlice.actions

export const selectCart = state => state[cartSlice.name]

const makeStore = wrapMakeStore(() =>
  configureStore({
    reducer: {
        [cartSlice.name]: cartSlice.reducer
    },
    middleware: (getDefaultMiddleware) =>
      getDefaultMiddleware().prepend(
        nextReduxCookieMiddleware({
          subtrees: ['cart'],
        })
      ),
  })
);

export const useAppDispatch = () => useDispatch()

export const wrapper = createWrapper(makeStore)