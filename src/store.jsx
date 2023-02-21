import {configureStore} from '@reduxjs/toolkit'
import cartReducer from './Features/carts/cartSlice'
import modalReducer from './Features/modal/modalSlice'

export const store = configureStore({
    reducer: {
        cart: cartReducer,
        modal: modalReducer,
    }
})