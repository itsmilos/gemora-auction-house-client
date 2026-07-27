import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Footer from "./Footer";
import ScrollToHash from "./ScrollToHash";
import ScrollToTop from "./ScrollToTop";

export default function Layout() {
    return (
        <div className="min-h-screen p-5">
            <Navbar />

            <main className="mt-20">
                <ScrollToTop />
                <ScrollToHash />
                <Outlet />
            </main>

            <Footer />
        </div>
    );
}