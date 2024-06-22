import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Loader from "../components/Loader";
import Table from "../components/admin/Table";
import { useGetOrderByUserQuery } from "../redux/api/order";
import { Order } from "../types/api-types";
import { AllTransactionsTable } from "../vite-env";

const columns = [
    {
        Header: 'Id',
        accessor: 'id',
    },
    {
        Header: 'Subtotal',
        accessor: 'subTotal',
    },
    {
        Header: 'Discount',
        accessor: 'discount',
    },
    {
        Header: 'Tax',
        accessor: 'tax',
    },
    {
        Header: 'Total',
        accessor: 'total',
    },
    {
        Header: 'Status',
        accessor: 'status',
    },
    {
        Header: 'Action',
        accessor: 'action',
    },
];

const AllOrders = () => {
    const [rows, setRows] = useState<AllTransactionsTable[]>([]);
    const { data, isLoading } = useGetOrderByUserQuery(null);
    const [orders, setOrders] = useState<Order[]>([]);

    const fetchData = () => {
        if (data) {
            const order = data.orders as Order[];
            setOrders(order);
            const updateRow = order.map((i) => {
                return {
                    id: i._id,
                    subTotal: i.subTotal,
                    discount: i.discount,
                    tax: i.tax,
                    total: i.total,
                    status: (
                        <span>
                            {
                                i.status === "Processing" ? <span className="text-green-700">{i.status}</span> : i.status === "Shipped" ? <span className="text-blue-700 ">{i.status}</span> : <span className="text-red-700 ">{i.status}</span>
                            }
                        </span>
                    ),
                    action: <Link to={`/order/${i._id}`} className="p-2 rounded-xl bg-slate-500">Manage</Link>,
                }
            });
            setRows(updateRow);
        }
    }

    useEffect(() => {
        fetchData();
    }, [data]);

    return (
        <div className="w-full h-full flex flex-col items-center mt-10 lg:mt-24 px-4 lg:px-0">
            <div className="flex flex-col w-full max-w-screen-lg">
                <div className="mb-11">
                    {
                        orders.length > 0 ? (
                            <>
                                <h1 className="text-center text-3xl lg:text-4xl mt-7 mb-7">Orders</h1>
                                {isLoading ? <Loader /> : <Table columns={columns} data={rows} />}
                            </>
                        ) : (
                            <>
                                <h1 className="text-center text-3xl lg:text-4xl mt-7 mb-7">No Orders</h1>
                            </>
                        )
                    }
                </div>
                <Link to="/" className="w-full max-w-sm mx-auto text-center rounded-md outline-none border p-3 bg-green-700">Continue Shopping</Link>
            </div>
        </div>
    )
}

export default AllOrders;
