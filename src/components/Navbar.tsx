import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";
import { Menu, User, X, Gem } from "lucide-react";

export default function Navbar() {
    const { user } = useAuth();
    const [menuOpen, setMenuOpen] = useState(false);

    const closeMenu = () => setMenuOpen(false);

    return (
        <>

            <nav className="fixed top-0 left-0 w-full z-50 bg-white border-b border-neutral-200">
                <div className="container mx-auto h-16 px-6 flex items-center justify-between">

                    <Link
                        className="text-xl font-bold flex items-center text-yellow-500"
                        to="/"
                    >
                        <Gem />GEMORA
                    </Link>


                    <div className="hidden md:flex items-center gap-8">
                        <Link
                            className="text-neutral-600 hover:text-yellow-500 transition-colors"
                            to="/auctions"
                        >
                            Auctions
                        </Link>


                        <Link
                            className="text-neutral-600 hover:text-yellow-500 transition-colors"
                            to="/about"
                        >
                            About
                        </Link>


                        <Link
                            className="text-neutral-600 hover:text-yellow-500 transition-colors"
                            to="/#faq"
                        >
                            FAQ
                        </Link>
                    </div>


                    <div className="hidden md:flex items-center gap-3">
                        {user ? (
                            <Link to="/profile">
                                <User className="w-5 h-5 hover:text-yellow-500 transition-colors" />
                            </Link>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    className="px-5 py-2 rounded-full bg-neutral-950 text-white hover:bg-neutral-800 transition"
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/register"
                                    className="px-5 py-2 rounded-full bg-yellow-400 hover:bg-yellow-300 transition font-medium"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>


                    <button
                        onClick={() => setMenuOpen(true)}
                        className="md:hidden"
                    >
                        <Menu size={28} />
                    </button>
                </div>
            </nav>

            {menuOpen && (
                <div
                    onClick={closeMenu}
                    className="fixed inset-0 bg-black/50 z-40"
                />
            )}


            <aside
                className={`fixed top-0 left-0 h-screen w-72 bg-white text-neutral-950 border-r border-neutral-200 z-50 transform transition-transform duration-300 ${menuOpen
                    ? "translate-x-0"
                    : "-translate-x-full"
                    }`}
            >

                <div className="flex items-center justify-between h-16 px-6 border-b border-neutral-200">
                    <Link
                        to="/"
                        onClick={closeMenu}
                        className="font-bold text-lg"
                    >
                        AUCTIONHOUSE
                    </Link>

                    <button onClick={closeMenu}>
                        <X className="text-white" />
                    </button>
                </div>


                <div className="flex flex-col p-6 gap-5">

                    <Link
                        to="/auctions"
                        onClick={closeMenu}
                        className="hover:text-yellow-400 transition-colors"
                    >
                        Auctions
                    </Link>


                    <Link
                        to="/about"
                        onClick={closeMenu}
                        className="hover:text-yellow-400 transition-colors"
                    >
                        About
                    </Link>

                    <Link
                        to="/#faq"
                        onClick={closeMenu}
                        className="hover:text-yellow-400 transition-colors"
                    >
                        Faq
                    </Link>

                    <div className="border-t border-neutral-200 pt-6 flex flex-col gap-4">

                        {user ? (
                            <Link
                                to="/profile"
                                onClick={closeMenu}
                                className="flex items-center gap-2 hover:text-yellow-400 transition-colors"
                            >
                                <User size={18} />
                                Profile
                            </Link>
                        ) : (
                            <>
                                <Link
                                    to="/login"
                                    onClick={closeMenu}
                                    className="bg-neutral-800 hover:bg-neutral-700 text-white rounded-xl py-3 text-center transition"
                                >
                                    Login
                                </Link>

                                <Link
                                    to="/register"
                                    onClick={closeMenu}
                                    className="bg-yellow-400 text-black hover:bg-yellow-300 rounded-xl py-3 text-center font-medium transition"
                                >
                                    Register
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            </aside>
        </>
    );
}