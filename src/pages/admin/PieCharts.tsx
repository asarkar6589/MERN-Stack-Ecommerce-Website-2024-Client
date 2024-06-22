import { useEffect, useState } from "react";
import Loader from "../../components/Loader";
import AdminSideBar from "../../components/admin/AdminSideBar";
import Pie from "../../components/admin/Pie";
import { useGetPieQuery } from "../../redux/api/stats";

const PieCharts = () => {
    const { data, isLoading, refetch } = useGetPieQuery(null);
    const [orderCountLabel, setOrderCountLabel] = useState<string[]>([]);
    const [orderCountLabelData, setOrderCountLabelData] = useState<number[]>([]);
    const [categoriesLabel, setCategoriesLabel] = useState<string[]>([]);
    const [categoriesLabelData, setCategoriesLabelData] = useState<number[]>([]);
    const [usersAgeLabel, setUsersAgeLabel] = useState<string[]>([]);
    const [usersAgeLabelData, setUsersAgeLabelData] = useState<number[]>([]);
    const [stockData, setStockData] = useState<number[]>([]);
    const [userTypeLabel, setUserTypeLabel] = useState<string[]>([]);
    const [userTypeLabelData, setUserTypeLabelData] = useState<number[]>([]);
    const [revenueLabel, setRevenueLabel] = useState<string[]>([]);
    const [revenueLabelData, setRevenueLabelData] = useState<number[]>([]);

    useEffect(() => {
        refetch();

        if (data) {
            const orderCountKeys: string[] = Object.keys(data.pie.orderCount);
            setOrderCountLabel(orderCountKeys);
            const orderCountKeysData: number[] = Object.values(data.pie.orderCount);
            setOrderCountLabelData(orderCountKeysData);

            const keys: string[] = [];
            const values: number[] = [];
            data.pie.categoryCount.forEach(obj => {
                Object.entries(obj).forEach(([key, value]) => {
                    keys.push(key);
                    values.push(value)
                })
            })
            setCategoriesLabel(keys);
            setCategoriesLabelData(values);

            const usersAgeKeys: string[] = Object.keys(data.pie.peopleAgeCount);
            setUsersAgeLabel(usersAgeKeys);
            const usersAgeKeysData: number[] = Object.values(data.pie.peopleAgeCount);
            setUsersAgeLabelData(usersAgeKeysData);

            const StockData = Object.values(data.pie.stock);
            setStockData(StockData);

            const peopleCountKeys: string[] = Object.keys(data.pie.peopleCount);
            setUserTypeLabel(peopleCountKeys);
            const peopleCountKeysData: number[] = Object.values(data.pie.peopleCount);
            setUserTypeLabelData(peopleCountKeysData);

            const revenueKeys: string[] = Object.keys(data.pie.revenueDistribution);
            setRevenueLabel(revenueKeys);
            const revenueKeysData: number[] = Object.values(data.pie.revenueDistribution);
            setRevenueLabelData(revenueKeysData);
        }
    }, [data]);

    return (
        <div className="w-full flex justify-between h-full mt-3">
            {/* Admin Sidebar */}
            <section>
                <AdminSideBar />
            </section>

            {/* Pie Charts */}
            <section className="w-3/4 h-full p-5 px-10 flex flex-col items-center gap-7 mt-16">
                {
                    isLoading ? <Loader /> : (
                        <>
                            <div>
                                <h1 className="text-4xl text-center mb-5">Order Fullfilment Ratio</h1>
                                <Pie
                                    labels={orderCountLabel}
                                    Data={orderCountLabelData}
                                    backgroundColor={['gray', 'yellow', 'blue', 'red']}
                                    borderColor={['gray', 'yellow', 'blue', 'red']}
                                    label="Count"
                                />
                            </div>

                            <div>
                                <h1 className="text-4xl text-center mb-5">Product Categories Ratio</h1>
                                <Pie
                                    labels={categoriesLabel}
                                    Data={categoriesLabelData}
                                    backgroundColor={['#88FF70', '#B2B0EA', '#38812F']}
                                    borderColor={['#88FF70', '#B2B0EA', '#38812F']}
                                    label="%"
                                />
                            </div>

                            <div>
                                <h1 className="text-4xl text-center mb-5">User Age Group</h1>
                                <Pie
                                    labels={usersAgeLabel}
                                    Data={usersAgeLabelData}
                                    backgroundColor={['#35A2FF', '#1FB800', '#F5B1A3']}
                                    borderColor={['#35A2FF', '#1FB800', '#F5B1A3']}
                                    label="Count"
                                />
                            </div>

                            <div>
                                <h1 className="text-4xl text-center mb-5">Stock Availability</h1>
                                <Pie
                                    labels={["Out of Stock", "In Stock"]}
                                    Data={stockData}
                                    backgroundColor={['#35A2FF', '#5900B8']}
                                    borderColor={['#35A2FF', '#5900B8']}
                                    label="Count"
                                />
                            </div>

                            <div>
                                <h1 className="text-4xl text-center mb-5">User Type</h1>
                                <Pie
                                    labels={userTypeLabel}
                                    Data={userTypeLabelData}
                                    backgroundColor={['#F9E0A2', '#B8BBBE']}
                                    borderColor={['#F9E0A2', '#B8BBBE']}
                                    label="Count"
                                />
                            </div>

                            <div>
                                <h1 className="text-4xl text-center mb-5">Revenue Distribution</h1>
                                <Pie
                                    labels={revenueLabel}
                                    Data={revenueLabelData}
                                    backgroundColor={['#C58C00', '#C46100', '#F9E0A2', '#5752D1', '#8BC1F7']}
                                    borderColor={['#C58C00', '#C46100', '#F9E0A2', '#5752D1', '#8BC1F7']}
                                    label="Rs"
                                />
                            </div>
                        </>
                    )
                }
            </section>
        </div>
    )
}

export default PieCharts;
