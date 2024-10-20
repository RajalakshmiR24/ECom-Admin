import { createApi } from "@reduxjs/toolkit/query/react";
import axiosInstance from "../utils/axiosInstance";

// Custom base query function using axios
const axiosBaseQuery =
  ({ baseUrl } = { baseUrl: "" }) =>
  async ({ url, method, data, params }) => {
    try {
      const result = await axiosInstance({
        url: baseUrl + url,
        method,
        data,
        params,
      });
      return { data: result.data };
    } catch (axiosError) {
      let err = axiosError;
      return {
        error: {
          status: err.response?.status,
          data: err.response?.data || err.message,
        },
      };
    }
  };

// Backend API using axiosInstance
export const api = createApi({
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.REACT_APP_ECom,
  }),
  reducerPath: "adminApi",
  tagTypes: [
    "User",
    "Products",
    "Customers",
    "Transactions",
    "Geography",
    "Sales",
    "Admins",
    "Performance",
    "Dashboard",
  ],
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => ({
        url: `api/admin/general/user/${id}`,
        method: "GET",
      }),
      providesTags: ["User"],
    }),
    getProducts: build.query({
      query: () => ({
        url: "api/admin/client/products",
        method: "GET",
      }),
      providesTags: ["Products"],
    }),
    getCustomers: build.query({
      query: () => ({
        url: "api/admin/client/customers",
        method: "GET",
      }),
      providesTags: ["Customers"],
    }),
    getTransactions: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "api/admin/client/transactions",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),
    getGeography: build.query({
      query: () => ({
        url: "api/admin/client/geography",
        method: "GET",
      }),
      providesTags: ["Geography"],
    }),
    getSales: build.query({
      query: () => ({
        url: "api/admin/sales/sales",
        method: "GET",
      }),
      providesTags: ["Sales"],
    }),
    getAdmins: build.query({
      query: () => ({
        url: "api/admin/management/admins",
        method: "GET",
      }),
      providesTags: ["Admins"],
    }),
    getUserPerformance: build.query({
      query: (id) => ({
        url: `admin/management/performance/${id}`,
        method: "GET",
      }),
      providesTags: ["Performance"],
    }),
    getDashboard: build.query({
      query: () => ({
        url: "api/admin/general/dashboard",
        method: "GET",
      }),
      providesTags: ["Dashboard"],
    }),
  }),
});

// Export API endpoints
export const {
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
  useGetAdminsQuery,
  useGetUserPerformanceQuery,
  useGetDashboardQuery,
} = api;
