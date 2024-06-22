import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { DeleCommentResponse, DeleteCommentBody, GetCommentBody, GetCommentByIdBody, GetCommentByIdResponse, GetCommentsResponse, UpdateCommentBody, UpdateCommentResponse, newCommentBody, newCommentResponse } from "../../types/api-types";

export const commentAPI = createApi({
    reducerPath: "commentAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/comment/`,
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        newComment: builder.mutation<newCommentResponse, newCommentBody>({
            query: (newCommentBody) => ({
                url: `new?productId=${newCommentBody.productId}`,
                method: "POST",
                body: newCommentBody
            })
        }),
        getCommentByProduct: builder.query<GetCommentsResponse, GetCommentBody>({
            query: (GetCommentBody) => `all?product=${GetCommentBody.product}`
        }),
        deleteComment: builder.mutation<DeleCommentResponse, DeleteCommentBody>({
            query: ({comment_id, user_id}) => ({
                url: `delete?comment_id=${comment_id}&user_id=${user_id}`,
                method: "DELETE",
                body: {
                    comment_id: comment_id,
                    user_id: user_id
                }
            })
        }),
        getCommentById: builder.query<GetCommentByIdResponse, GetCommentByIdBody>({
            query: ({id}) => `${id}`
        }),
        updateComment: builder.mutation<UpdateCommentResponse, UpdateCommentBody>({
            query: ({id, title, description}) => ({
                url: `${id}`,
                method: "PUT",
                body: {
                    title,
                    description
                }
            })
        })
    })
});

export const {useNewCommentMutation, useGetCommentByProductQuery, useDeleteCommentMutation, useGetCommentByIdQuery, useUpdateCommentMutation} = commentAPI;
