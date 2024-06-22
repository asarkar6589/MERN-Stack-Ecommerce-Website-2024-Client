import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useSelector } from "react-redux";
import { Navigate, useNavigate, useParams } from "react-router-dom";
import { useUpdateUserMutation } from "../redux/api/user";
import { UpdateUserResponse } from "../types/api-types";
import { initialUserStateType } from "../types/initialState-types";

const UpdateProfile = () => {
    const params = useParams();
    const id = params.id!;
    const { user } = useSelector((state: { userReducer: initialUserStateType }) => state.userReducer);
    const navigate = useNavigate();
    const [updateUser] = useUpdateUserMutation();
    const [name, setName] = useState<string>("");
    const [number, setNumber] = useState<number>();
    const [dob, setDob] = useState<string>("");
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [gender, setGender] = useState<string>("");
    const [photo, setPhoto] = useState<File>();

    if (!user) {
        return <Navigate to="/" />
    }

    const handlePhoto = (e: ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;

        if (files && files.length > 0) {
            setPhoto(files[0]);
        }
    }

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        try {
            e.preventDefault();

            const formData = new FormData();
            if (name) formData.set("name", name);
            if (number) formData.set("number", String(number));
            if (dob) formData.set("dob", dob);
            if (email) formData.set("email", email);
            if (password) formData.set("password", password);
            if (gender) formData.set("gender", gender);
            if (photo) formData.set("photo", photo);

            const res = await updateUser({ id, formData });

            if ("data" in res) {
                toast.success(res.data.message);
                navigate(`/account/${id}`);
            } else {
                const error = res.error as FetchBaseQueryError;
                const messageResponse = error.data as UpdateUserResponse;
                toast.error(messageResponse.message);
            }
        } catch (error) {
            toast.error("Error Occurred");
        }
    }

    useEffect(() => {
        setName(user.name);
        setEmail(user.email);
        setNumber(user.number);
        setGender(user.gender);
        setDob(user.dob.toString().split('T')[0]); // Assuming dob is a Date object
    }, [user]);

    return (
        <div className="h-screen mt-32">
            <div className="w-full bg-white flex flex-col mt-7 items-center">
                <form className="flex flex-col gap-5 text-lg" onSubmit={submitHandler}>
                    <h1 className="mb-7 text-4xl text-center">Update Profile</h1>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        placeholder="Enter Your Name"
                        className="w-96 rounded-md outline-none border p-3"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                    />
                    <input
                        type="number"
                        name="number"
                        id="number"
                        placeholder="Enter Your Mobile Number"
                        className="w-96 rounded-md outline-none border p-3"
                        value={number}
                        onChange={(e) => setNumber(Number(e.target.value))}
                    />
                    <input
                        type="date"
                        name="dob"
                        id="dob"
                        placeholder="Enter Your DOB"
                        className="w-96 rounded-md outline-none border p-3"
                        value={dob}
                        onChange={(e) => setDob(e.target.value)}
                    />
                    <input
                        type="email"
                        name="email"
                        id="email"
                        placeholder="Enter Your Email Address"
                        className="w-96 rounded-md outline-none border p-3"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                    <input
                        type="password"
                        name="password"
                        id="password"
                        placeholder="Enter Your Password"
                        className="w-96 rounded-md outline-none border p-3"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                    <select
                        name="gender"
                        id="gender"
                        className="w-96 rounded-md outline-none border p-3"
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
                        className="w-96 rounded-md outline-none border p-3"
                        onChange={handlePhoto}
                    />
                    <button type="submit" className="w-96 rounded-md outline-none border p-3 bg-green-700">Update</button>
                </form>
            </div>
        </div>
    )
}

export default UpdateProfile;
