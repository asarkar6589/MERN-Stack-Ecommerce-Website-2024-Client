import AdminSideBar from "../../components/admin/AdminSideBar"
import Bar from "../../components/admin/Bar"
import { useGetBarQuery } from "../../redux/api/stats"
import { useEffect, useState } from "react"
import Loader from "../../components/Loader"
import { getLastMonths } from "../../utils/fetaures"

const BarCharts = () => {
    const { data, isLoading, refetch } = useGetBarQuery(null);
    const [users, setUsers] = useState<number[]>([]);
    const [products, setProducts] = useState<number[]>([]);
    const [orders, setOrders] = useState<number[]>([]);
    const [cancelledOrders, setCancelledOrders] = useState<number[]>([]);
    const { lastSixMonths, lastTwelveMonths } = getLastMonths();

    useEffect(() => {
        refetch();

        if (data) {
            setProducts(data.Products);
            setUsers(data.Users);
            setOrders(data.Orders);
            setCancelledOrders(data.CancelledOrders);
        }
    }, [data]);

    return (
        <div className="className=w-full flex justify-between h-full mt-3">
            {/* Admin Sidebar */}
            <section>
                <AdminSideBar />
            </section>

            {/* Bar charts */}
            <section className="w-3/4 h-full p-5 px-10 flex flex-col items-center mt-16">
                {
                    isLoading ? <Loader /> : (
                        <>
                            <div>
                                <h1 className="text-4xl text-center mb-5">Top Products & Customers</h1>
                                <Bar
                                    labels={lastSixMonths}
                                    datasets={
                                        [
                                            {
                                                label: "User",
                                                data: users,
                                                backgroundColor: [
                                                    '#341179',
                                                ],
                                                borderColor: [
                                                    '#341179',
                                                ],
                                                borderWidth: 1
                                            },
                                            {
                                                label: "Product",
                                                data: products,
                                                backgroundColor: [
                                                    'gray',
                                                ],
                                                borderColor: [
                                                    'gray',
                                                ],
                                                borderWidth: 1
                                            }
                                        ]
                                    }
                                />
                            </div>

                            <div>
                                <h1 className="text-4xl text-center mb-5">Orders Throughout The Year</h1>
                                <Bar
                                    labels={lastTwelveMonths}
                                    datasets={[
                                        {
                                            label: "Orders",
                                            data: orders,
                                            backgroundColor: [
                                                'yellow',
                                            ],
                                            borderColor: [
                                                'yellow',
                                            ],
                                            borderWidth: 1
                                        },
                                        {
                                            label: "Cancelled Orders",
                                            data: cancelledOrders,
                                            backgroundColor: [
                                                'red',
                                            ],
                                            borderColor: [
                                                'red',
                                            ],
                                            borderWidth: 1
                                        }
                                    ]}
                                />
                            </div>
                        </>
                    )
                }
            </section>
        </div>
    )
}

export default BarCharts;
