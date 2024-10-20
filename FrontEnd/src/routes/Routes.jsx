// AppRoutes.jsx (or Routes.jsx)
import { createBrowserRouter } from "react-router-dom";

// Import your components
import AuthScreen from "Auth/AuthScreen";
import NotFound from "components/NotFound";
import { Layout, Dashboard, Products, Customers, Transactions, Geography, Overview, Daily, Monthly, Breakdown, Admin, Performance } from "scenes";

// Define the admin routes
const adminRoutes = [
  { index: true, path: "dashboard", element: <Dashboard /> },
  { path: "products", element: <Products /> },
  { path: "customers", element: <Customers /> },
  { path: "transactions", element: <Transactions /> },
  { path: "geography", element: <Geography /> },
  { path: "sales-overview", element: <Overview /> },
  { path: "sales-daily", element: <Daily /> },
  { path: "sales-monthly", element: <Monthly /> },
  { path: "sales-breakdown", element: <Breakdown /> },
  { path: "admin", element: <Admin /> },
  { path: "performance", element: <Performance /> },
];

// Create router
export const router = createBrowserRouter([
  {
    path: "/e-com/admin/auth",
    element: <AuthScreen />,
  },
  {
    path: "/e-com/admin",
    element: <Layout />,
    children: adminRoutes,
  },
  {
    path: "*",
    element: <NotFound />,
  },
]);
