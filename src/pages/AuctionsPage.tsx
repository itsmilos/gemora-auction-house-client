import { useState, useEffect } from "react";
import api from "../lib/api";
import Card from "../components/Card";
import { useSearchParams } from "react-router-dom";
import SectionBadge from "../components/SectionBadge";

interface Auction {
  id: string;
  title: string;
  currentPrice: string;
  category: string;
  imageUrl: string;
}

export default function AuctionsPage() {
  const [searchParams] = useSearchParams();

  const [auctions, setAuctions] = useState<Auction[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [category, setCategory] = useState("");
  const [lowestPrice, setLowestPrice] = useState("");
  const [highestPrice, setHighestPrice] = useState("");
  const [sortby, setSortby] = useState("");
  const [search] = useState(searchParams.get("search") || "");

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const response = await api.get("/auctions", {
          params: {
            category:
              category === "ALL" || category === "" ? undefined : category,
            minPrice: lowestPrice || undefined,
            maxPrice: highestPrice || undefined,
            sortby: sortby || undefined,
            search,
          },
        });
        setAuctions(response.data.auctions);
      } catch (err) {
        setError("Failed to load auctions");
      } finally {
        setLoading(false);
      }
    };

    fetchAuctions();
  }, [category, lowestPrice, highestPrice, sortby, search]);

  function handleReset() {
    setCategory("");
    setLowestPrice("");
    setHighestPrice("");
    setSortby("");
  }

  if (loading) {
    return (
      <div className="min-h-screen py-10">
        <div className="container mx-auto px-6">
          <div className="mb-10">
            <div
              className="
                        h-8
                        w-48
                        bg-neutral-200
                        rounded-lg
                        animate-pulse
                    "
            ></div>

            <div
              className="
                        h-4
                        w-72
                        bg-neutral-200
                        rounded
                        mt-3
                        animate-pulse
                    "
            ></div>
          </div>

          <div
            className="
                    grid
                    grid-cols-1
                    lg:grid-cols-[280px_1fr]
                    gap-8
                "
          >
            <div
              className="
                        bg-white
                        rounded-3xl
                        border
                        border-neutral-200
                        p-6
                        h-[420px]
                        animate-pulse
                    "
            >
              <div
                className="
                            h-6
                            w-24
                            bg-neutral-200
                            rounded
                            mb-8
                        "
              ></div>

              <div className="space-y-6">
                <div className="h-12 bg-neutral-200 rounded-xl"></div>

                <div
                  className="
                                grid
                                grid-cols-2
                                gap-3
                            "
                >
                  <div className="h-12 bg-neutral-200 rounded-xl"></div>
                  <div className="h-12 bg-neutral-200 rounded-xl"></div>
                </div>

                <div className="h-12 bg-neutral-200 rounded-xl"></div>
              </div>
            </div>

            <div
              className="
                        grid
                        grid-cols-1
                        sm:grid-cols-2
                        xl:grid-cols-3
                        gap-6
                    "
            >
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
                  <div
                    className="
                                    aspect-square
                                    bg-neutral-200
                                    animate-pulse
                                "
                  ></div>

                  <div className="p-5">
                    <div
                      className="
                                        h-5
                                        bg-neutral-200
                                        rounded
                                        animate-pulse
                                    "
                    ></div>

                    <div
                      className="
                                        h-4
                                        w-24
                                        bg-neutral-200
                                        rounded
                                        mt-3
                                        animate-pulse
                                    "
                    ></div>

                    <div
                      className="
                                        h-8
                                        w-32
                                        bg-neutral-200
                                        rounded
                                        mt-5
                                        animate-pulse
                                    "
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  
if (error) {
    return (
        <div className="min-h-screen flex items-center justify-center px-6 py-16">
            <div className="w-full max-w-lg rounded-3xl border border-neutral-200 bg-neutral-50 px-6 py-14 text-center">

                <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-yellow-400 text-neutral-950">
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
                        <path d="M12 9v4" />
                        <path d="M12 17h.01" />
                        <path d="M10.3 3.9 2.6 17.2A2 2 0 0 0 4.3 20h15.4a2 2 0 0 0 1.7-2.8L13.7 3.9a2 2 0 0 0-3.4 0Z" />
                    </svg>
                </div>

                <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-neutral-950">
                    Something went wrong
                </h2>

                <p className="mt-4 text-sm md:text-base leading-relaxed text-neutral-400">
                    We couldn't load the auctions right now.
                    Please try again in a moment.
                </p>

                <button
                    onClick={() => window.location.reload()}
                    className="mt-8 inline-flex items-center gap-2 rounded-full bg-yellow-400 px-8 py-3 font-medium text-black transition-colors hover:bg-yellow-300"
                >
                    Try again
                    <span>→</span>
                </button>

            </div>
        </div>
    );
}


  return (
    <div className="min-h-screen py-10">
      <div className="container mx-auto px-6">
        <div className="mb-10">
          <SectionBadge text="Explore Auctions" />
          <p className="mt-2 text-neutral-500">
            Discover unique items and place your bids.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-8">
          <aside className="lg:sticky lg:top-24 h-fit">
            <div className="bg-white rounded-3xl border border-neutral-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-bold">Filters</h2>

                <button
                  onClick={handleReset}
                  className="text-sm text-red-500 hover:text-red-600 transition"
                >
                  Reset
                </button>
              </div>

              <div className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-sm">Category</label>

                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="
                                        h-12
                                        rounded-xl
                                        border
                                        border-neutral-200
                                        bg-neutral-50
                                        px-4
                                        text-sm
                                        outline-none
                                        focus:border-yellow-400
                                    "
                  >
                    <option value="">All</option>
                    <option value="VEHICLES">Vehicles</option>
                    <option value="WATCHES">Watches</option>
                    <option value="ART">Art</option>
                    <option value="FURNITURE">Furniture</option>
                    <option value="BOOKS">Books</option>
                    <option value="CAMERAS">Cameras</option>
                    <option value="JEWELRY">Jewelry</option>
                    <option value="MUSIC_INSTRUMENTS">Music Instruments</option>
                  </select>
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div className="flex flex-col gap-2">
                    <label className="font-semibold text-sm">Min price</label>

                    <input
                      type="number"
                      value={lowestPrice}
                      onChange={(e) => setLowestPrice(e.target.value)}
                      className="
                                            h-12
                                            rounded-xl
                                            border
                                            border-neutral-200
                                            bg-neutral-50
                                            px-4
                                            outline-none
                                            focus:border-yellow-400
                                        "
                    />
                  </div>

                  <div className="flex flex-col gap-2">
                    <label className="font-semibold text-sm">Max price</label>

                    <input
                      type="number"
                      value={highestPrice}
                      onChange={(e) => setHighestPrice(e.target.value)}
                      className="
                                            h-12
                                            rounded-xl
                                            border
                                            border-neutral-200
                                            bg-neutral-50
                                            px-4
                                            outline-none
                                            focus:border-yellow-400
                                        "
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-2">
                  <label className="font-semibold text-sm">Sort by</label>

                  <select
                    value={sortby}
                    onChange={(e) => setSortby(e.target.value)}
                    className="
                                        h-12
                                        rounded-xl
                                        border
                                        border-neutral-200
                                        bg-neutral-50
                                        px-4
                                        text-sm
                                        outline-none
                                        focus:border-yellow-400
                                    "
                  >
                    <option value="">Newest first</option>

                    <option value="price_asc">Price low to high</option>

                    <option value="price_desc">Price high to low</option>
                  </select>
                </div>
              </div>
            </div>
          </aside>

          <div>
            {auctions.length === 0 ? (
              <div
                className="
                            bg-white
                            rounded-3xl
                            border
                            border-neutral-200
                            p-10
                            text-center
                        "
              >
                <h2 className="text-2xl font-bold">No auctions found</h2>

                <p className="text-neutral-500 mt-2">
                  Try changing your filters.
                </p>
              </div>
            ) : (
              <div
                className="
                            grid
                            grid-cols-1
                            sm:grid-cols-2
                            xl:grid-cols-3
                            gap-6
                        "
              >
                {auctions.map((auction) => (
                  <Card
                    imageUrl={auction.imageUrl}
                    key={auction.id}
                    id={auction.id}
                    title={auction.title}
                    currentPrice={auction.currentPrice}
                    category={auction.category}
                  />
                ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
