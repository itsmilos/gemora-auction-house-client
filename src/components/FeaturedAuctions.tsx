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


    if (error) {
        return (
            <div className="
                py-10
                text-center
                text-red-500
            ">
                {error}
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