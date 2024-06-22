import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { FormEvent, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaShoppingCart } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loader from "../components/Loader";
import ShowCommentCard from "../components/ShowReviewCard";
import { useGetCommentByProductQuery, useNewCommentMutation } from "../redux/api/comment";
import { useGetSingleProductQuery } from "../redux/api/product";
import { addToCartFun, calculatePrice } from "../redux/reducer/cartReducer";
import { Comment, newCommentResponse } from "../types/api-types";
import { initialUserStateType } from "../types/initialState-types";

const ProductById = () => {
    const { user } = useSelector((state: { userReducer: initialUserStateType }) => state.userReducer);
    const params = useParams();
    const id = params.id!;
    const [title, setTitle] = useState<string>("");
    const [description, setDescription] = useState<string>("");
    const [disable, setDisable] = useState<boolean>(false);
    const [allReviews, setAllReviews] = useState<Comment[]>([]);
    const { data, refetch, isLoading } = useGetSingleProductQuery(id);
    const [newComment] = useNewCommentMutation();
    const { data: comment, refetch: RefetchComments } = useGetCommentByProductQuery({
        product: id
    });
    const dispatch = useDispatch();

    const addToCart = () => {
        if (!user) {
            toast.error("Please Login First !");
            return;
        }
        if (data) {
            if (data.product.stock > 0) {
                dispatch(addToCartFun({
                    id: data.product._id,
                    photo: data.product.photo,
                    price: data.product.price,
                    quantity: 1, // initially 1
                    name: data.product.name,
                    stock: data.product.stock
                }));
                dispatch(calculatePrice());
                toast.success("Added To Cart");
            }
            else {
                toast.error("Out Of Stock");
            }
        }
    }

    const submitHandeler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setDisable(true);

        try {
            const res = await newComment({
                title,
                description,
                productId: id
            })

            if ("data" in res) {
                toast.success(res.data.message);
                RefetchComments();
            }
            else {
                const error = res.error as FetchBaseQueryError;
                const messageResponse = error.data as newCommentResponse;
                toast.error(messageResponse.message);
            }
            setDisable(false);
        } catch (error: any) {
            toast.error(error.message);
            setDisable(false);
        }
        setTitle("");
        setDescription("");
    }

    useEffect(() => {
        if (comment) {
            let x = comment.comments as Comment[];
            setAllReviews(x);
        }
        refetch();
        RefetchComments();
    }, [comment]);

    return (
        <div className="w-full mt-11 h-auto p-11">
            {/* image and description */}
            {isLoading ? (
                <Loader />
            ) : (
                data?.product && (
                    <section className="flex flex-col md:flex-row justify-around">
                        <div className="w-full md:w-1/2 p-5 rounded-lg flex justify-center items-center">
                            <img
                                src={`${import.meta.env.VITE_PHOTO_URL}/${data?.product.photo}`}
                                alt={data.product.name}
                                className="w-full h-auto md:w-3/4 lg:w-2/3 xl:w-1/2"
                            />
                        </div>

                        <div className="py-9 w-full md:w-1/2">
                            <h1 className="text-4xl font-bold">{data.product.name}</h1>
                            <p className="font-semibold mt-5 ">{data.product.description}</p>

                            <div className="mt-5 flex flex-col md:flex-row items-center gap-5">
                                <span className="text-xl">Rs: {data.product.price}</span>
                                <button
                                    onClick={addToCart}
                                    className="border p-2 md:w-36 rounded-lg flex bg-black text-white font-semibold justify-center items-center"
                                >
                                    <FaShoppingCart /> Add to Cart
                                </button>
                            </div>
                        </div>
                    </section>
                )
            )}

            {/* Reviews */}
            <section className="mt-11 flex flex-col md:flex-row">
                {/* Add review */}
                <div className="w-full md:w-1/2 md:pr-4">
                    <h1 className="mb-7 font-bold text-2xl">Add Review</h1>

                    <form className="flex flex-col gap-5 text-lg" onSubmit={submitHandeler}>
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

                        <button
                            disabled={disable}
                            type="submit"
                            className="w-full rounded-md outline-none border p-3 bg-green-700"
                        >
                            Add Review
                        </button>
                    </form>
                </div>

                {/* Show all reviews */}
                <div className="w-full md:w-1/2 md:pl-4">
                    {allReviews.length > 0 && (
                        <>
                            <h1 className="mb-7 font-bold mt-11 text-2xl">Reviews About the Product</h1>
                            {allReviews.map((review) => (
                                <ShowCommentCard
                                    key={review._id}
                                    name={review.user?.name}
                                    photo={`${import.meta.env.VITE_PHOTO_URL}/${review.user?.photo}`}
                                    title={review.title}
                                    description={review.description}
                                    commentedUser={review.user?._id}
                                    id={review._id}
                                    RefetchComments={RefetchComments}
                                    createdAt={review.createdAt}
                                    updatedAt={review.updatedAt}
                                />
                            ))}
                        </>
                    )}
                </div>
            </section>
        </div>
    )
}

export default ProductById;
