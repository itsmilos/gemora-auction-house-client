import { Gem } from "lucide-react";
import { Link } from "react-router-dom";

export default function Footer() {
    return (
        <footer className="bg-white text-neutral-900">
            <section className="mx-auto max-w-7xl px-6 pt-20">
                <div className="border border-neutral-200 rounded-none p-10 md:p-14 flex flex-col md:flex-row items-center justify-between gap-8">

                    <h2 className="text-4xl md:text-6xl font-black tracking-tight leading-none">
                        Start bidding
                        <br />
                        with <span className="text-yellow-400 flex flex-row"><Gem size={60} />GEMORA</span>
                    </h2>

                    <Link to="/auctions/new" className="flex items-center gap-3 bg-yellow-400 hover:bg-yellow-300 transition px-7 py-3 rounded-full font-semibold">
                        <span>→</span>
                        Create Auction
                    </Link>

                </div>
            </section>

            <div className="mx-auto max-w-7xl px-6 mt-8">
                <div className="border border-neutral-200 p-10 md:p-14 overflow-hidden relative">


                    <div className="grid grid-cols-2 md:grid-cols-4 gap-10 relative z-10">

                        <div>
                            <h3 className="text-sm uppercase tracking-widest text-yellow-400 mb-6">
                                Marketplace
                            </h3>

                            <ul className="flex flex-col gap-3 text-neutral-600">
                                <Link to="/auctions" className="hover:text-yellow-400 transition cursor-pointer">
                                    Browse Auctions
                                </Link>

                                <Link to="/auctions/new" className="hover:text-yellow-400 transition cursor-pointer">
                                    Sell Item
                                </Link>
                            </ul>
                        </div>


                        <div>
                            <h3 className="text-sm uppercase tracking-widest text-yellow-400 mb-6">
                                Legal
                            </h3>

                            <ul className="space-y-4 text-neutral-600">
                                <li className="hover:text-yellow-400 transition cursor-pointer">
                                    Terms & Conditions
                                </li>
                                <li className="hover:text-yellow-400 transition cursor-pointer">
                                    Privacy Policy
                                </li>
                            </ul>
                        </div>


                        <div>
                            <h3 className="text-sm uppercase tracking-widest text-yellow-400 mb-6">
                                Company
                            </h3>

                            <ul className="flex flex-col gap-3 text-neutral-600">
                                <Link to="/about" className="hover:text-yellow-400 transition cursor-pointer">
                                    About
                                </Link>
                                <Link to="/contact" className="hover:text-yellow-400 transition cursor-pointer">
                                    Contact
                                </Link>
                            </ul>
                        </div>


                        <div>
                            <h3 className="text-sm uppercase tracking-widest text-yellow-400 mb-6">
                                Contact
                            </h3>

                            <ul className="space-y-4 text-neutral-600">
                                <li className="hover:text-yellow-400 transition cursor-pointer">
                                    Support
                                </li>
                                <li className="hover:text-yellow-400 transition cursor-pointer">
                                    Email
                                </li>
                                <li className="hover:text-yellow-400 transition cursor-pointer">
                                    LinkedIn
                                </li>
                                <li className="hover:text-yellow-400 transition cursor-pointer">
                                    X / Twitter
                                </li>
                            </ul>
                        </div>

                    </div>


                    <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 text-[180px] md:text-[260px] font-black text-neutral-100 select-none pointer-events-none">
                        <Gem />GEMORA
                    </div>

                </div>
            </div>


            <div className="mx-auto max-w-7xl px-6">
                <div className="border-t border-neutral-200 mt-8 py-8 flex flex-col md:flex-row justify-between gap-5 text-sm text-neutral-500">

                    <p>
                        © Copyright Gemora 2026
                    </p>

                    <div className="flex gap-8">
                        <span className="hover:text-yellow-400 cursor-pointer transition">
                            Privacy Policy
                        </span>

                        <span className="hover:text-yellow-400 cursor-pointer transition">
                            Terms of Use
                        </span>
                    </div>

                </div>
            </div>

        </footer>
    );
}