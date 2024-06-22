import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { FC, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../components/Loader";
import { useDeleteOderByUserMutation, useGetOrderByIdQuery } from "../redux/api/order";
import { GetDeleteOrderByUserResponse } from "../types/api-types";

const OrderById: FC = () => {
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id!;
    const { data, isLoading, refetch } = useGetOrderByIdQuery(id);
    const [name, setName] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [subTotal, setSubTotal] = useState<number>(0);
    const [shippingCharges, setShippingCharges] = useState<number>(0);
    const [tax, setTax] = useState<number>(0);
    const [discount, setDiscount] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [deleteOrder] = useDeleteOderByUserMutation();

    const deleteOrderHandler = async () => {
        try {
            const res = await deleteOrder(id);

            if ("data" in res) {
                toast.success(res.data.message);
                navigate("/orders");
            } else {
                const error = res.error as FetchBaseQueryError;
                const messageResponse = error.data as GetDeleteOrderByUserResponse;
                toast.error(messageResponse.message);
            }
        } catch (error: any) {
            toast.error(error.message || "Internal Server Error");
        }
    };

    useEffect(() => {
        refetch();

        if (data) {
            setName(data.order.user.name);

            const { address: Address, city, pinCode, country } = data.order.shippingAddress;
            let fullAddress = Address + " " + city + " " + country + " " + String(pinCode);
            setAddress(fullAddress);

            setSubTotal(data.order.subTotal);
            setShippingCharges(data.order.shippingCharges);
            setTax(data.order.tax);
            setDiscount(data.order.discount);
            setTotal(data.order.total);
            setStatus(data.order.status);
        }
    }, [data]);

    return (
        <div className="flex flex-col items-center w-full mt-16 px-5 sm:px-10">
            {isLoading ? (
                <Loader />
            ) : (
                <div className="flex flex-col w-full gap-5 sm:flex-row">
                    {/* Ordered Items */}
                    <div className="flex flex-col w-full sm:w-1/2 p-3 rounded-lg shadow-2xl">
                        <h1 className="text-4xl text-center font-extralight mt-7 mb-11">Ordered Items</h1>
                        {data &&
                            data.order.product.map((item, idx) => (
                                <OrderedProductCard
                                    key={idx}
                                    photo={item.photo}
                                    name={item.name}
                                    price={item.price}
                                    quantity={item.quantity}
                                />
                            ))}
                    </div>

                    {/* Order Information */}
                    <div className="flex flex-col w-full sm:w-1/2 p-3 rounded-lg shadow-2xl">
                        <button onClick={deleteOrderHandler} className="self-end">
                            <FaTrash />
                        </button>
                        <h1 className="text-4xl text-center font-extralight mt-7 mb-11">Order Information</h1>

                        <div className="mt-11">
                            <h1 className="font-bold text-xl">User Information</h1>
                            <p className="mt-5">Name: {name}</p>
                            <p className="mt-5">Address: {address}</p>
                        </div>

                        <div className="mt-5">
                            <h1 className="font-bold text-xl">Amount Information</h1>
                            <p className="mt-5">Subtotal: ₹{subTotal}</p>
                            <p className="mt-5">Shipping Charges: ₹{shippingCharges}</p>
                            <p className="mt-5">Tax: ₹{tax}</p>
                            <p className="mt-5">Discount: ₹{discount}</p>
                            <p className="mt-5">Total: ₹{total}</p>
                        </div>

                        <div className="mt-5">
                            <h1 className="font-bold text-xl">Status</h1>
                            <p className="mt-5">Status: {status}</p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default OrderById;


interface OderedProductCard {
    photo: string,
    name: string,
    price: number,
    quantity: number,
}
const OrderedProductCard = ({ photo, name, price, quantity }: OderedProductCard) => {
    return (
        <div className="flex w-full gap-5 mb-5">
            <img src={`${import.meta.env.VITE_PHOTO_URL}/${photo}`} alt={`${name}`} className="w-11 h-11 rounded-full" />

            <p>{name}</p>

            <p>{price} X {quantity} = {price * quantity}</p>
        </div>
    )
}
