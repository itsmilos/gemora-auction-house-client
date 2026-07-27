import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Search } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";

export default function Hero() {
    const [searchTerm, setSearchTerm] = useState("");
    const navigate = useNavigate();

    async function handleSearch(e: React.FormEvent) {
        e.preventDefault();
        navigate(`/auctions?search=${encodeURIComponent(searchTerm)}`)
    }

    const images = [
        "/placeholder1.webp",
        "/placeholder2.webp",
        "/placeholder3.webp"
    ]

    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrent((prev) => (prev + 1) % images.length);
        }, 3000);

        return () => clearInterval(interval);
    }, [])

    return (
        <div className="min-h-screen text-neutral-950">
            <div className="container mx-auto px-6 py-6">
                <div className="relative mt-8">
                    <form onSubmit={handleSearch}>
                        <input
                            type="text"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            placeholder="Search by title or category"
                            className="w-full h-12 rounded-full bg-neutral-100 border border-neutral-200 px-6 text-sm placeholder:text-neutral-500 focus:outline-none focus:border-yellow-400 transition-colors"
                        />
                        <button className="absolute right-5 top-1/2 -translate-y-1/2 text-neutral-400 hover:text-yellow-400 transition" type="submit">
                            <Search size={20} />
                        </button>
                    </form>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center mt-16">
                    <div>
                        <h1 className="text-5xl font-bold leading-tight">
                            Find & Bid on Rare Vintage Treasures
                        </h1>
                        <p className="text-neutral-400 mt-6 text-lg">
                            From classic cars to antique watches, discover authenticated
                            vintage items and bid in real time.
                        </p>
                        <Link
                            to="/auctions"
                            className="inline-block bg-yellow-400 text-black rounded-full px-8 py-3 font-medium mt-8 hover:bg-yellow-300 transition-colors"
                        >
                            Browse Auctions
                        </Link>
                    </div>

                    <div className="relative">
                        <div className="bg-neutral-900 rounded-2xl w-full aspect-square overflow-hidden relative">
                            <AnimatePresence mode="wait">
                                <motion.img
                                    key={images[current]}
                                    src={images[current]}
                                    className="absolute inset-0 w-full h-full object-cover rounded-xl"
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.7 }}
                                />
                            </AnimatePresence>
                        </div>
                    </div>
                </div>

                <div className="flex gap-2 justify-center mt-8">
                    {images.map((image, index) => (
                        <span key={index} className={index === current ? "w-2 h-2 rounded-full bg-yellow-400" : "w-2 h-2 rounded-full bg-neutral-700"}></span>
                    ))}
                </div>
            </div>
        </div>
    );
}