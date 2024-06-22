import { FormEvent, useEffect, useState } from "react";
import AdminSideBar from "../../components/admin/AdminSideBar"
import toast from "react-hot-toast";
import { useGetAllCouponQuery, useNewCouponMutation } from "../../redux/api/coupon";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { CouponType, CreateNewCouponResponse } from "../../types/api-types";
import Loader from "../../components/Loader";
import Table from "../../components/admin/Table";
import { Link } from "react-router-dom";

const columns = [
    {
        Name: 'Name',
        accessor: 'name',
    },
    {
        Header: 'Discount',
        accessor: 'discount',
    },
    {
        Header: 'Action',
        accessor: 'action',
    }
];

const Coupon = () => {
    const [title, setTitle] = useState<string>("");
    const [Discount, setDiscount] = useState<number>(0);
    const [newCoupon] = useNewCouponMutation();
    const { data, isLoading, error, refetch } = useGetAllCouponQuery(null);
    const [rows, setRows] = useState<CouponType[]>([]);

    if (error) {
        toast.error("Some Error Occured while fetching coupon");
    }

    const submitHandeler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            if (Discount <= 0) {
                toast.error("Discount must be greater than zero");
                setTitle("");
                setDiscount(0);
                return;
            }

            const res = await newCoupon({
                name: title,
                discount: Discount
            });

            if ("data" in res) {
                toast.success(res.data.message);
                refetch();
            }
            else {
                const error = res.error as FetchBaseQueryError;
                const messageResponse = error.data as CreateNewCouponResponse;
                toast.error(messageResponse.message);
            }
        } catch (error: any) {
            toast.error(error.message || "Some Error Occured 🤧");
        }

        setTitle("");
        setDiscount(0);
    }

    useEffect(() => {
        refetch();
        if (data) {
            const coupons = data.coupons as CouponType[];
            const updateRows = coupons.map((i) => ({
                name: i.name,
                discount: i.discount,
                action: <Link to={`/admin/coupon/update/${i._id}`} className="p-2 rounded-xl bg-slate-500">Manage</Link>,
            }));
            setRows(updateRows);
        }
    }, [data]);

    return (
        <div className="w-full flex justify-between h-full mt-3">
            {/* Admin Sidebar */}
            <section>
                <AdminSideBar />
            </section>

            <section className="w-3/4 h-full mt-14 p-5 px-10 flex items-center">
                <div className="flex flex-col mt-11 items-center w-full h-full">
                    <h1 className="mb-7 text-4xl">Create Coupon</h1>

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

                        <button type="submit" className="w-96 rounded-md outline-none border p-3 bg-green-700">Create</button>
                    </form>

                    <h1 className="mt-11 mb-5 text-xl">All Coupons</h1>

                    {isLoading ? <Loader /> : <Table columns={columns} data={rows} />}
                </div>
            </section>
        </div>
    )
}

export default Coupon;
