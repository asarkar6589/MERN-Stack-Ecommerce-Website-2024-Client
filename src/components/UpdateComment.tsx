import { useNavigate, useParams } from "react-router-dom";
import { useGetCommentByIdQuery, useGetCommentByProductQuery, useUpdateCommentMutation } from "../redux/api/comment";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { UpdateCommentResponse } from "../types/api-types";

const UpdateComment = () => {
    const params = useParams();
    const navigate = useNavigate();
    const id = params.id!;

    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [pId, setPId] = useState<string>("");

    const { data } = useGetCommentByIdQuery({ id });
    const [updateComment] = useUpdateCommentMutation();

    useEffect(() => {
        if (data) {
            setTitle(data.comment.title);
            setDescription(data.comment.description);
            setPId(data.comment.product)
        }
    }, [data]);

    const { refetch: RefetchComments } = useGetCommentByProductQuery({
        product: pId
    });

    const submitHandler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const res = await updateComment({
                id,
                title,
                description,
            });

            if ("data" in res) {
                toast.success(res.data.message);
                navigate(`/product/${data?.comment.product}`)
                RefetchComments();
            }
            else {
                const error = res.error as FetchBaseQueryError;
                const messageResponse = error.data as UpdateCommentResponse;
                toast.error(messageResponse.message);
            }
        } catch (error: any) {
            toast.error(error.message || "Some Error occurred, please try again later.");
        }
    }

    return (
        <div className="flex flex-col justify-center items-center w-full mt-32 px-4">
            <h1 className="mb-7 text-4xl text-center">Update Comment</h1>

            <form className="flex flex-col gap-5 text-lg w-full max-w-md" onSubmit={submitHandler}>
                <input
                    type="text"
                    name="title"
                    id="title"
                    placeholder="Title of your review"
                    required
                    className="w-full rounded-md outline-none border p-3"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <textarea
                    name="description"
                    id="desc"
                    placeholder="Description"
                    required
                    className="w-full rounded-md outline-none border p-3"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <button type="submit" className="w-full rounded-md outline-none border p-3 bg-green-700 text-white">Update</button>
            </form>
        </div>
    )
}

export default UpdateComment;
