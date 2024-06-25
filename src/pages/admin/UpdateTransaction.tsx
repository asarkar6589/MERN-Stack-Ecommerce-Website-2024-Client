import { useNavigate, useParams } from "react-router-dom"
import AdminSideBar from "../../components/admin/AdminSideBar"
import { useGetOrderByAdminIdQuery, useUpdateOrderByAdminMutation } from "../../redux/api/order";
import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import toast from "react-hot-toast";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { GetUpdateOrderByAdminResponse } from "../../types/api-types";

const UpdateTransaction = () => {
    const navigate = useNavigate();
    const params = useParams();
    const id = params.id!;
    const { data, isLoading, refetch } = useGetOrderByAdminIdQuery(id);
    const [name, setName] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [subTotal, setSubTotal] = useState<number>(0);
    const [shippingCharges, setShippingCharges] = useState<number>(0);
    const [tax, setTax] = useState<number>(0);
    const [discount, setDiscount] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const [updateOrder] = useUpdateOrderByAdminMutation();

    const processOrder = async () => {
        try {
            const res = await updateOrder(id);

            if ("data" in res) {
                toast.success("Order Updated Successfully");
                navigate("/admin/transaction");
            }
            else {
                const error = res.error as FetchBaseQueryError;
                const messageResponse = error.data as GetUpdateOrderByAdminResponse;
                toast.error(messageResponse.message);
            }
        } catch (error: any) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        refetch();
        if (data) {
            setName(data.order.user.name);

            // concanicate the address, city pincode and then paste it in the address.
            const { address: Address, city, pinCode, country } = data.order.shippingAddress
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
        <div className="w-full flex justify-between h-full mt-3">
            {/* Admin Sidebar */}
            <section>
                <AdminSideBar />
            </section>

            {
                isLoading ? <Loader /> : (
                    <section className="w-3/4 p-5 px-10 flex gap-5 h-screen mt-16">
                        {/* photo */}
                        <div className="rounded-lg w-full flex flex-col h-auto mt-5">
                            <h1 className="mt-7 text-4xl text-center font-extralight mb-11">Ordered Items</h1>

                            {
                                data && data.order.product.map((i, idx) => (
                                    <OrderedProductCard
                                        key={idx}
                                        photo={i.photo}
                                        name={i.name}
                                        price={i.price}
                                        quantity={i.quantity}
                                    />
                                ))
                            }
                        </div>


                        {/* info */}
                        <div className="w-full flex flex-col rounded-lg  h-screen p-11">
                            <h1 className="text-4xl text-center font-extralight">Order Information</h1>

                            <div className="mt-11">
                                <h1 className="font-bold text-xl">User Information</h1>

                                <p className="mt-5">Name : {name}</p>
                                <p className="mt-5">Address: {address}</p>
                            </div>

                            <div className="mt-5">
                                <h1 className="font-bold text-xl">Amount Information</h1>

                                <p className="mt-5">Subtotal : ₹{subTotal}</p>
                                <p className="mt-5">Shipping Charges: ₹{shippingCharges}</p>
                                <p className="mt-5">Tax: ₹{tax}</p>
                                <p className="mt-5">Discount: ₹{discount}</p>
                                <p className="mt-5">Total: ₹{total}</p>
                            </div>

                            <div className="mt-5">
                                <h1 className="font-bold text-xl">Status</h1>

                                <p className="mt-5">Status : {
                                    status === "Processing" ? <span className="text-green-700">{status}</span> : status === "Shipped" ? <span className="text-blue-700 ">{status}</span> : <span className="text-red-700 ">{status}</span>
                                }</p>

                                {
                                    status === "Deliverd" ? <span></span> : <button onClick={processOrder} className="w-96 rounded-md outline-none border p-3 mt-7 bg-green-700">Process Order</button>
                                }
                            </div>
                        </div>
                    </section>
                )
            }
        </div>
    )
}

export default UpdateTransaction;

interface OderedProductCard {
    photo: string,
    name: string,
    price: number,
    quantity: number,
}
const OrderedProductCard = ({ photo, name, price, quantity }: OderedProductCard) => {
    return (
        <div className="flex w-full gap-5 mb-5">
            {
                photo !== " " && <img src={`${photo}`} alt={`${name}`} className="w-11 h-11 rounded-full" />
            }

            <p>{name}</p>

            <p>{price / quantity} X {quantity} = {price}</p>
        </div>
    )
}
