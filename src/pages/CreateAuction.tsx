import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import api from "../lib/api";
import ImageUpload from "../components/ImageUpload";

export default function CreateAuction() {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [description, setDescription] = useState("");
  const [category, setCategory] = useState("");
  const [endsAt, setEndsAt] = useState("");
  const [error, setError] = useState("");
  const [loading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    try {
      await api.post("/auctions", {
        title,
        startPrice: Number(price),
        imageUrl,
        description,
        category,
        endsAt: new Date(endsAt).toISOString(),
      });

      navigate("/auctions");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        setError(
          error.response.data.message ||
            "Creating failed, please try again later.",
        );
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <section className="relative overflow-hidden py-12 sm:py-20 px-4">
      <img
        src="/Car2.svg"
        alt="Car illustration"
        className="
        hidden lg:block
        absolute
        -left-56
        top-1/2
        -translate-y-1/2
        w-[550px]
        opacity-60
        pointer-events-none
    "
      />

      <img
        src="/Car2.svg"
        alt="Car illustration"
        className="
        hidden lg:block
        absolute
        -right-56
        top-1/2
        -translate-y-1/2
        w-[550px]
        scale-x-[-1]
        opacity-60
        pointer-events-none
    "
      />

      <div className="relative z-10 max-w-xl w-full mx-auto">
        <img
          src="/Car2.svg"
          alt="Car illustration"
          className="
            block
            lg:hidden
            w-[220px]
            mx-auto
            mb-5
            opacity-70
            pointer-events-none
        "
        />
        <h1 className="text-3xl sm:text-4xl font-bold">Create Auction</h1>

        <p className="text-neutral-500 mt-2 mb-8 text-sm sm:text-base">
          Fill out the details below to list your item for bidding.
        </p>

        <form onSubmit={handleSubmit} className="flex flex-col w-full">
          {error && (
            <p className="text-red-500 bg-red-50 p-3 rounded-2xl mb-5 text-center text-sm w-full">
              {error}
            </p>
          )}

          <div className="flex flex-col sm:flex-row gap-5">
            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="title">Title</label>

              <input
                id="title"
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className="border border-neutral-200 bg-neutral-100/50 rounded-2xl h-11 w-full p-3"
                required
              />
            </div>

            <div className="flex flex-col gap-1 w-full">
              <label htmlFor="price">Start Price</label>

              <input
                id="price"
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="border border-neutral-200 bg-neutral-100/50 rounded-2xl h-11 w-full p-3"
                required
              />
            </div>
          </div>

          <div className="mt-5 flex flex-col gap-1 w-full">
            <ImageUpload onUpload={(url) => setImageUrl(url)} />
          </div>

          <div className="mt-5 flex flex-col gap-1 w-full">
            <label htmlFor="description">Description</label>

            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="border border-neutral-200 bg-neutral-100/50 rounded-2xl h-48 sm:h-52 w-full p-3 resize-none"
              required
            />
          </div>

          <div className="mt-5 flex flex-col gap-1 w-full">
            <label htmlFor="category">Category</label>

            <select
              id="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="h-11 rounded-2xl border border-neutral-200 bg-neutral-100/50 px-4 text-sm focus:outline-none focus:border-yellow-400"
              required
            >
              <option value="">Select category</option>

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

          <div className="mt-5 flex flex-col gap-1 w-full">
            <label htmlFor="endsAt">Ends Date</label>

            <input
              id="endsAt"
              type="datetime-local"
              value={endsAt}
              onChange={(e) => setEndsAt(e.target.value)}
              className="border border-neutral-200 bg-neutral-100/50 rounded-2xl h-11 w-full p-3"
              required
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="bg-yellow-400 text-black rounded-full px-5 py-3 font-medium hover:bg-yellow-300 w-full transition-colors mt-8 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Add Auction"}
          </button>
        </form>
      </div>
    </section>
  );
}
