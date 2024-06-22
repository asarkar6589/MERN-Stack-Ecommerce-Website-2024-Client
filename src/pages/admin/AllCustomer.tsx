import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaTrash } from "react-icons/fa";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loader from "../../components/Loader";
import AdminSideBar from "../../components/admin/AdminSideBar";
import Table from "../../components/admin/Table";
import { useDeleteUserMutation, useGetAllUserQuery } from "../../redux/api/user";
import { DeleteUserResponse, User } from "../../types/api-types";
import { initialUserStateType } from "../../types/initialState-types";
import { UserDataType } from "../../vite-env";

const columns = [
    {
        Header: 'Photo',
        accessor: 'photo',
    },
    {
        Header: 'Name',
        accessor: 'name',
    },
    {
        Header: 'Gender',
        accessor: 'gender',
    },
    {
        Header: 'Email',
        accessor: 'email',
    },
    {
        Header: 'Role',
        accessor: 'role',
    },
    {
        Header: 'Action',
        accessor: 'action',
    },
];

const AllCustomer = () => {
    const { user: loggedInUser } = useSelector((state: { userReducer: initialUserStateType }) => state.userReducer);
    const navigate = useNavigate();
    const { data, isLoading, refetch } = useGetAllUserQuery("");
    const [deleteUser] = useDeleteUserMutation();
    const [rows, setRows] = useState<UserDataType[]>([]);

    const fetchData = async () => {
        try {
            if (data) {
                const users = data.users as User[];
                const updateRows = users.map((user) => {
                    return {
                        photo: <img src={`${import.meta.env.VITE_PHOTO_URL}/${user.photo}`} alt={user.name} className="w-11 h-11 rounded-full" />,
                        name: user.name,
                        gender: user.gender,
                        email: user.email,
                        role: user.role,
                        action: <button disabled={user._id === loggedInUser?._id} onClick={async () => {
                            const res = await deleteUser(user._id);

                            // setToggle(prev => !prev);

                            if ("data" in res) {
                                toast.success(res.data.message);
                                refetch(); // I want that the moment i click on this button, the updated value should be refetched, so i can take refetch from rtk query and can refetch the data.
                                navigate("/admin/customer");
                            }
                            else {
                                const error = res.error as FetchBaseQueryError;
                                const messageResponse = error.data as DeleteUserResponse;
                                toast.error(messageResponse.message);
                            }
                        }}><FaTrash /></button>
                    }
                })
                setRows(updateRows);
            }
        } catch (error: any) {
            toast.error(error.message);
        }
    }

    useEffect(() => {
        fetchData();
    }, [data]);
    return (
        <div className="w-full flex justify-between h-full mt-3">
            {/* Admin Sidebar */}
            <section>
                <AdminSideBar />
            </section>

            {/* Customets */}
            <section className="w-3/4 h-full mt-16 p-5 mr-9">
                <h1 className="text-4xl text-center font-extralight mt-5 mb-16">Users</h1>
                {isLoading ? <Loader /> : <Table columns={columns} data={rows} />}
            </section>
        </div>
    )
}

export default AllCustomer;
