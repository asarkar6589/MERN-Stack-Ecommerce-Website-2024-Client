/// <reference types="vite/client" />

import { Dispatch, SetStateAction } from "react";
import { Comment, User } from "./types/api-types";
import { cartItemsType } from "./types/initialState-types";

export interface ProductCartType {
    id: string,
    name: string,
    photo: string,
    price: number,
    stock: number,
    addToCart: () => void
}

export interface ShowReviewCardType {
    name: string,
    photo: string,
    title: string,
    description: string,
    commentedUser: string,
    id:string,
    RefetchComments: () => QueryActionCreatorResult<QueryDefinition<GetCommentBody, BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError, {}, FetchBaseQueryMeta>, never, GetCommentsResponse, "commentAPI">>,
    createdAt: Date,
    updatedAt: Date
}

export interface ProtectedRoutesType {
    children?: React.ReactElement;
    isAuthenticated: boolean,
    adminOnly?: boolean, // admin specific route
    admin?: boolean // wether the logged in user is admin or not.
    redirect?: string!
}

export interface DataType {
    photo: ReactElement;
    name: string;
    price: number;
    stock: number;
    action: ReactElement;
}

export interface UserDataType {
    photo: ReactElement;
    name: string;
    gender: string;
    email: string;
    role: "User" | "Admin"
    action: ReactElement
}


export interface AllTransactionsTable {
    id: string,
    total: number,
    discount: number,
    subTotal: number,
    tax: number,
    status: ReactElement,
    action: ReactElement
}

export interface AllCancelTransactionsTable {
    id: string,
    total: number,
    status: ReactElement,
    action: ReactElement
}