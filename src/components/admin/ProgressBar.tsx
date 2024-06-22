import ProgressBar from "@ramonak/react-progress-bar"

interface Props {
    percentage: number,
    label: string
}

const Progressbar = ({ percentage, label }: Props) => {
    return (
        <div>
            <h5>{label}</h5>
            <ProgressBar
                completed={percentage}
                maxCompleted={100}
                barContainerClassName={"bg-green-700 rounded-full"}
            />
        </div>
    )
}

export default Progressbar;
