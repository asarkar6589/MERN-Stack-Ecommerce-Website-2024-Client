import {
    ArcElement,
    Chart as ChartJs,
    Legend,
    Tooltip
} from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJs.register(
    ArcElement,
    Tooltip,
    Legend
);

interface Props {
    labels: string[],
    Data: number[],
    backgroundColor: string[],
    borderColor: string[],
    label: string,
    size?: number
}

const Pie = ({ labels, Data, backgroundColor, borderColor, label, size }: Props) => {
    const chartSize = 450;
    const data = {
        labels,
        datasets: [{
            label,
            data: Data,
            backgroundColor,
            borderColor,
        }]
    }
    return (
        <div style={{ width: size ? `${size}px` : `${chartSize}px`, height: `${chartSize}px` }}>
            <Doughnut data={data} />
        </div>
    )
}

export default Pie;
