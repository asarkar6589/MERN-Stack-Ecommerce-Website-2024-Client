import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { GetBarChartResponse, GetDashboardData, GetLineChartData, GetPieStatsResponse } from "../../types/api-types";


export const statsAPI = createApi({
    reducerPath: "statsAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/stats/`,
        credentials: "include"
    }),
    endpoints: (builder) => ({
        getPie: builder.query<GetPieStatsResponse, null>({
            query: () => "pie"
        }),
        getBar: builder.query<GetBarChartResponse, null>({
            query: () => "bar"
        }),
        getLineChart: builder.query<GetLineChartData, null>({
            query: () => "line"
        }),
        getDashboard: builder.query<GetDashboardData, null>({
            query: () => "dashboard"
        })
    }),

});

export const {useGetPieQuery, useGetBarQuery, useGetLineChartQuery, useGetDashboardQuery} = statsAPI;
