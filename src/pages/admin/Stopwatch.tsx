import { useEffect, useState } from "react"
import AdminSideBar from "../../components/admin/AdminSideBar"

const Stopwatch = () => {
    const [seconds, setSeconds] = useState<number>(0);
    const [minutes, setMinutes] = useState<number>(0);
    const [houres, setHoures] = useState<number>(0);

    let timer: any;

    useEffect(() => {
        timer = setInterval(() => {
            setSeconds(seconds + 1);

            if (seconds === 59) {
                setMinutes(minutes + 1);
                setSeconds(0);
            }

            if (minutes === 59) {
                setHoures(houres + 1);
                setMinutes(0);
            }
        }, 1000);

        return () => clearInterval(timer)
    })

    const reset = () => {
        setSeconds(0);
        setMinutes(0);
        setHoures(0);
    }

    const stop = () => {
        clearInterval(timer);
    }

    return (
        <div className="w-full h-full flex justify-between mt-3">
            {/* Admin Sidebar */}
            <section>
                <AdminSideBar />
            </section>

            {/* Products */}
            <section className="w-3/4 mt-60 flex flex-col justify-center items-center gap-5">
                <h1 className="text-4xl font-bold">Stopwatch</h1>

                <div className="text-xl">
                    <span>
                        {houres < 10 ? "0" + houres : houres} </span>: <span>
                        {minutes < 10 ? "0" + minutes : minutes}</span> : <span>
                        {seconds < 10 ? "0" + seconds : seconds}
                    </span>
                </div>

                <div className="flex gap-5">
                    <button onClick={reset} className="w-20 rounded-md outline-none border p-3 bg-green-700">Reset</button>

                    <button onClick={stop} className="w-20 rounded-md outline-none border p-3 bg-green-700">Stop</button>
                </div>
            </section>
        </div>
    )
}

export default Stopwatch