import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { Elements, PaymentElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Navigate, useLocation, useNavigate } from "react-router-dom";
import { useNewOrderMutation } from "../redux/api/order";
import { resetCart } from "../redux/reducer/cartReducer";
import { NewOrderResponse } from "../types/api-types";
import { initialCartStateType, initialUserStateType } from "../types/initialState-types";

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_KEY);

const CheckOutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
    const navigate = useNavigate();
    const [isProcessing, setIsProcessing] = useState<boolean>(false);
    const [newOrder] = useNewOrderMutation();
    const dispatch = useDispatch();

    const { cartItems, shippingAddress, shippingCharge, total, discount, subtotal, tax } = useSelector((state: { cartReducer: initialCartStateType }) => state.cartReducer);

    const { user } = useSelector((state: { userReducer: initialUserStateType }) => state.userReducer);

    const submitHandeler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (!stripe || !elements) {
            return;
        }
        setIsProcessing(true);

        const { paymentIntent, error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                return_url: window.location.origin
            },
            redirect: "if_required"
        });

        if (error) {
            setIsProcessing(false);
            return toast.error(error.message || "Something Went Wrong");
        }

        if (paymentIntent.status === "succeeded") {
            const res = await newOrder({
                product: cartItems,
                discount,
                subTotal: subtotal,
                shippingAddress,
                shippingCharges: shippingCharge,
                tax,
                user: user?._id!,
                total
            });

            if ("data" in res) {
                toast.success(res.data.message);
                dispatch(resetCart());
                navigate("/orders")
            }
            else {
                const error = res.error as FetchBaseQueryError;
                const messageResponse = error.data as NewOrderResponse;
                toast.error(messageResponse.message);
            }
        }

        setIsProcessing(false);
    }

    return (
        <div className="w-96 m-auto mt-32 h-screen">
            <form onSubmit={submitHandeler}>
                <PaymentElement />

                <button type="submit" disabled={isProcessing} className="w-96 mt-7 rounded-md outline-none border p-3 bg-green-700">{
                    isProcessing ? "Processing" : "Pay"
                }</button>
            </form>
        </div>
    )
}

const CheckOut = () => {
    const location = useLocation();
    const clientSecret: string | undefined = location.state;

    if (!clientSecret) {
        return <Navigate to={"/shipping"} />
    }

    return (
        <Elements options={{
            clientSecret
        }} stripe={stripePromise}>
            <CheckOutForm />
        </Elements>
    )
}

export default CheckOut;
