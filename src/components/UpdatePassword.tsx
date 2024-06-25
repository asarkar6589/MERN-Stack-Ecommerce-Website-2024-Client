import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import { useUpdatePasswordMutation } from "../redux/api/user";
import { updatePasswordResponse } from "../types/api-types";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";

const UpdatePassword = () => {
    const params = useParams();
    const token = params.token!;
    const [password, setPassword] = useState<string>("");
    const [disable, setDisable] = useState<boolean>(false);
    const [updatePassword] = useUpdatePasswordMutation();
    const navigate = useNavigate();

    const submitHandeler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setDisable(true);

        try {
            const res = await updatePassword({
                token,
                password
            });

            if ("data" in res) {
                toast.success(res.data.message);
                navigate("/login");
            }
            else {
                const error = res.error as FetchBaseQueryError;
                const messageResponse = error.data as updatePasswordResponse;
                toast.error(messageResponse.message);
            }
        } catch (error: any) {
            toast.error(error.message || "Internal Server Error");
        }

        setDisable(false);
    }

    return (
        <div className="w-full min-h-screen bg-white flex flex-col justify-center items-center px-4">
            <h1 className="mb-7 text-4xl text-center">Reset Password</h1>
            <form className="w-full max-w-md flex flex-col gap-5 text-lg" onSubmit={submitHandeler}>

                <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Enter Your New Password"
                    required
                    className="w-full rounded-md outline-none border p-3"
                    value={password}
                    onChange={(e) => setPassword((e.target.value))}
                />

                <button type="submit" className="w-full rounded-md outline-none border p-3 bg-green-700 text-white" disabled={disable}>
                    {
                        disable ? <span>Please Wait...</span> : <span>Reset Password</span>
                    }
                </button>
            </form>
        </div>
    )
}

export default UpdatePassword;
