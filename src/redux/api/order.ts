import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetDeleteOrderByUserResponse, GetOrderByIdAdminResponse, GetOrderByUserResponse, GetUpdateOrderByAdminResponse, NewOrderBody, NewOrderResponse } from "../../types/api-types";

export const orderAPI = createApi({
    reducerPath: "orderAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/order/`,
        credentials: "include"
    }),
    tagTypes: ["orders"],
    endpoints: (builder) => ({
        newOrder: builder.mutation<NewOrderResponse, NewOrderBody>({
            query: ({product, discount, subTotal, shippingCharges, tax, shippingAddress, total, user}) => ({
                url: "new",
                method: "POST",
                body: {
                    product, 
                    discount, 
                    subTotal, 
                    shippingCharges, 
                    tax, 
                    shippingAddress, 
                    total,
                    user
                }
            }),
            invalidatesTags: ["orders"]
        }),
        getOrderByUser: builder.query<GetOrderByUserResponse, null>({
            query: () => "all",
            providesTags: ["orders"]
        }),
        getOrderByAdmin: builder.query<GetOrderByUserResponse, null>({
            query: () => "admin/all",
            providesTags: ["orders"]
        }),
        deleteOderByUser: builder.mutation<GetDeleteOrderByUserResponse, string>({
            query: (id) => ({
                url: `delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["orders"]
        }),
        updateOrderByAdmin: builder.mutation<GetUpdateOrderByAdminResponse, string>({
            query: (id) => ({
                url: `admin/update/${id}`,
                method: "PUT",
            }),
            invalidatesTags: ["orders"]
        }),
        getOrderById: builder.query<GetOrderByIdAdminResponse, string>({
            query: (id) => `${id}`,
            providesTags: ["orders"]
        }),
        getOrderByAdminId: builder.query<GetOrderByIdAdminResponse, string>({
            query: (id) => `admin/${id}`,
            providesTags: ["orders"]
        }),
    }),

});

export const {useNewOrderMutation, useGetOrderByAdminQuery, useGetOrderByUserQuery, useDeleteOderByUserMutation, useUpdateOrderByAdminMutation, useGetOrderByIdQuery, useGetOrderByAdminIdQuery} = orderAPI;
