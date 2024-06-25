import { useSelector } from "react-redux";
import { ShowReviewCardType } from "../vite-env";
import { initialUserStateType } from "../types/initialState-types";
import toast from "react-hot-toast";
import { useState } from "react";
import { useDeleteCommentMutation } from "../redux/api/comment";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { DeleCommentResponse } from "../types/api-types";
import { Link } from "react-router-dom";

const ShowCommentCard = (
    { name, photo, title, description, commentedUser, id, RefetchComments, createdAt }: ShowReviewCardType
) => {
    const { user } = useSelector((state: { userReducer: initialUserStateType }) => state.userReducer);
    const [disable, setDisable] = useState<boolean>(false);
    const [deleteComment] = useDeleteCommentMutation();

    const deleteCommentHandeler = async () => {
        setDisable(true);

        if (!user) {
            toast.error("Please Login First");
            return;
        }

        try {
            const res = await deleteComment({
                comment_id: id,
                user_id: user?._id
            });

            if ("data" in res) {
                toast.success(res.data.message);
                RefetchComments();
            }
            else {
                const error = res.error as FetchBaseQueryError;
                const messageResponse = error.data as DeleCommentResponse;
                toast.error(messageResponse.message);
            }
        } catch (error: any) {
            console.log(error);
            toast.error(error.message);
        }
    }

    return (
        <div className="border rounded-lg shadow-lg w-full h-auto p-2 mb-2">
            {/* photo and name of the user */}
            <section className="flex flex-col md:flex-row md:items-center gap-7">
                <img src={photo} alt={`${name}`} className="rounded-full w-11 h-11 md:w-16 md:h-16" />
                <div className="flex gap-3 flex-col md:flex-row items-center">
                    <h1 className="font-bold">{name}</h1>
                    {(user?._id === commentedUser) && (
                        <div className="md:ml-auto flex items-center mt-2 md:mt-0">
                            <button
                                disabled={disable}
                                onClick={deleteCommentHandeler}
                                className="border px-3 rounded-lg bg-red-600 text-white mr-2"
                            >
                                Delete
                            </button>
                            <Link to={`/comment/update/${id}`} className="border px-3 rounded-lg bg-red-600 text-white mr-2">
                                Update
                            </Link>
                            <span className="font-bold hidden md:inline-block">Date(yyyy-MM-DD): {String(createdAt).split('T')[0]}</span>
                        </div>
                    )}
                </div>
            </section>

            {/* title and description of the review */}
            <section className="mt-2">
                <h1 className="font-bold">{title}</h1>
                <p className="text-sm">{description}</p>
            </section>
        </div>

    )
}

export default ShowCommentCard;
