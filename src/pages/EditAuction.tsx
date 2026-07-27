import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import api from "../lib/api";
import { Link } from "react-router-dom";
import ImageUpload from "../components/ImageUpload";

export default function EditAuction() {
    const [title, setTitle] = useState("");
    const [price, setPrice] = useState("");
    const [imageUrl, setImageUrl] = useState("");
    const [description, setDescription] = useState("");
    const [category, setCategory] = useState("");
    const [endsAt, setEndsAt] = useState("");
    const [error, setError] = useState('');
    const [loading, setIsLoading] = useState(false);

    const navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        async function fetchAuction() {
            const res = await api.get(`/auctions/${id}`);
            const data = res.data;
            setTitle(data.auction.title);
            setPrice(data.auction.currentPrice);
            setImageUrl(data.auction.imageUrl);
            setDescription(data.auction.description);
            setCategory(data.auction.category);
            setEndsAt(new Date(data.auction.endsAt).toISOString().slice(0, 16));
        }
        fetchAuction();
    }, [id])

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");
        setIsLoading(true);

        try {
            await api.put(`/auctions/${id}`, { title, startPrice: Number(price), imageUrl, description, category, endsAt: new Date(endsAt).toISOString() });

            navigate(`/auctions/${id}`);
        } catch (error) {
            if (axios.isAxiosError(error) && error.response) {
                setError(error.response.data.message || "Creating failed, please try again later.");
            } else {
                setError("Something went wrong. Please try again.");
            }
        } finally {
            setIsLoading(false);
        }
    }

    return (
        <section className="mt-10">
            <h1 className="font-bold text-3xl text-center">Edit Auction</h1>

            <form
                onSubmit={handleSubmit}
                className="flex flex-col items-center mt-8"
            >
                {error && (
                    <p className="text-red-500 bg-red-50 p-3 rounded-2xl mb-5 text-center text-sm w-[580px]">
                        {error}
                    </p>
                )}

                <div className="flex gap-5">
                    <div className="flex flex-col gap-1">
                        <label htmlFor="title">Title</label>
                        <input
                            id="title"
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            className="border border-neutral-200 bg-neutral-100/50 rounded-2xl h-10 w-[280px] p-2"
                            required
                        />
                    </div>

                    <div className="flex flex-col gap-1">
                        <label htmlFor="price">Start Price</label>
                        <input
                            id="price"
                            type="number"
                            value={price}
                            onChange={(e) => setPrice(e.target.value)}
                            className="border border-neutral-200 bg-neutral-100/50 rounded-2xl h-10 w-[280px] p-2"
                            required
                        />
                    </div>
                </div>

                <div className="mt-5 flex flex-col gap-3 w-[580px]">

                    <label>
                        Image
                    </label>

                    <ImageUpload
                        onUpload={(url) => setImageUrl(url)}
                    />

                    {imageUrl && (
                        <img
                            src={imageUrl}
                            alt="auction"
                            className="
                w-40
                h-40
                rounded-2xl
                object-cover
            "
                        />
                    )}

                </div>

                <div className="mt-5 flex flex-col gap-1 w-[580px]">
                    <label htmlFor="description">Description</label>
                    <textarea
                        id="description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="border border-neutral-200 bg-neutral-100/50 rounded-2xl h-52 w-full p-2"
                        required
                    />
                </div>

                <div className="mt-5 flex flex-col gap-1 w-[580px]">
                    <label htmlFor="category">Category</label>
                    <select
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        className="h-10 rounded-full border border-neutral-200 bg-neutral-100/50 px-5 text-sm focus:outline-none focus:border-yellow-400"
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

                <div className="mt-5 flex flex-col gap-1 w-[580px]">
                    <label htmlFor="endsAt">Ends Date</label>
                    <input
                        className="border border-neutral-200 bg-neutral-100/50 rounded-2xl h-10 w-full p-2"
                        id="endsAt"
                        type="datetime-local"
                        value={endsAt}
                        onChange={(e) => setEndsAt(e.target.value)}
                        required
                    />
                </div>

                <button
                    type="submit"
                    disabled={loading}
                    className="bg-yellow-400 text-black rounded-full px-5 py-2 font-medium hover:bg-yellow-300 w-[580px] transition-colors mt-8 disabled:opacity-50"
                >
                    {loading ? "Editing..." : "Edit Auction"}
                </button>
                <Link
                    to={`/auctions/${id}`}
                    className="text-center bg-neutral-100 text-black rounded-full px-5 py-2 font-medium hover:bg-red-100/50 w-[580px] border border-neutral-200 transition-colors mt-8 disabled:opacity-50"
                >
                    Cancel
                </Link>
            </form>
        </section>
    );
}
