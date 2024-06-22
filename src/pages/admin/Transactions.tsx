import { useEffect, useState } from "react";
import AdminSideBar from "../../components/admin/AdminSideBar";
import { useGetOrderByAdminQuery } from "../../redux/api/order";
import { Order } from "../../types/api-types";
import { AllTransactionsTable } from "../../vite-env";
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
        accessor: 'amount',
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

const Transactions = () => {
    const { data, refetch, isLoading } = useGetOrderByAdminQuery(null);
    const [rows, setRows] = useState<AllTransactionsTable[]>([]);

    useEffect(() => {
        refetch();
        if (data) {
            const order = data.orders as Order[];
            const updateRow = order.map((i) => ({
                id: i._id,
                amount: i.subTotal,
                discount: i.discount,
                status: <span>
                    {
                        i.status === "Processing" ? <span className="text-green-700">{i.status}</span> : i.status === "Shipped" ? <span className="text-blue-700 ">{i.status}</span> : <span className="text-red-700 ">{i.status}</span>
                    }
                </span>,
                action: <Link to={`/admin/transaction/update/${i._id}`} className="p-2 rounded-xl bg-slate-500">Manage</Link>,
                total: i.total,
                subTotal: i.subTotal,
                tax: i.tax
            }));
            setRows(updateRow);
        }
    }, [data]);

    return (
        <div className="w-full flex justify-between h-full mt-3">
            {/* Admin Sidebar */}
            <section>
                <AdminSideBar />
            </section>

            {/* Transactions */}
            <section className="w-3/4 h-full mt-16 p-5 mr-9">
                <h1 className="text-4xl text-center font-extralight mt-5 mb-16">Transactions</h1>
                {isLoading ? <Loader /> : <Table columns={columns} data={rows} />}
            </section>
        </div>
    )
}

export default Transactions;
