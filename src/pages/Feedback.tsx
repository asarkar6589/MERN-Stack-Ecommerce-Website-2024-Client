import { FetchBaseQueryError } from "@reduxjs/toolkit/query";
import { FormEvent, useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { useNewFeedbackMutation } from "../redux/api/feedback";
import { GetFeedbackResponse } from "../types/api-types";

const Feedback = () => {
    const navigate = useNavigate();
    const [rating, setRating] = useState<number>(1);
    const [feedback, setFeedback] = useState<string>("");
    const [newFeedback] = useNewFeedbackMutation();

    const submitHandeler = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        try {
            const res = await newFeedback({
                rating,
                feedback
            });

            if ("data" in res) {
                toast.success(res.data.message);
                navigate("/");
            }
            else {
                const error = res.error as FetchBaseQueryError;
                const messageResponse = error.data as GetFeedbackResponse;
                toast.error(messageResponse.message);
            }
        } catch (error: any) {
            toast.error(error.message);
            return;
        }
    }

    return (
        <div className="flex flex-col justify-center items-center w-full h-screen">
            <h1 className="mb-7 text-4xl">Feedback Form</h1>

            <form className="flex flex-col gap-5 text-lg" onSubmit={submitHandeler}>
                <label htmlFor="rate">Rate us out of 5</label>
                <input
                    type="number"
                    name="rating"
                    id="rating"
                    placeholder="Rate Us Out Of 5"
                    required
                    className="w-96 rounded-md outline-none border p-3 -mt-5"
                    value={rating}
                    min={1}
                    max={5}
                    onChange={e => setRating(Number(e.target.value))}
                />

                <textarea
                    name="feedback"
                    required
                    id="feedback"
                    placeholder="Your Feedback"
                    className="w-96 rounded-md outline-none border p-3"
                    value={feedback}
                    onChange={e => setFeedback(e.target.value)}
                ></textarea>

                <button type="submit" className="w-96 rounded-md outline-none border p-3 bg-green-700">Submit</button>
            </form>
        </div>
    )
}

export default Feedback;
