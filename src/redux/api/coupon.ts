import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CheckCouponResponse, CreateCouponBody, CreateNewCouponResponse, DeleteCouponByIdResponse, GetAllCouponsResponse, GetCouponByIdResponse, UpdateCouponBody, UpdateCouponByIdResponse } from "../../types/api-types";

export const couponAPI = createApi({
    reducerPath: "couponAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/coupon/`,
        credentials: "include"
    }),
    endpoints: (builder) => ({
        newCoupon: builder.mutation<CreateNewCouponResponse, CreateCouponBody>({
            query: ({name, discount}) => ({
                url: "new",
                method: "POST",
                body: {name: name, discount: discount}
            })
        }),
        getAllCoupon: builder.query<GetAllCouponsResponse, null>({
            query: () => "all"
        }),
        getCouponById: builder.query<GetCouponByIdResponse, string>({
            query: (id) => `${id}`
        }),
        updateCoupon: builder.mutation<UpdateCouponByIdResponse, UpdateCouponBody>({
            query: ({id, name, discount}) => ({
                url: `${id}`,
                method: "PUT",
                body: {
                    name, discount
                }
            })
        }),
        deleteCoupon: builder.mutation<DeleteCouponByIdResponse, string>({
            query: (id) => ({
                url: `${id}`,
                method: "DELETE",
            })
        }),
        checkCoupon: builder.query<CheckCouponResponse, string>({
            query: (name) => ({
                url: `check/${name}`,
                method: "GET",
            })
        }),
    })

});

export const {useNewCouponMutation, useGetAllCouponQuery, useGetCouponByIdQuery, useUpdateCouponMutation, useDeleteCouponMutation, useCheckCouponQuery} = couponAPI;
