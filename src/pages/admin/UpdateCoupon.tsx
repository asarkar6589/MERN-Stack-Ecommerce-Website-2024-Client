import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Loader from "../../components/Loader";
import AdminSideBar from "../../components/admin/AdminSideBar";
import { useDeleteCouponMutation, useGetCouponByIdQuery, useUpdateCouponMutation } from "../../redux/api/coupon";
import { DeleteCouponByIdResponse, UpdateCouponByIdResponse } from "../../types/api-types";

const UpdateCoupon = () => {
    const params = useParams();
    const navigate = useNavigate();
    const id = params.id!;
    const [title, setTitle] = useState<string>("");
    const [Discount, setDiscount] = useState<number>(0);

    const { data, refetch, isLoading } = useGetCouponByIdQuery(id);
    const [updateCoupon] = useUpdateCouponMutation();
    const [deleteCoupon] = useDeleteCouponMutation();

    const submitHandeler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        // Todo -> Update the coupon and delete it, and then use it in redux to give discount.

        try {

            const res = await updateCoupon({
                id,
                name: title,
                discount: Discount
            });

            if ("data" in res) {
                toast.success(res.data.message);
                navigate("/admin/coupon/create");
            }
            else {
                const error = res.error as FetchBaseQueryError;
                const messageResponse = error.data as UpdateCouponByIdResponse;
                toast.error(messageResponse.message);
            }

        } catch (error: any) {
            toast.error(error.message || "Internal Server Error");
        }
    }

    const deleteHandeler = async () => {
        try {
            const res2 = await deleteCoupon(id);

            if ("data" in res2) {
                toast.success(res2.data.message);
                navigate("/admin/coupon/create");
            }
            else {
                const error = res2.error as FetchBaseQueryError;
                const messageResponse = error.data as DeleteCouponByIdResponse;
                toast.error(messageResponse.message);
            }
        } catch (error: any) {
            toast.error(error.message || "Internal Server Error");
        }
    }

    useEffect(() => {
        refetch();
        if (data) {
            setTitle(data.coupon.name);
            setDiscount(data.coupon.discount);
        }
    }, [data]);

    return (
        <div className="w-full flex justify-between h-full mt-3">
            {/* Admin Sidebar */}
            <section>
                <AdminSideBar />
            </section>

            {
                isLoading ? <Loader /> : <>
                    <section className="w-3/4 mt-32 p-5 px-10 flex items-center">
                        <div className="flex flex-col mt-11 items-center w-full h-full">
                            <h1 className="mb-7 text-4xl">Update Coupon ({id})</h1>

                            <form className="flex flex-col gap-5 text-lg" onSubmit={submitHandeler}>
                                <input
                                    type="text"
                                    name="title"
                                    id="title"
                                    placeholder="Enter The Coupon Code"
                                    required
                                    className="w-96 rounded-md outline-none border p-3"
                                    value={title}
                                    onChange={e => setTitle(e.target.value)}
                                />

                                <input
                                    type="number"
                                    name="discount"
                                    id="city"
                                    placeholder="Enter The Discount Rate"
                                    required
                                    className="w-96 rounded-md outline-none border p-3"
                                    value={Discount}
                                    onChange={e => setDiscount(Number(e.target.value))}
                                />

                                <button type="submit" className="w-96 rounded-md outline-none border p-3 bg-green-700">Update</button>
                                <span className="w-full text-center mb-5">
                                    or
                                </span>
                            </form>
                            <button onClick={deleteHandeler} className="w-96 rounded-md outline-none border p-3 bg-green-700">Delete Coupon</button>
                        </div>
                    </section>
                </>
            }
        </div>
    )
}

export default UpdateCoupon;
