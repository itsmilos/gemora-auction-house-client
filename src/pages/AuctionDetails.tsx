import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import api from "../lib/api";
import { useAuth } from "../context/AuthContext";
import BidModal from "../components/BidModal";
import Countdown from "../components/Countdown";
import socket from "../socket/socket";
import { Link } from "react-router-dom";
import DeleteConfirmModal from "../components/DeleteConfirmModal";

interface Bid {
  id: string;
  amount: string;
  createdAt: string;
  bidderId: string;
}

interface AuctionDetail {
  id: string;
  title: string;
  description: string;
  currentPrice: string;
  startPrice: string;
  category: string;
  status: string;
  endsAt: string;
  imageUrl: string;
  seller: {
    username: string;
    id: string;
  };
  bids: Bid[];
}

export default function AuctionDetails() {
  const [auction, setAuction] = useState<AuctionDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { id } = useParams();
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();
  const [isBidModalOpen, setIsBidModalOpen] = useState(false);
  const [lastBid, setLastBid] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const isOwner = user && auction && user.id === auction.seller.id;
  const hasBids = auction && auction.bids.length > 0;

  useEffect(() => {
    if (!id) return;

    socket.emit("join-auction", id);

    socket.on("new-bid", (data) => {
      console.log("New bid received:", data);

      setAuction((prev) => {
        if (!prev) return prev;

        return {
          ...prev,
          currentPrice: data.currentPrice.toString(),
          bids: [data.bid, ...prev.bids],
        };
      });

      setLastBid(true);

      setTimeout(() => {
        setLastBid(false);
      }, 1000);
    });

    return () => {
      socket.emit("leave-auction", id);
      socket.off("new-bid");
    };
  }, [id]);

  const fetchAuction = async () => {
    try {
      const response = await api.get(`/auctions/${id}`);
      setAuction(response.data.auction);
    } catch (err) {
      setError("Failed to load auctions");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAuction();
  }, [id]);

  function closeBidModal() {
    setIsBidModalOpen(false);
  }

  async function handleBid() {
    if (!isAuthenticated) {
      navigate("/login");
    } else {
      setIsBidModalOpen(true);
    }
  }

  function closeDeleteModal() {
    setIsDeleteModalOpen(false);
  }

  async function handleDelete() {
    if (hasBids) {
      setError("You cannot delete auction that already has bids.");
    } else {
      setIsDeleteModalOpen(true);
    }
  }

  if (loading) {
    return (
      <section className="min-h-screen text-neutral-950 py-16 px-6">
        <div className="container mx-auto max-w-6xl">
          <div
            className="
                    grid 
                    grid-cols-1 
                    lg:grid-cols-2 
                    gap-10
                    items-start
                "
          >
            <div
              className="
                        aspect-square
                        rounded-3xl
                        bg-neutral-200
                        animate-pulse
                    "
            ></div>

            <div
              className="
                        bg-white
                        rounded-3xl
                        border
                        border-neutral-200
                        p-8
                    "
            >
              <div
                className="
                            h-4
                            w-20
                            bg-neutral-200
                            rounded
                            animate-pulse
                        "
              ></div>

              <div
                className="
                            h-12
                            w-3/4
                            bg-neutral-200
                            rounded-xl
                            mt-4
                            animate-pulse
                        "
              ></div>

              <div
                className="
                            space-y-3
                            mt-6
                        "
              >
                <div className="h-4 bg-neutral-200 rounded animate-pulse"></div>
                <div className="h-4 bg-neutral-200 rounded animate-pulse"></div>
                <div className="h-4 bg-neutral-200 rounded w-2/3 animate-pulse"></div>
              </div>

              <div
                className="
                            bg-neutral-100
                            rounded-2xl
                            p-5
                            mt-8
                        "
              >
                <div
                  className="
                                h-3
                                w-32
                                bg-neutral-200
                                rounded
                                animate-pulse
                            "
                ></div>

                <div
                  className="
                                h-10
                                w-48
                                bg-neutral-200
                                rounded-lg
                                mt-3
                                animate-pulse
                            "
                ></div>
              </div>

              <div
                className="
                            flex
                            justify-between
                            mt-8
                            border-b
                            pb-6
                        "
              >
                <div>
                  <div
                    className="
                                    h-3
                                    w-24
                                    bg-neutral-200
                                    rounded
                                    animate-pulse
                                "
                  ></div>

                  <div
                    className="
                                    h-12
                                    w-32
                                    bg-neutral-200
                                    rounded-lg
                                    mt-3
                                    animate-pulse
                                "
                  ></div>
                </div>

                <div>
                  <div
                    className="
                                    h-3
                                    w-20
                                    bg-neutral-200
                                    rounded
                                    animate-pulse
                                "
                  ></div>

                  <div
                    className="
                                    h-5
                                    w-28
                                    bg-neutral-200
                                    rounded
                                    mt-3
                                    animate-pulse
                                "
                  ></div>
                </div>
              </div>

              <div
                className="
                            h-12
                            w-full
                            bg-neutral-200
                            rounded-full
                            mt-8
                            animate-pulse
                        "
              ></div>
            </div>
          </div>
        </div>
      </section>
    );
  }
  if (error) return <p>{error}</p>;
  if (!auction) return <p>Auction not found.</p>;

  return (
    <section className="min-h-screen text-neutral-950 py-16 px-6">
      {isBidModalOpen && (
        <BidModal
          onClose={closeBidModal}
          onSuccess={() => {
            fetchAuction();
            closeBidModal();
          }}
          id={auction.id}
          currentBid={auction.currentPrice}
        />
      )}

      {isDeleteModalOpen && (
        <DeleteConfirmModal
          onClose={closeDeleteModal}
          onSuccess={() => {
            closeDeleteModal();
            navigate("/profile");
          }}
          id={auction.id}
        />
      )}

      <div className="container mx-auto max-w-6xl">
        <div
          className="
                grid 
                grid-cols-1 
                lg:grid-cols-2 
                gap-10
                items-start
            "
        >
          <div
            className="
    aspect-square
    rounded-3xl
    bg-neutral-900
    overflow-hidden
    relative
"
          >
            <img
              src={auction.imageUrl}
              alt={auction.title}
              className="
            w-full
            h-full
            object-cover
        "
            />

            <div
              className="
        absolute
        top-5
        left-5
        bg-black/50
        backdrop-blur-sm
        text-white
        px-4
        py-2
        rounded-full
        text-sm
    "
            >
              {auction.category}
            </div>
          </div>

          <div
            className="
                    bg-white
                    rounded-3xl
                    border
                    border-neutral-200
                    p-8
                "
          >
            <div className="mb-6">
              <p className="text-neutral-500 text-sm">Auction</p>

              <h1
                className="
                            text-4xl
                            font-black
                            mt-2
                            leading-tight
                        "
              >
                {auction.title}
              </h1>

              <p
                className="
                            text-neutral-500
                            mt-4
                            leading-relaxed
                        "
              >
                {auction.description}
              </p>
            </div>

            <div
              className="
                        bg-neutral-100
                        rounded-2xl
                        p-5
                        mb-6
                    "
            >
              <p className="text-xs text-neutral-500 mb-2">AUCTION ENDING IN</p>

              <Countdown endsAt={auction.endsAt} />
            </div>

            <div
              className="
                        flex
                        justify-between
                        items-center
                        border-b
                        border-neutral-200
                        pb-6
                    "
            >
              <div>
                <p className="text-sm text-neutral-500">Current bid</p>

                <p
                  className={`
                                    text-4xl
                                    font-black
                                    font-mono
                                    text-yellow-500
                                    transition
                                    ${lastBid ? "scale-110" : ""}
                                `}
                >
                  ${auction.currentPrice}
                </p>
              </div>

              <div className="text-right">
                <p className="text-sm text-neutral-500">Seller</p>

                <p className="font-semibold">{auction.seller.username}</p>
              </div>
            </div>

            <div className="mt-8">
              <h2
                className="
                            font-bold
                            text-xl
                            mb-4
                        "
              >
                Bid History
              </h2>

              {auction.bids.length === 0 ? (
                <div
                  className="
                                bg-neutral-100
                                rounded-xl
                                p-4
                                text-neutral-500
                                text-sm
                            "
                >
                  No bids yet.
                </div>
              ) : (
                <div
                  className="
                                bg-neutral-100
                                rounded-2xl
                                p-4
                                space-y-3
                            "
                >
                  {auction.bids.map((bid) => (
                    <div
                      key={bid.id}
                      className="
                                            flex
                                            justify-between
                                            text-sm
                                            border-b
                                            border-neutral-200
                                            pb-3
                                            last:border-none
                                            last:pb-0
                                        "
                    >
                      <span
                        className="
                                            font-mono
                                            font-bold
                                        "
                      >
                        ${bid.amount}
                      </span>

                      <span className="text-neutral-500">
                        {new Date(bid.createdAt).toLocaleString()}
                      </span>
                    </div>
                  ))}
                </div>
              )}

              <button
                onClick={handleBid}
                className="
                                mt-8
                                w-full
                                bg-yellow-400
                                text-black
                                rounded-full
                                py-3
                                font-bold
                                hover:bg-yellow-300
                                transition
                            "
              >
                Place Bid
              </button>
            </div>

            {isOwner && !hasBids && (
              <div
                className="
                            flex
                            gap-3
                            mt-4
                        "
              >
                <Link
                  to={`/auctions/${auction.id}/edit`}
                  className="
                                    flex-1
                                    text-center
                                    bg-neutral-900
                                    text-white
                                    rounded-full
                                    py-3
                                    font-semibold
                                "
                >
                  Edit
                </Link>

                <button
                  onClick={handleDelete}
                  className="
                                    flex-1
                                    bg-red-500
                                    text-white
                                    rounded-full
                                    py-3
                                    font-semibold
                                "
                >
                  Delete
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
