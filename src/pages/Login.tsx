import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/api/user";
import { LoginResponse } from "../types/api-types";
import { initialUserStateType } from "../types/initialState-types";
import { getUserInfo } from "../redux/reducer/userReducer";

const Login = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [loggedInUser] = useLoginMutation();
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const { user } = useSelector((state: { userReducer: initialUserStateType }) => state.userReducer);
    const [disable, setDisable] = useState<boolean>(false);
    // const [redirect, setRedirect] = useState<boolean>(false);

    if (user) {
        return <Navigate to={`/account/${user._id}`} />
    }

    const submitHandeler = async (e: FormEvent<HTMLFormElement>) => {
        setDisable(true);
        try {
            e.preventDefault();

            const res = await loggedInUser({
                email,
                password
            });

            if ("data" in res) {
                dispatch(getUserInfo(res.data.user)); // this is the fucking problem, I addedd this and it gets refreshed. 
                toast.success(res.data.message);
                navigate("/");
            }
            else {
                const error = res.error as FetchBaseQueryError;
                const messageResponse = error.data as LoginResponse;
                toast.error(messageResponse.message);
            }

        } catch (error: any) {
            toast.error(error.message || "Internal Server Error");
        }
        setDisable(false);
    }

    return (
        <div className="w-full min-h-screen bg-white flex flex-col justify-center items-center px-4">
            <h1 className="mb-7 text-4xl text-center">Login</h1>
            <form className="w-full max-w-md flex flex-col gap-5 text-lg" onSubmit={submitHandeler}>
                <input
                    type="email"
                    name="email"
                    id="email"
                    placeholder="Enter Your Email Address"
                    required
                    className="w-full rounded-md outline-none border p-3"
                    value={email}
                    onChange={(e) => setEmail((e.target.value))}
                />

                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter Your Password"
                    required
                    className="w-full rounded-md outline-none border p-3"
                    value={password}
                    onChange={(e) => setPassword((e.target.value))}
                />

                <button type="submit" className="w-full rounded-md outline-none border p-3 bg-green-700 text-white" disabled={disable}>Login</button>

                <span className="text-sm text-center">
                    Don't have an account, <Link className="underline text-blue-800 font-bold" to={"/register"}>
                        Register
                    </Link>
                </span>
            </form>
        </div>
    )
}

export default Login;
