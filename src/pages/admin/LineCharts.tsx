import { useEffect, useState } from "react";
import AdminSideBar from "../../components/admin/AdminSideBar"
import Line from "../../components/admin/Line"
import { useGetLineChartQuery } from "../../redux/api/stats"
import { getLastMonths } from "../../utils/fetaures";
import Loader from "../../components/Loader";

const LineCharts = () => {
    const { data, isLoading, refetch } = useGetLineChartQuery(null);
    const [users, setUsers] = useState<number[]>([]);
    const [products, setProducts] = useState<number[]>([]);
    const [revenue, setRevenue] = useState<number[]>([]);
    const [discount, setDiscount] = useState<number[]>([]);
    const { lastTwelveMonths } = getLastMonths();

    useEffect(() => {
        refetch();

        if (data) {
            setUsers(data.Users);
            setProducts(data.Products);
            setRevenue(data.Revenue);
            setDiscount(data.Discount);
        }
    }, [data]);
    return (
        <div className="w-full flex justify-between h-full mt-3">
            {/* Admin Sidebar */}
            <section>
                <AdminSideBar />
            </section>

            {/* Line Charts */}
            <section className="w-3/4 h-full p-5 px-10 flex flex-col items-center gap-7 mt-16">
                {
                    isLoading ? <Loader /> : (
                        <>
                            <div>
                                <h1 className="text-4xl text-center mb-5">Active Users</h1>
                                <Line
                                    labels={lastTwelveMonths}
                                    datasets={[
                                        {
                                            label: "User",
                                            data: users,
                                            backgroundColor: "#9AD0FF",
                                            borderColor: "#36A2FF",
                                            pointBorderColor: "#36A2FF",
                                            tension: 0.4,
                                            fill: true,
                                        }
                                    ]}
                                />
                            </div>
                            <div>
                                <h1 className="text-4xl text-center mb-5">Total Products</h1>
                                <Line
                                    labels={lastTwelveMonths}
                                    datasets={[
                                        {
                                            label: "Products",
                                            data: products,
                                            backgroundColor: "#C1A1E2",
                                            borderColor: "#6314B8",
                                            pointBorderColor: "#6314B8",
                                            tension: 0.4,
                                            fill: true,
                                        }
                                    ]}
                                />
                            </div>
                            <div>
                                <h1 className="text-4xl text-center mb-5">Total Revenue</h1>
                                <Line
                                    labels={lastTwelveMonths}
                                    datasets={[
                                        {
                                            label: "Revenue",
                                            data: revenue,
                                            backgroundColor: "#A1E2AB",
                                            borderColor: "#14B82D",
                                            pointBorderColor: "#14B82D",
                                            tension: 0.4,
                                            fill: true,
                                        }
                                    ]}
                                />
                            </div>
                            <div>
                                <h1 className="text-4xl text-center mb-5">Discount Allotted</h1>
                                <Line
                                    labels={lastTwelveMonths}
                                    datasets={[
                                        {
                                            label: "Discount",
                                            data: discount,
                                            backgroundColor: "orange",
                                            borderColor: "#C17731",
                                            pointBorderColor: "#C17731",
                                            tension: 0.4,
                                            fill: true,
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

export default LineCharts;
