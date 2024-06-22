import { useEffect, useState } from "react";
import AdminSideBar from "../../components/admin/AdminSideBar";
import { useGetAllCancelledOrdersQuery } from "../../redux/api/cancelledOrder";
import { AllCancelTransactionsTable } from "../../vite-env";
import { CancelledOrder } from "../../types/api-types";
import { Link } from "react-router-dom";
import Loader from "../../components/Loader";
import Table from "../../components/admin/Table";

const columns = [
    {
        Header: 'Id',
        accessor: 'id',
    },
    {
        Header: 'Amount',
        accessor: 'total',
    },
    {
        Header: 'Discount',
        accessor: 'discount',
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

const AllCancelledOrder = () => {
    const { data, refetch, isLoading } = useGetAllCancelledOrdersQuery(null);
    const [rows, setRows] = useState<AllCancelTransactionsTable[]>([]);

    useEffect(() => {
        refetch();
        if (data) {
            const order = data.orders as CancelledOrder[];
            const updateRow = order.map((i) => ({
                id: i._id,
                total: i.subTotal,
                discount: i.discount,
                status: <span>
                    {
                        i.refundStatus === "Processing" ? <span className="text-green-700">{i.status}</span> : <span className="text-blue-700 ">{i.refundStatus}</span>
                    }
                </span>,
                action: <Link to={`/admin/order/cancelled/update/${i._id}`} className="p-2 rounded-xl bg-slate-500">Manage</Link>,
            }));
            setRows(updateRow);
        }
    }, [data])
    return (
        <div className="w-full flex justify-between h-full mt-3">
            {/* Admin Sidebar */}
            <section>
                <AdminSideBar />
            </section>

            {/* Products */}
            <section className="w-3/4 h-full mt-16 p-5 mr-9">
                <h1 className="text-4xl text-center font-extralight mt-5 mb-16">Cancelled Orders</h1>
                {isLoading ? <Loader /> : <Table columns={columns} data={rows} />}
            </section>
        </div>
    )
}

export default AllCancelledOrder;
