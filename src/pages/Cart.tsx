import { useEffect, useState } from "react";
import CartItem from "../components/CartItem";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { cartItemsType, initialCartStateType } from "../types/initialState-types";
import toast from "react-hot-toast";
import { addToCartFun, calculateDiscount, calculatePrice, removeFromCart } from "../redux/reducer/cartReducer";
import { useCheckCouponQuery } from "../redux/api/coupon";

const Cart: React.FC = () => {
    const { cartItems, subtotal, shippingCharge, tax, discount, total } = useSelector((state: { cartReducer: initialCartStateType }) => state.cartReducer);
    const dispatch = useDispatch();
    const [name, setName] = useState<string>("");
    const [cart, setCart] = useState<cartItemsType[]>([]);
    const [discountApplied, setDiscountApplied] = useState<boolean>(false);

    const incrementHandler = (cartItem: cartItemsType) => {
        if (cartItem.quantity >= cartItem.stock) {
            toast.error("Out of stock");
            return;
        }

        const updatedCart = cart.map(item =>
            item.id === cartItem.id
                ? { ...item, quantity: item.quantity + 1 }
                : item
        );
        setCart(updatedCart);

        dispatch(addToCartFun({
            ...cartItem,
            quantity: cartItem.quantity + 1
        }));
    };

    const decrementHandler = (cartItem: cartItemsType) => {
        if (cartItem.quantity <= 1) {
            return;
        }

        const updatedCart = cart.map(item =>
            item.id === cartItem.id
                ? { ...item, quantity: item.quantity - 1 }
                : item
        );
        setCart(updatedCart);

        dispatch(addToCartFun({
            ...cartItem,
            quantity: cartItem.quantity - 1
        }));
    };

    const { data } = useCheckCouponQuery(name);

    const checkDiscount = () => {
        if (data) {
            toast.success(`Discount of Rs ${data.discount} is applied`);
            dispatch(calculateDiscount(data.discount));
            setDiscountApplied(true);
        }
        else {
            toast.error("No Coupon exists");
        }
    };

    const deleteHandler = (id: string) => {
        dispatch(removeFromCart(id));
    }

    useEffect(() => {
        if (cartItems) {
            setCart(cartItems);
        }
    }, [cartItems]);

    useEffect(() => {
        dispatch(calculatePrice());
    }, [cartItems, discount]);

    return (
        <div className="mt-8 md:mt-32 px-4 md:px-8 lg:px-16 xl:px-32">
            {/* Products */}
            <section className="md:flex justify-between mb-8" style={{ marginTop: "5rem" }}>
                <div className="w-full md:w-2/3">
                    {
                        cart.length === 0 ? <h1 className="text-4xl font-thin">No Items Added</h1> : cart.map(i => (
                            <CartItem
                                incrementHandeler={incrementHandler}
                                decrementHandeler={decrementHandler}
                                deleteHandeler={deleteHandler}
                                cartItem={i}
                                key={i.id}
                            />
                        ))
                    }
                </div>

                {/* Prices */}
                <div className="w-full md:w-1/3 mt-4 md:mt-0 md:ml-4 lg:ml-8">
                    <div className="text-lg mb-5">
                        <p><b>Subtotal:</b> Rs-{subtotal}</p>
                        <p><b>Shipping Charges</b>: Rs-{shippingCharge}</p>
                        <p><b>Tax</b>: Rs-{tax}</p>
                        <p><b>Discount</b>: Rs-{discount}</p>
                        <p><b>Total</b>: Rs-{total}</p>
                    </div>

                    <div className="flex flex-col md:flex-row gap-4">
                        <input
                            type="text"
                            name="code"
                            id="code"
                            placeholder="Coupon code"
                            className="border h-9 md:w-52 p-2 rounded-lg"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                        {
                            discountApplied ? <span>✅</span> : (
                                <button className="h-9 w-full md:w-auto flex justify-center items-center rounded-lg bg-green-700 font-semibold" onClick={checkDiscount} disabled={cartItems.length === 0}>Apply Coupon</button>
                            )
                        }
                    </div>

                    {
                        cart.length === 0 ? null : (
                            <Link to="/shipping" className="h-9 w-full md:w-52 flex justify-center items-center rounded-lg bg-green-700 font-semibold mt-4 md:mt-0">Checkout</Link>
                        )
                    }
                </div>
            </section>
        </div>
    );
}

export default Cart;
