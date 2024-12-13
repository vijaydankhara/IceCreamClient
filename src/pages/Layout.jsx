import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Navbar from "../Components/Navbar";
import ProductCard from "../Components/ProductCard";
import ShopList from "./ShopList";
import Login from "./Login";
import AboutUs from "./AboutUsPage";
import BlogCard from "./BlogCard";
import Contact from "./Contact";
import Error404 from "./Error404";
import Home from "./Home";
import Faq2 from "./Faq2";
import SignUp from "./SignUp";
import Wishlist from "./Wishlist";
import CartPage from "./CartPage";
import DataBaseProduct from "./DataBaseProduct";
import ProtectedRoute from "./ProtectedRoute";
import UserProfile from "./UserProfile";

const PageRouter = createBrowserRouter([
  {
    path: "/",
    element: <Navbar />,
    children: [
      // Public routes
      { path: "/", element: <Home /> },
      { path: "/login", element: <Login /> },
      { path: "/signup", element: <SignUp /> },

      // Protected routes

      {
        path: "/about",
        element: <AboutUs />,
      },
      {
        path: "/blogCard",
        element: <BlogCard />,
      },
      {
        path: "/contact",
        element: <Contact />,
      },
      {
        path: "/error",
        element: <Error404 />,
      },
      {
        path: "/faq2",
        element: <Faq2 />,
      },
      {
        path: "/cart",
        element: <CartPage />,
      },
      {
        path: "/wishlist",
        element: <Wishlist />,
      },
      {
        path: "/shop",
        element: (
          <ProtectedRoute>
            <ShopList />
          </ProtectedRoute>
        ),
      },
      {
        path: "/userProfile",
        element: (
          <ProtectedRoute>
            <UserProfile />
          </ProtectedRoute>
        ),
      },

      {
        path: "/product/:productId",
        element: (
          <ProtectedRoute>
            <ProductCard />
          </ProtectedRoute>
        ),
      },
      {
        path: "/databaseproduct",
        element: (
          <ProtectedRoute>
            <DataBaseProduct />
          </ProtectedRoute>
        ),
      },
    ],
  },
]);

const Layout = () => {
  return (
    <div>
      <RouterProvider router={PageRouter}></RouterProvider>
    </div>
  );
};

export default Layout;
