import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetAllCancelledOrdersByAdminResponse, GetCancelledOrdersByIdResponse } from "../../types/api-types";

export const cancellOrderAPI = createApi({
    reducerPath: "cancellOrderAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/order/canceled/`,
        credentials: 'include'
    }),
    endpoints: (builder) => ({
        getAllCancelledOrders: builder.query<GetAllCancelledOrdersByAdminResponse, null>({
            query: () => ({
                url: `all`,
                method: "GET"
            })
        }),
        getCancelledOrderById: builder.query<GetCancelledOrdersByIdResponse, string>({
            query: (id) => `${id}`
        }),
        updateorderById: builder.mutation<string, string>({
            query: (id) => ({
                url: `${id}`,
                method: "PUT"
            })
        })
    })
});

export const {useGetAllCancelledOrdersQuery, useGetCancelledOrderByIdQuery, useUpdateorderByIdMutation} = cancellOrderAPI;
