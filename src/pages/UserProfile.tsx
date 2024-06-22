import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import { useGetUserQuery, useLogoutMutation } from "../redux/api/user";
import { noUser } from "../redux/reducer/userReducer";
import { initialUserStateType } from "../types/initialState-types";

const UserProfile = () => {
    const { data, isLoading, refetch } = useGetUserQuery(null);
    const navigate = useNavigate();
    let { user } = useSelector((state: { userReducer: initialUserStateType }) => state.userReducer);
    const [logout] = useLogoutMutation();
    const dispatch = useDispatch();
    const [name, setName] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [number, setNumber] = useState<number>(0);
    const [dob, setDob] = useState<string>("");
    const [gender, setGender] = useState<string>("");

    const logoutHandler = async () => {
        try {
            const res = await logout(null);

            if ("data" in res) {
                toast.success(res.data.message);
                dispatch(noUser());
                navigate("/");
            }
        } catch (error: any) {
            toast.error(error.message || "Internal Server Error, please try again");
        }
    };

    if (!user) {
        return <Navigate to="/login" />;
    }

    useEffect(() => {
        refetch();
        if (data) {
            setName(data.user.name);
            setEmail(data.user.email);
            setNumber(data.user.number);
            setGender(data.user.gender);
            setDob(String(data.user.dob));
        }
    }, [data, refetch]);

    return (
        isLoading ? (
            <Loader />
        ) : (
            <section className="flex mt-20 flex-col items-center justify-center p-4 md:p-10">
                <div className="flex flex-col md:flex-row w-full max-w-4xl items-center justify-center gap-9 bg-white p-5 rounded-lg shadow-lg">
                    <div className="flex flex-col justify-center items-center gap-5 md:gap-7">
                        <img className="rounded-full w-40 h-40 md:w-56 md:h-56 shadow-lg" src={`${import.meta.env.VITE_PHOTO_URL}/${user.photo}`} alt={user.name} />
                        <span className="font-bold text-center mt-5 md:mt-7">Name - {name}</span>
                        <span className="font-bold text-center">Email - {email}</span>
                        <span className="font-bold text-center">Phone Number - {number}</span>
                        <span className="font-bold text-center">Date of Birth - {dob.split('T').reverse()[1]}</span>
                        <span className="font-bold text-center">Gender - {gender}</span>
                    </div>

                    <div className="flex flex-col justify-center items-center gap-4 md:gap-6">
                        <button className="w-40 text-center rounded-md outline-none border p-3 bg-green-700 text-white transition hover:bg-green-800" onClick={logoutHandler}>Logout</button>
                        <Link className="w-40 text-center rounded-md outline-none border p-3 bg-green-700 text-white transition hover:bg-green-800" to="/orders">My Orders</Link>
                        <Link className="w-40 text-center rounded-md outline-none border p-3 bg-green-700 text-white transition hover:bg-green-800" to={`/account/update/${user._id}`}>Update Profile</Link>
                        <Link className="w-40 text-center rounded-md outline-none border p-3 bg-green-700 text-white transition hover:bg-green-800" to={`/feedback`}>Feedback</Link>
                        {user.role === "Admin" && <Link className="w-40 text-center rounded-md outline-none border p-3 bg-green-700 text-white transition hover:bg-green-800" to="/admin/dashboard">Admin Panel</Link>}
                    </div>
                </div>
            </section>
        )
    );
}

export default UserProfile;
