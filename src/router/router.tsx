import { createBrowserRouter } from "react-router-dom";


import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import CreateAuction from "../pages/CreateAuction";
import AuctionDetails from "../pages/AuctionDetails";
import NotFound from "../pages/NotFound";
import AuctionsPage from "../pages/AuctionsPage";
import Layout from "../components/Layout";
import ProtectedRoute from "../pages/ProtectedRoute";
import ProfilePage from "../pages/ProfilePage";
import EditAuction from "../pages/EditAuction";
import About from "../pages/About";
import Contact from "../pages/Contact";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Layout />,
        children: [
            {
                index: true,
                element: <Home />,
            },
            {
                path: "register",
                element: <Register />,
            },
            {
                path: "login",
                element: <Login />,
            },
            {
                path: "auctions",
                element: <AuctionsPage />
            },
            {
                path: "auctions/new",
                element:
                    <ProtectedRoute>
                        <CreateAuction />
                    </ProtectedRoute>
                ,
            },
            {
                path: "auctions/:id",
                element: <AuctionDetails />,
            },
            {
                path: "auctions/:id/edit",
                element:
                    <ProtectedRoute>
                        <EditAuction />
                    </ProtectedRoute>
                ,
            },
            {
                path: "/profile",
                element: <ProfilePage />
            },
            {
                path: '/contact',
                element: <Contact />
            },
            {
                path: "/about",
                element: <About />
            },
            {
                path: "*",
                element: <NotFound />,
            },
        ],
    },
]);