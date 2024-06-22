import { AiFillFileText } from "react-icons/ai";
import { FaChartBar, FaChartLine, FaChartPie, FaStopwatch } from "react-icons/fa";
import { IoIosPeople } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import { RiDashboardFill, RiShoppingBag3Fill } from "react-icons/ri";
import { Link } from 'react-router-dom';

const AdminSideBar = () => {
    return (
        <article className="px-14 text-lg h-screen flex flex-col bg-zinc-800 text-white shadow-2xl justify-evenly z-100 fixed left-0 w-64 md:w-1/5" style={{
            marginTop: "60px"
        }}>
            <section>
                <div>
                    <h1>Dashboard</h1>
                </div>
                <div className="flex flex-col px-6 w-full">
                    <Link to="/admin/dashboard" className="flex items-center gap-2">
                        <RiDashboardFill />Dashboard
                    </Link>

                    <Link to="/admin/products" className="flex items-center gap-2">
                        <RiShoppingBag3Fill />Product
                    </Link>

                    <Link to="/admin/customer" className="flex items-center gap-2">
                        <IoIosPeople />Customer
                    </Link>

                    <Link to="/admin/transaction" className="flex items-center gap-2">
                        <AiFillFileText />Transaction
                    </Link>

                    <Link to="/admin/order/cancelled" className="flex w-full items-center gap-2">
                        <MdCancel className="text-white" />Withdrawn
                    </Link>
                </div>
            </section>
            <section>
                <div>
                    <h1>Charts</h1>
                </div>
                <div className="flex flex-col px-6">
                    <Link to="/admin/bar" className="flex items-center gap-2">
                        <FaChartBar />Bar
                    </Link>

                    <Link to="/admin/pie" className="flex items-center gap-2">
                        <FaChartPie />Pie
                    </Link>

                    <Link to="/admin/line" className="flex items-center gap-2">
                        <FaChartLine />Line
                    </Link>
                </div>
            </section>
            <section>
                <div>
                    <h1>Apps</h1>
                </div>
                <div className="flex flex-col px-6">
                    <Link to="/admin/stopwatch" className="flex items-center gap-2">
                        <FaStopwatch />Stopwatch
                    </Link>

                    <Link to="/admin/coupon/create" className="flex items-center gap-2">
                        <IoIosPeople />Coupon
                    </Link>
                </div>
            </section>
        </article>
    )
}

export default AdminSideBar;
