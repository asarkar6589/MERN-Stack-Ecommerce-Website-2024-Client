import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetFeedbackBody, GetFeedbackResponse } from "../../types/api-types";

export const feedbackAPI = createApi({
    reducerPath: "feedbackAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/feedback/`,
        credentials: "include"
    }),
    endpoints: (builder) => ({
        newFeedback: builder.mutation<GetFeedbackResponse, GetFeedbackBody>({
            query: ({rating, feedback}) => ({
                url: "new",
                method: "POST",
                body: {
                    rating,
                    feedback
                }
            })
        }),
    })
});

export const {useNewFeedbackMutation} = feedbackAPI;