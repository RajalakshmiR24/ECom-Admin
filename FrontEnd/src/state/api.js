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
      // Extract error response if available
      let err = axiosError.response ? axiosError.response : axiosError;
      return {
        error: {
          status: err.status,
          data: err.data || err.message,
        },
      };
    }
  };

// Backend API using axiosInstance
export const api = createApi({
  reducerPath: "adminApi",
  baseQuery: axiosBaseQuery({
    baseUrl: process.env.REACT_APP_ECom, // Ensure this environment variable is set correctly
  }),
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
    // Login endpoint
    login: build.mutation({
      query: (credentials) => ({
        url: "api/auth/login", // Adjust the URL path if necessary
        method: "POST",
        data: credentials, // Change from 'data' to 'body' to match Axios defaults
      }),
    }),

    // Register endpoint
    register: build.mutation({
      query: (newUser) => ({
        url: "api/auth/register", // Adjust the URL path if necessary
        method: "POST",
        data: newUser, // Change from 'data' to 'body' to match Axios defaults
      }),
    }),

    // Other existing endpoints
    getUser: build.query({
      query: (id) => `api/admin/general/user/${id}`, // Simplified for clarity
      providesTags: ["/e-com/admin/User"],
    }),
    getProducts: build.query({
      query: () => "api/admin/client/products", // Simplified for clarity
      providesTags: ["/e-com/admin/Products"],
    }),
    getCustomers: build.query({
      query: () => "api/admin/client/customers", // Simplified for clarity
      providesTags: ["/e-com/admin/Customers"],
    }),
    getTransactions: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "api/admin/client/transactions",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["/e-com/admin/Transactions"],
    }),
    getGeography: build.query({
      query: () => "api/admin/client/geography", // Simplified for clarity
      providesTags: ["/e-com/admin/Geography"],
    }),
    getSales: build.query({
      query: () => "api/admin/sales/sales", // Simplified for clarity
      providesTags: ["/e-com/admin/Sales"],
    }),
    getAdmins: build.query({
      query: () => "api/admin/management/admins", // Simplified for clarity
      providesTags: ["/e-com/admin/Admins"],
    }),
    getUserPerformance: build.query({
      query: (id) => `api/admin/management/performance/${id}`, // Simplified for clarity
      providesTags: ["/e-com/admin/Performance"],
    }),
    getDashboard: build.query({
      query: () => "api/admin/general/dashboard", // Simplified for clarity
      providesTags: ["/e-com/admin/Dashboard"],
    }),
  }),
});

// Export API endpoints
export const {
  useLoginMutation,
  useRegisterMutation,
  useGetUserQuery,
  useGetProductsQuery,
  useGetCustomersQuery,
  useGetTransactionsQuery,
  useGetGeographyQuery,
  useGetSalesQuery,
  useGetAdminsQuery,
  useGetUserPerformanceQuery,
  useGetDashboardQuery,
} = api; // Updated from 'API' to 'api'
