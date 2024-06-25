import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { initialUserStateType } from "../types/initialState-types";
import { Navigate } from "react-router-dom";
import { useSendMailMutation } from "../redux/api/user";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { sendMailResponse } from "../types/api-types";

const ForgetPassword = () => {
    const [email, setEmail] = useState<string>("");
    const { user } = useSelector((state: { userReducer: initialUserStateType }) => state.userReducer);
    const [disable, setDisable] = useState<boolean>(false);
    const [mail] = useSendMailMutation();

    if (user) {
        return <Navigate to={`/account/${user._id}`} />
    }

    const submitHandeler = async (e: FormEvent<HTMLFormElement>) => {
        setDisable(true);
        e.preventDefault();

        try {
            const res = await mail(email);

            if ("data" in res) {
                toast.success(res.data.message);
            }
            else {
                const error = res.error as FetchBaseQueryError;
                const messageResponse = error.data as sendMailResponse;
                toast.error(messageResponse.message);
            }
        } catch (error: any) {
            toast.error(error.message || "Internal Server Error");
        }
        setDisable(false);
        setEmail("")
    }

    return (
        <div className="w-full min-h-screen bg-white flex flex-col justify-center items-center px-4">
            <h1 className="mb-7 text-4xl text-center">Forget Password</h1>
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

                <button type="submit" className="w-full rounded-md outline-none border p-3 bg-green-700 text-white" disabled={disable}>
                    {
                        disable ? <span>Please Wait...</span> : <span>Send Link</span>
                    }
                </button>
            </form>
        </div>
    )
}

export default ForgetPassword;
