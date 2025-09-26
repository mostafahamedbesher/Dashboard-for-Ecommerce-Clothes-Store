import { lazy, Suspense } from "react";
import {
  createBrowserRouter,
  Navigate,
  RouterProvider,
} from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

import RootLayout from "./pages/RootLayout.tsx";
import ProtectedRoute from "./features/authentication/ProtectedRoute.tsx";
import { DarkModeProvider } from "./contexts/DarkModeContext.tsx";
import Loader from "./ui/Loader.tsx";

// lazy loading
const Dashboard = lazy(() => import("./pages/Dashboard.tsx"));
const Products = lazy(() => import("./pages/Products.tsx"));
const Orders = lazy(() => import("./pages/Orders.tsx"));
const Users = lazy(() => import("./pages/Users.tsx"));
const Settings = lazy(() => import("./pages/Settings.tsx"));
const ErrorPage = lazy(() => import("./pages/ErrorPage.tsx"));
const Account = lazy(() => import("./pages/Account.tsx"));
const Login = lazy(() => import("./pages/Login.tsx"));
const ProductEdit = lazy(() => import("./features/products/ProductEdit.tsx"));
const OrderDetails = lazy(() => import("./features/orders/OrderDetails.tsx"));
const OrderEdit = lazy(() => import("./features/orders/OrderEdit.tsx"));

const router = createBrowserRouter(
  [
    {
      path: "login",
      element: <Login />,
    },
    {
      path: "/",
      element: (
        <ProtectedRoute>
          <RootLayout />
        </ProtectedRoute>
      ),
      errorElement: <ErrorPage />,
      children: [
        {
          index: true,
          element: <Navigate to="dashboard" replace />,
        },
        {
          path: "dashboard",
          element: <Dashboard />,
        },
        {
          path: "products",
          element: <Products />,
        },
        {
          path: "products/product/edit/:productId", // <-- Dynamic route
          element: <ProductEdit />,
        },
        {
          path: "products/product/create",
          element: <ProductEdit />,
        },
        {
          path: "orders",
          element: <Orders />,
        },
        {
          path: "orders/order/edit/:orderId", // <-- Dynamic route
          element: <OrderEdit />,
        },
        {
          path: "orders/order/details/:orderId", // <-- Dynamic route
          element: <OrderDetails />,
        },
        {
          path: "users",
          element: <Users />,
        },
        {
          path: "settings",
          element: <Settings />,
        },
        {
          path: "account",
          element: <Account />,
        },
      ],
    },
  ],
  {
    future: {
      v7_relativeSplatPath: true,
    },
  }
);

const queryClient = new QueryClient();

function App() {
  return (
    <DarkModeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <Suspense fallback={<Loader />}>
          <RouterProvider
            router={router}
            future={{
              v7_startTransition: true,
            }}
          />
        </Suspense>
        <Toaster
          position="top-center"
          gutter={12}
          containerStyle={{ margin: "8px" }}
          toastOptions={{
            success: {
              duration: 3000,
            },
            error: {
              duration: 5000,
            },
            style: {
              fontSize: "14px",
              maxWidth: "500",
              padding: "14px 24px",
              backgroundColor: "var(--color-ternary)",
              color: "var(--color-primary_2)",
            },
          }}
        />
      </QueryClientProvider>
    </DarkModeProvider>
  );
}

export default App;
