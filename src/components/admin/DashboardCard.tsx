import { HiTrendingDown, HiTrendingUp } from "react-icons/hi";

interface Props {
    title: string,
    amount: number,
    percent: number
}

const DashboardCard = ({ title, amount, percent }: Props) => {
    return (
        <div className="w-60 h-32 rounded-xl border shadow-lg flex items-center justify-center gap-7">
            <section>
                <h1>{title}</h1>
                <p className="font-bold text-2xl">{amount}</p>
            </section>
            <section className="text-2xl">
                {percent > 0 ? (
                    <div className="text-green-700 flex">
                        <HiTrendingUp /> +{`${percent > 10000 ? 9999 : percent}%`}
                    </div>
                ) : (
                    <div className="text-red-700 flex">
                        <HiTrendingDown /> {`${percent < -10000 ? -9999 : percent}%`}
                    </div>
                )}
            </section>
        </div>
    )
}

export default DashboardCard;
