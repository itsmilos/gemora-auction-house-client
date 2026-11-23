import { useState, useEffect } from "react";
import api from "../lib/api";
import Card from "./Card";
import { Link } from "react-router-dom";
import SectionBadge from "./SectionBadge";

interface Auction {
    id: string;
    title: string;
    currentPrice: string;
    category: string;
    imageUrl: string;
}

export default function FeaturedAuctions() {
    const [auctions, setAuctions] = useState<Auction[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const featuredAuctions = auctions.slice(0, 6);

    useEffect(() => {
        const fetchAuctions = async () => {
            try {
                const response = await api.get("/auctions");

                setAuctions(response.data.auctions ?? []);

            } catch (err) {
                setError("Failed to load auctions");
            } finally {
                setLoading(false);
            }
        };

        fetchAuctions();
    }, []);


    if (loading) {
        return (
            <div className="py-10 px-6 md:px-24 md:mx-20">

                <div className="flex justify-center mb-6">
                    <div className="
                        h-8
                        w-48
                        bg-neutral-200
                        rounded-full
                        animate-pulse
                    "></div>
                </div>


                <div className="
                    grid
                    grid-cols-1
                    md:grid-cols-3
                    gap-6
                ">
                    {Array.from({ length: 6 }).map((_, index) => (
                        <div
                            key={index}
                            className="
                            bg-white
                            rounded-3xl
                            border
                            border-neutral-200
                            overflow-hidden
                            "
                        >

                            <div className="
                                aspect-square
                                bg-neutral-200
                                animate-pulse
                            "></div>


                            <div className="p-5">

                                <div className="
                                    h-5
                                    bg-neutral-200
                                    rounded
                                    animate-pulse
                                "></div>


                                <div className="
                                    h-4
                                    w-24
                                    bg-neutral-200
                                    rounded
                                    mt-3
                                    animate-pulse
                                "></div>


                                <div className="
                                    h-8
                                    w-32
                                    bg-neutral-200
                                    rounded
                                    mt-5
                                    animate-pulse
                                "></div>

                            </div>

                        </div>
                    ))}
                </div>

            </div>
        );
    }




if (featuredAuctions.length === 0) {
    return (
        <div className="py-12 px-6 md:px-24 md:mx-20">

            <div className="flex justify-center items-center mb-8">
                <SectionBadge text="Featured Auctions" />
            </div>

            <div className="rounded-3xl border border-neutral-200 bg-neutral-50 px-6 py-16 md:py-20 text-center">

                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400 text-neutral-950 mb-6">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="30"
                        height="30"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.7"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                    >
                        <path d="M14.5 5.5 18.5 9.5" />
                        <path d="m11 9 4 4" />
                        <path d="m8 12 4 4" />
                        <path d="m5.5 14.5 4 4" />
                        <path d="m16 3 5 5" />
                        <path d="m3 21 8-8" />
                        <path d="M14 21h7" />
                    </svg>
                </div>

                <h3 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-950">
                    No auctions available yet
                </h3>

                <p className="mx-auto mt-4 max-w-md text-sm md:text-base leading-relaxed text-neutral-400">
                    There are currently no featured items to discover.
                    New treasures might appear soon, so stay tuned!
                </p>

               

            </div>
        </div>
    );
}



    return (
        <div className="py-10 px-6 md:px-24 md:mx-20">

            <div className="flex justify-center items-center mb-6">
                <SectionBadge text="Featured Auctions" />
            </div>


            <div className="
                grid
                grid-cols-1
                md:grid-cols-3
                gap-6
            ">
                {featuredAuctions.map((auction) => (
                    <Card
                        key={auction.id}
                        id={auction.id}
                        title={auction.title}
                        currentPrice={auction.currentPrice}
                        category={auction.category}
                        imageUrl={auction.imageUrl}
                    />
                ))}
            </div>


            <Link
                to="/auctions"
                className="
                mt-5
                flex
                justify-center
                text-neutral-400
                hover:text-yellow-400
                text-sm
                transition
                "
            >
                View all →
            </Link>

        </div>
    );
}