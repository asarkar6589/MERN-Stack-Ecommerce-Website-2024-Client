import {
    ArcElement,
    Chart as ChartJs,
    Legend,
    Tooltip,
    CategoryScale,
    LinearScale,
    BarElement
} from "chart.js";
import { Bar as BarChart } from "react-chartjs-2";

ChartJs.register(
    ArcElement,
    Tooltip,
    Legend,
    CategoryScale,
    LinearScale,
    BarElement
);

interface DataSetsProps {
    label: string,
    data: number[],
    backgroundColor: string[],
    borderColor: string[],
    borderWidth: number
}
interface Props {
    labels: string[],
    datasets: DataSetsProps[],
    size?: number
}

const Bar = ({ labels, datasets, size }: Props) => {
    const chartSize = 900;

    const data = {
        labels,
        datasets
    }

    /*
        If we want to remove the grid from the chart, then we can do it like this...
        
        const options = {
            scales: {
                x: {
                    grid: {
                        display: false // Remove gridlines along the x-axis
                    }
                },
                y: {
                    grid: {
                        display: false // Remove gridlines along the y-axis
                    }
                }
            }
        };
    
    */

    return (
        <div style={{
            width: size ? `${size}px` : `${chartSize}px`,
            height: `500px`,
            // border: '2px solid black'
        }}>
            <BarChart data={data} />
        </div>
    )
}

export default Bar;
