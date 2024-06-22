import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { NewPayementBody, NewPayementResponse } from "../../types/api-types";

export const payementAPI = createApi({
    reducerPath: "payementAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/pay/`,
        credentials: "include"
    }),
    endpoints: (builder) => ({
        newPayement: builder.query<NewPayementResponse, NewPayementBody>({
            query: ({amount}) => ({
                url: "new",
                method: "POST",
                body: {amount}
            })
        })
    }),

});

export const {useNewPayementQuery} = payementAPI;
