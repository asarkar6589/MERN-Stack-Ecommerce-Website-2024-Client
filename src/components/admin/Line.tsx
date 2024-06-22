import { Line as LineChart } from "react-chartjs-2";
import {
    Chart as ChartJs,
    LineElement,
    CategoryScale, // x axis
    LinearScale, // y axis
    PointElement,
    Legend,
    Tooltip,
    Filler
} from "chart.js";
import 'chartjs-plugin-annotation';

ChartJs.register(
    LineElement,
    CategoryScale,
    LinearScale,
    PointElement,
    Legend,
    Tooltip,
    Filler
);

interface DataSetsProps {
    label: string,
    data: number[],
    backgroundColor: string,
    borderColor: string,
    pointBorderColor: string,
    tension: number,
    fill: boolean,
}
interface Props {
    labels: string[],
    datasets: DataSetsProps[],
}

const Line: React.FC<Props> = ({ labels, datasets }: Props) => {
    const chartSize = 1000;

    const data = {
        labels,
        datasets
    }

    const options = {
        plugins: {
            filler: {
                propagate: true
            }
        }
    };

    return (
        <div style={{
            width: `${chartSize}px`,
            height: `500px`,
        }}>
            <LineChart data={data} options={options} />
        </div>
    )
}

export default Line;
