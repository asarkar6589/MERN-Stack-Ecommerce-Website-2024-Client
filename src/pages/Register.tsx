import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { ChangeEvent, FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useRegisterMutation } from "../redux/api/user";
import { RegistrationResponse } from "../types/api-types";

const Register = () => {
    const navigate = useNavigate();
    const [newUser] = useRegisterMutation();
    const [name, setName] = useState<string>("");
    const [number, setNumber] = useState<number>();
    const [dob, setDob] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [photo, setPhoto] = useState<File>();
    const [disable, setDisable] = useState<boolean>(false);

    const handelPhoto = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (files && files.length > 0) {
            setPhoto(files[0]);
        }
    }

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        setDisable(true);
        try {
            e.preventDefault();

            if (!name || !number || !dob || !email || !password || !gender || !photo) {
                toast.error("Please fill in the required fields");
                return;
            }

            const formData = new FormData();
            formData.set("name", name);
            formData.set("number", String(number));
            formData.set("dob", dob);
            formData.set("email", email);
            formData.set("password", password);
            formData.set("gender", gender);
            formData.set("photo", photo);

            const res = await newUser({ formData });

            if ("data" in res) {
                toast.success(res.data.message);
                navigate("/login");
            }
            else {
                const error = res.error as FetchBaseQueryError;
                const messageResponse = error.data as RegistrationResponse;
                toast.error(messageResponse.message);
            }
        } catch (error) {
            toast.error("Error Occured");
        }
        setDisable(false);
    }

    return (
        <div className="min-h-screen mt-20 flex justify-center items-center py-10">
            <div className="w-full max-w-md bg-white flex flex-col items-center px-4 py-8 shadow-md rounded-md">
                <form className="w-full flex flex-col gap-5 text-lg" onSubmit={submitHandler}>
                    <h1 className="mb-7 text-4xl text-center">Register</h1>

                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter Your Name"
                        required
                        className="w-full rounded-md outline-none border p-3"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />

                    <input
                        type="number"
                        name="number"
                        id="number"
                        placeholder="Enter Your Mobile Number"
                        required
                        className="w-full rounded-md outline-none border p-3"
                        value={number}
                        onChange={(e) => setNumber(Number(e.target.value))}
                    />

                    <input
                        type="date"
                        name="dob"
                        id="dob"
                        placeholder="Enter Your DOB"
                        required
                        className="w-full rounded-md outline-none border p-3"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                    />

                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter Your Email Address"
                        required
                        className="w-full rounded-md outline-none border p-3"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter Your Password"
                        required
                        className="w-full rounded-md outline-none border p-3"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />

                    <select
                        name="gender"
                        id="gender"
                        required
                        className="w-full rounded-md outline-none border p-3"
                        value={gender}
                        onChange={(e) => setGender(e.target.value)}
                    >
                        <option value="choose">Choose Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>

                    <input
                        type="file"
                        name="photo"
                        id="photo"
                        placeholder="Profile Photo"
                        className="w-full rounded-md outline-none border p-3"
                        required
                        onChange={handelPhoto}
                    />

                    <button disabled={disable} type="submit" className="w-full rounded-md outline-none border p-3 bg-green-700 text-white">
                        {
                            disable ? <span>Please Wait...</span> : <span>Register</span>
                        }
                    </button>
                </form>
            </div>
        </div>
    )
}

export default Register;
