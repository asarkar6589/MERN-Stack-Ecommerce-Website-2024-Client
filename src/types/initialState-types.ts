import { User } from "./api-types";

export interface initialUserStateType {
    user: User | null, // it may possible that the user is not logged in.
    loading: boolean
}


// for cart
export interface cartItemsType {
    id: string,
    photo: string,
    price: number,
    quantity: number,
    name: string,
    stock: number,
}
export interface ShippingAddress {
    address: string,
    city: string,
    country: string,
    pinCode: number | undefined
}
export interface initialCartStateType {
    loading: boolean,
    cartItems: cartItemsType[]
    subtotal: number,
    shippingCharge: number,
    tax: number,
    discount: number,
    total: number,
    shippingAddress: ShippingAddress
}
