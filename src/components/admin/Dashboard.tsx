import { useEffect, useState } from "react";
import { useGetDashboardQuery } from "../../redux/api/stats";
import { getLastMonths } from "../../utils/fetaures";
import Loader from "../Loader";
import AdminSideBar from "./AdminSideBar";
import Bar from "./Bar";
import DashboardCard from "./DashboardCard";
import Pie from "./Pie";
import Progressbar from "./ProgressBar";
import Table from "./Table";

const columns = [
    {
        Header: 'Id',
        accessor: '_id',
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
        Header: 'Total',
        accessor: 'total',
    },
];

interface LatestTransactionsType {
    _id: string,
    discount: number,
    total: number,
    status: string
}

const Admin = () => {
    const { data, isLoading, refetch } = useGetDashboardQuery(null);
    const [revenue, setRevenue] = useState<number>(0);
    const [users, setUsers] = useState<number>(0);
    const [transactions, setTransactions] = useState<number>(0);
    const [products, setProducts] = useState<number>(0);
    const [revenueCount, setRevenueCount] = useState<number>(0);
    const [usersCount, setUsersCount] = useState<number>(0);
    const [transactionsCount, setTransactionsCount] = useState<number>(0);
    const [productsCount, setProductsCount] = useState<number>(0);
    const [lastSixMonthsRevenue, setLastSixMonthsRevenue] = useState<number[]>([]);
    const [lastSixMonthsOrder, setLastSixMonthsOrder] = useState<number[]>([]);
    const [inventoryKey, setInventoryKey] = useState<string[]>([]);
    const [inventoryValue, setInventoryValue] = useState<number[]>([]);
    const [typeOfUsers, setTypeOfUsers] = useState<string[]>([]);
    const [typeOfUsersCount, setTypeOfUsersCount] = useState<number[]>([]);
    const [rows, setRows] = useState<LatestTransactionsType[]>([]);
    const { lastSixMonths } = getLastMonths();

    useEffect(() => {
        refetch();
        if (data) {
            // change in percentage
            setRevenue(data.stats.changePercentage.revenue);
            setUsers(data.stats.changePercentage.user);
            setTransactions(data.stats.changePercentage.order);
            setProducts(data.stats.changePercentage.product);

            // count
            setRevenueCount(data.stats.count.revenue);
            setUsersCount(data.stats.count.users);
            setTransactionsCount(data.stats.count.order);
            setProductsCount(data.stats.count.product);

            // Revenue & Transaction graph
            setLastSixMonthsOrder(data.stats.chart.lastSixMonthsOrderArr);
            setLastSixMonthsRevenue(data.stats.chart.lastSixMonthsRevenueArr);

            // Inventory
            const keys: string[] = [];
            const values: number[] = [];
            data.stats.inventory.forEach(obj => {
                Object.entries(obj).forEach(([key, value]) => {
                    keys.push(key);
                    values.push(value)
                })
            });
            setInventoryKey(keys);
            setInventoryValue(values);

            // Users count
            const keys2: string[] = Object.keys(data.stats.gender);
            const values2: number[] = Object.values(data.stats.gender);
            setTypeOfUsers(keys2);
            setTypeOfUsersCount(values2);

            // transactions
            const transactions = data.stats.transactionsCount as LatestTransactionsType[];
            const updateRow = transactions.map((i) => ({
                _id: i._id,
                discount: i.discount,
                status: i.status,
                total: i.total,
            }));
            setRows(updateRow);
        }
    }, [data]);

    return (
        <div className="w-full flex flex-col md:flex-row justify-between mt-3">
            {/* Side Panel */}
            <section className="fixed md:relative md:w-1/5">
                <AdminSideBar />
            </section>

            <section className="md:mt-14 md:p-4 md:h-full flex-1 md:w-4/5">
                {
                    isLoading ? <Loader /> : (
                        <section className="flex flex-col h-full gap-11">

                            <div className="flex flex-col md:flex-row justify-evenly md:gap-5">
                                <DashboardCard
                                    title="Revenue"
                                    amount={revenueCount}
                                    percent={revenue}
                                />
                                <DashboardCard
                                    title="Users"
                                    amount={usersCount}
                                    percent={users}
                                />
                                <DashboardCard
                                    title="Transactions"
                                    amount={transactionsCount}
                                    percent={transactions}
                                />
                                <DashboardCard
                                    title="Products"
                                    amount={productsCount}
                                    percent={products}
                                />
                            </div>

                            <div className="flex flex-col md:flex-row gap-5 md:mx-7">

                                {/* Revenue & Transaction Graph */}
                                <section className="border rounded-xl shadow-xl p-4 md:flex-1">

                                    <h1 className="text-4xl text-center mb-5">Revenue & Transaction</h1>

                                    <Bar
                                        labels={lastSixMonths}
                                        datasets={
                                            [
                                                {
                                                    label: "Revenue",
                                                    data: lastSixMonthsRevenue,
                                                    backgroundColor: [
                                                        '#0067E6',
                                                    ],
                                                    borderColor: [
                                                        '#0067E6',
                                                    ],
                                                    borderWidth: 1
                                                },
                                                {
                                                    label: "Transaction",
                                                    data: lastSixMonthsOrder,
                                                    backgroundColor: [
                                                        'green',
                                                    ],
                                                    borderColor: [
                                                        'green',
                                                    ],
                                                    borderWidth: 1
                                                },
                                            ]
                                        }
                                        size={800}
                                    />
                                </section>

                                {/* Inventory */}
                                <section className="border rounded-xl shadow-xl p-4 md:w-60">
                                    <h1 className="text-4xl text-center mb-5">Inventory</h1>
                                    {
                                        inventoryKey.map((i, idx) => (
                                            <section key={idx}>
                                                <Progressbar
                                                    percentage={inventoryValue[idx]}
                                                    label={i}
                                                />
                                            </section>
                                        ))
                                    }
                                </section>
                            </div>

                            <div className="flex flex-col md:flex-row gap-5 md:mx-7 md:gap-0">
                                {/* Gender Ratio */}
                                <section className="border rounded-xl shadow-xl p-4 md:w-96">
                                    <h1 className="text-4xl text-center mb-5 mt-5">Gender Ratio</h1>

                                    <Pie
                                        labels={typeOfUsers}
                                        Data={typeOfUsersCount}
                                        backgroundColor={['#36AFFF', 'red', 'gray']}
                                        borderColor={['#36AFFF', 'red', 'gray']}
                                        label="Count"
                                        size={280}
                                    />
                                </section>

                                {/* Top Transaction */}
                                <section className="border rounded-xl shadow-xl p-4 md:flex-1">
                                    <h1 className="text-4xl text-center mb-5 mt-5">Top Transactions</h1>

                                    <Table columns={columns} data={rows} />
                                </section>
                            </div>

                        </section>
                    )
                }
            </section>
        </div>
    )
}

export default Admin;
