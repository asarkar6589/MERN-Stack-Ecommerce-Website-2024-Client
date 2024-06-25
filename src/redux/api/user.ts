import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import {
  DeleteUserResponse,
  LoginResponse,
  LogoutResponse,
  RegistrationResponse,
  UpdateUserBody,
  UpdateUserResponse,
  UserForLogin,
  UserForRegistration,
  getAllUsers,
  getProfileResponse,
  sendMailResponse,
  updatePasswordBody,
  updatePasswordResponse,
} from "../../types/api-types";

export const userAPI = createApi({
  reducerPath: "userAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: `${import.meta.env.VITE_BACKEND_URL}/user/`,
    credentials: "include", // Include credentials in cross-origin requests, we have to give this, else cookies will not be set.
  }),
  endpoints: (builder) => ({
    register: builder.mutation<RegistrationResponse, UserForRegistration>({
      query: ({ formData }) => ({
        url: "new",
        method: "POST",
        body: formData,
      }),
    }),
    login: builder.mutation<LoginResponse, UserForLogin>({
      query: ({ email, password }) => ({
        url: "login",
        method: "POST",
        body: {
          email,
          password,
        },
      }),
    }),
    logout: builder.mutation<LogoutResponse, null>({
      query: () => {
        return {
          url: "logout",
          method: "POST",
        };
      },
    }),
    getUser: builder.query<getProfileResponse, null>({
      query: () => "account",
    }),
    getAllUser: builder.query<getAllUsers, string>({
      query: () => "all",
    }),
    deleteUser: builder.mutation<DeleteUserResponse, string>({
      query: (id) => ({
        url: `delete/${id}`,
        method: "DELETE",
        body: id,
      }),
    }),
    updateUser: builder.mutation<UpdateUserResponse, UpdateUserBody>({
      query: ({ id, formData }) => ({
        url: `${id}`,
        body: formData,
        method: "PUT",
      }),
    }),
    sendMail: builder.mutation<sendMailResponse, string>({
      query: (email) => ({
        url: "forgetpassword",
        body: { email },
        method: "POST",
      }),
    }),
    updatePassword: builder.mutation<
      updatePasswordResponse,
      updatePasswordBody
    >({
      query: ({ token, password }) => ({
        url: `resetpassword/${token}`,
        body: { password },
        method: "PUT",
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useGetUserQuery,
  useGetAllUserQuery,
  useDeleteUserMutation,
  useLogoutMutation,
  useUpdateUserMutation,
  useSendMailMutation,
  useUpdatePasswordMutation,
} = userAPI;
