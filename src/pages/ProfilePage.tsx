import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";
import api from "../lib/api";
import Card from "../components/Card";
import BidListItem from "../components/BidListItem";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import { LogOut } from "lucide-react";

interface AuctionDetail {
  id: string;
  title: string;
  currentPrice: string;
  category: string;
}

interface Bid {
  id: string;
  amount: string;
  createdAt: string;
  auction: {
    id: string;
    title: string;
    currentPrice: string;
    status: string;
  };
}

export default function ProfilePage() {
  const { user, logout } = useAuth();
  const [userAuctions, setUserAuctions] = useState<AuctionDetail[]>([]);
  const [userBids, setUserBids] = useState<Bid[]>([]);

  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate("/");
  }

  useEffect(() => {
    if (!user) return;

    const currentUser = user;

    async function fetchUserAuctions() {
      const res = await api.get(`/users/${currentUser.id}/auctions`);
      setUserAuctions(res.data.auctions);
    }

    fetchUserAuctions();
  }, [user]);

  useEffect(() => {
    if (!user) return;

    const currentUser = user;

    async function fetchUserBids() {
      const res = await api.get(`/users/${currentUser.id}/bids`);
      setUserBids(res.data.bids);
    }
    fetchUserBids();
  }, [user]);

  if (!user) {
    return <p>Loading...</p>;
  }

  return (
    <div className="min-h-scree text-neutral-950 py-12 px-6">
      <div className="container mx-auto max-w-6xl">
        <div
          className="
                bg-white
                rounded-3xl
                border
                border-neutral-200
                p-8
                mb-10
                flex
                flex-col
                md:flex-row
                md:items-center
                md:justify-between
                gap-6
            "
        >
          <div>
            <h1
              className="
                        text-4xl
                        font-black
                    "
            >
              {user.username}
            </h1>

            <p
              className="
                        text-neutral-500
                        mt-2
                    "
            >
              {user.email}
            </p>

            <div
              className="
                        flex
                        gap-4
                        mt-6
                    "
            >
              <div
                className="
                            bg-neutral-100
                            rounded-2xl
                            px-5
                            py-3
                        "
              >
                <p className="text-xs text-neutral-500">Auctions</p>

                <p className="font-bold text-xl">{userAuctions.length}</p>
              </div>

              <div
                className="
                            bg-neutral-100
                            rounded-2xl
                            px-5
                            py-3
                        "
              >
                <p className="text-xs text-neutral-500">Bids</p>

                <p className="font-bold text-xl">{userBids.length}</p>
              </div>
            </div>
          </div>

          <button
            onClick={handleLogout}
            className="
                        flex
                        items-center
                        justify-center
                        gap-2
                        bg-red-50
                        text-red-500
                        px-5
                        py-3
                        rounded-full
                        font-semibold
                        hover:bg-red-100
                        transition
                    "
          >
            Logout
            <LogOut size={18} />
          </button>
        </div>

        <section
          className="
                bg-white
                rounded-3xl
                border
                border-neutral-200
                p-8
                mb-8
            "
        >
          <div
            className="
                    flex
                    flex-col
                    sm:flex-row
                    sm:items-center
                    sm:justify-between
                    gap-4
                    mb-8
                "
          >
            <h2
              className="
                        text-2xl
                        font-black
                    "
            >
              My Auctions
            </h2>

            <Link
              to="/auctions/new"
              className="
                            bg-yellow-400
                            text-black
                            px-6
                            py-3
                            rounded-full
                            font-bold
                            hover:bg-yellow-300
                            transition
                            text-center
                        "
            >
              + Add Auction
            </Link>
          </div>

          {userAuctions.length === 0 ? (
            <div
              className="
                        bg-neutral-100
                        rounded-2xl
                        p-5
                        text-neutral-500
                    "
            >
              You haven't created any auctions yet.
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
              {userAuctions.map((auction) => (
                <Card
                  imageUrl=""
                  key={auction.id}
                  title={auction.title}
                  id={auction.id}
                  category={auction.category}
                  currentPrice={auction.currentPrice}
                />
              ))}
            </div>
          )}
        </section>

        <section
          className="
                bg-white
                rounded-3xl
                border
                border-neutral-200
                p-8
            "
        >
          <h2
            className="
                    text-2xl
                    font-black
                    mb-8
                "
          >
            My Bids
          </h2>

          {userBids.length === 0 ? (
            <div
              className="
                        bg-neutral-100
                        rounded-2xl
                        p-5
                        text-neutral-500
                    "
            >
              You haven't placed any bids yet.
            </div>
          ) : (
            <div
              className="
                        grid
                        grid-cols-1
                        md:grid-cols-2
                        gap-5
                    "
            >
              {userBids.map((bid) => (
                <BidListItem
                  key={bid.id}
                  auctionId={bid.auction.id}
                  amount={bid.amount}
                  createdAt={bid.createdAt}
                  title={bid.auction.title}
                  currentPrice={bid.auction.currentPrice}
                />
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
