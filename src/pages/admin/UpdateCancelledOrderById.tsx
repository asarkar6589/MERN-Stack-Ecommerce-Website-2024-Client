import { useParams } from "react-router-dom"
import { useEffect, useState } from "react";
import { useGetCancelledOrderByIdQuery } from "../../redux/api/cancelledOrder";
import AdminSideBar from "../../components/admin/AdminSideBar";
import Loader from "../../components/Loader";

const UpdateCancelledOrderById = () => {
    const params = useParams();
    const id = params.id!;
    const [name, setName] = useState<string>("");
    const [address, setAddress] = useState<string>("");
    const [status, setStatus] = useState<string>("");
    const [refundStatus, setRefundStatus] = useState<string>("");
    const [subTotal, setSubTotal] = useState<number>(0);
    const [shippingCharges, setShippingCharges] = useState<number>(0);
    const [tax, setTax] = useState<number>(0);
    const [discount, setDiscount] = useState<number>(0);
    const [total, setTotal] = useState<number>(0);
    const { data, isLoading, refetch } = useGetCancelledOrderByIdQuery(id);

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

            setRefundStatus(data.order.refundStatus);
        }
    }, [data]);
    return (
        <div className="w-full flex justify-between h-full mt-3">
            {/* Admin Sidebar */}
            <section>
                <AdminSideBar />
            </section>

            {/* Products */}
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
                                    refundStatus === "Refunded" ? <span></span> : <button className="w-96 rounded-md outline-none border p-3 mt-7 bg-green-700">Refund</button>
                                }
                            </div>
                        </div>
                    </section>
                )
            }
        </div>
    )
}

export default UpdateCancelledOrderById;

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

            <p>{price / quantity} X {quantity} = {price}</p>
        </div>
    )
}
