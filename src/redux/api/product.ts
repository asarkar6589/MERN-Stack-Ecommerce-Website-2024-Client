import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { AdminProductsResponse, AllBrandsResponse, AllCategoriesResponse, DeleteProductResponse, SearchProductBodyInput, SearchProductResponse, UpdateProductBody, UpdateProductResponse, newProductBody, newProductResponse, singleProductResponse } from "../../types/api-types";

export const productAPI = createApi({
    reducerPath: "productAPI",
    baseQuery: fetchBaseQuery({
        baseUrl: `${import.meta.env.VITE_BACKEND_URL}/product/`,
        credentials: 'include', // Include credentials in cross-origin requests, we have to give this, else cookies will not be set.
    }),
    endpoints: (builder) => (
        {
            getLatesProducts: builder.query({
                query: () => "latest"
            }),
            getSingleProduct: builder.query<singleProductResponse, string>({
                query: (id) => `${id}`
            }),
            searchProducts: builder.query<SearchProductResponse, SearchProductBodyInput>({
                query: ({name, sort, price, page, category, brand}) => {
                    let BaseQuery = `all?name=${name}&price=${price}`;

                    if (sort) {
                        BaseQuery += `&sort=${sort}`;
                    }

                    if (page) {
                        BaseQuery += `&page=${page}`;
                    }

                    if (category) {
                        BaseQuery += `&category=${category}&`;
                    }

                    if (brand) {
                        BaseQuery += `&brand=${brand}`
                    }
                    
                    return BaseQuery;
                }
            }),
            getBrands: builder.query<AllBrandsResponse, string>({
                query: () => "brand"
            }),
            getCategories: builder.query<AllCategoriesResponse, string>({
                query: () => "categories"
            }),
            getAllAdminProducts: builder.query<AdminProductsResponse, string>({
                query: () => "admin/allProducts"
            }),
            newProduct: builder.mutation<newProductResponse, newProductBody>({
                query: ({formData}) => ({
                    url: "/admin/new",
                    body: formData,
                    method: "POST",
                })
            }),
            updateProduct: builder.mutation<UpdateProductResponse, UpdateProductBody>({
                query: ({id, formData}) => ({
                    url: `${id}`,
                    body: formData,
                    method: "PUT"
                })
            }),
            deleteProduct: builder.mutation<DeleteProductResponse, string>({
                query:(id) => ({
                    url: `${id}`,
                    method: "DELETE"
                })
            })
        }
    )
});

export const {
    useGetLatesProductsQuery, 
    useGetSingleProductQuery, 
    useSearchProductsQuery, 
    useGetBrandsQuery, 
    useGetCategoriesQuery,
    useGetAllAdminProductsQuery,
    useNewProductMutation,
    useUpdateProductMutation,
    useDeleteProductMutation
} = productAPI;
