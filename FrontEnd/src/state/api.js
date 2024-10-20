import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// Backend Api
export const api = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl:
      process.env.REACT_APP_BASE_URL
  }), // base url
  reducerPath: "adminApi",
  // tags
  tagTypes: [
    "User",
    "Producs",
    "Customers",
    "Transactions",
    "Geography",
    "Sales",
    "Admins",
    "Performance",
    "Dashboard",
  ],
  // endpoints
  endpoints: (build) => ({
    getUser: build.query({
      query: (id) => `admin/general/user/${id}`,
      providesTags: ["User"],
    }),
    getProducts: build.query({
      query: () => "admin/client/products",
      providesTags: ["Products"],
    }),
    getCustomers: build.query({
      query: () => "admin/client/customers",
      providesTags: ["Customers"],
    }),
    getTransactions: build.query({
      query: ({ page, pageSize, sort, search }) => ({
        url: "admin/client/transactions",
        method: "GET",
        params: { page, pageSize, sort, search },
      }),
      providesTags: ["Transactions"],
    }),
    getGeography: build.query({
      query: () => "admin/client/geography",
      providesTags: ["Geography"],
    }),
    getSales: build.query({
      query: () => "admin/sales/sales",
      providesTags: ["Sales"],
    }),
    getAdmins: build.query({
      query: () => "admin/management/admins",
      providesTags: ["Admins"],
    }),
    getUserPerformance: build.query({
      query: (id) => `admin/management/performance/${id}`,
      providesTags: ["Performance"],
    }),
    getDashboard: build.query({
      query: () => "admin/general/dashboard",
      providesTags: ["Dashboard"],
    }),
  }),
});

// export api endpoints
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
