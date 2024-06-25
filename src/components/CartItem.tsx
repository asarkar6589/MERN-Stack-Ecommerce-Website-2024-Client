import { FaTrash } from "react-icons/fa";
import { cartItemsType } from "../types/initialState-types";

export type CartCard = {
    cartItem: cartItemsType,
    incrementHandeler: (cart: cartItemsType) => void,
    decrementHandeler: (cart: cartItemsType) => void,
    deleteHandeler: (id: string) => void,
}

const CartItem = ({ cartItem, incrementHandeler, decrementHandeler, deleteHandeler }: CartCard) => {

    const { photo, name, price, quantity, id } = cartItem;

    return (
        <section className="flex flex-col md:flex-row justify-around items-center mb-6 md:mb-11 text-lg mt-5">
            <div className="mb-4 md:mb-0">
                <img src={`${photo}`} alt={cartItem.name} style={{
                    width: "100%",
                    maxWidth: "10rem",
                    height: "auto",
                }} />
            </div>

            <div className="mb-4 md:mb-0">
                <h1 className="text-center md:text-left">{name}</h1>
                <p className="text-center md:text-left">Rs: {price}</p>
            </div>

            <div className="w-full md:w-20 flex flex-row justify-center items-center gap-3">
                <div>
                    <button onClick={() => decrementHandeler(cartItem)} className="border w-7 h-7 rounded-md font-extrabold">-</button>
                </div>
                <span>
                    {quantity}
                </span>
                <div>
                    <button onClick={() => incrementHandeler(cartItem)} className="border w-7 h-7 rounded-md font-extrabold">+</button>
                </div>
            </div>

            <div>
                <button onClick={() => deleteHandeler(id)}>
                    <FaTrash />
                </button>
            </div>
        </section>
    )
}

export default CartItem;
