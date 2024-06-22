import AdminSideBar from "../../components/admin/AdminSideBar";

const Toss = () => {
    return (
        <div className="flex gap-4 h-screen mt-3">
            <section>
                <AdminSideBar />
            </section>

            {/* Products */}
            <section className="w-full p-5 px-10 shadow-2xl">
                Toss
            </section>
        </div>
    )
}

export default Toss;
