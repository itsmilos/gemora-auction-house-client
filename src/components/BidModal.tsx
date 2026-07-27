import { useState } from "react";
import api from "../lib/api";
import axios from "axios";

interface BidModalProps {
    id: string;
    onSuccess: () => void;
    onClose: () => void;
    currentBid: string;
}

export default function BidModal({ id, onSuccess, onClose, currentBid }: BidModalProps) {
    const [bid, setBid] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function addBid(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await api.post(`/auctions/${id}/bids`, { amount: Number(bid) });
            setBid("");
            onSuccess();
        } catch (error) {
            if (axios.isAxiosError(error)) {
                setError(error.response?.data?.message || "Something went wrong");
            } else {
                setError("Something went wrong");
            }
        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm px-4">
            <div className="w-full max-w-md rounded-3xl bg-white p-6 sm:p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-neutral-950">Place a Bid</h2>
                    <button type="button" onClick={onClose} className="text-neutral-200 hover:text-red-300 transition text-lg">✕</button>
                </div>

                <div className="mb-6">
                    <p className="text-sm text-neutral-400">Current bid</p>
                    <p className="font-mono text-3xl font-semibold text-neutral-950">${currentBid}</p>
                </div>

                <form onSubmit={addBid}>
                    <div className="space-y-4">
                        {error && <p className="text-red-400 bg-red-100 border border-red-200 p-3 rounded-xl text-sm text-center">{error}</p>}

                        <label htmlFor="bid" className="text-sm text-neutral-300 block">Your bid amount</label>

                        <div className="flex flex-col sm:flex-row gap-3">
                            <input id="bid" type="number" placeholder="Enter amount" required value={bid} onChange={(e) => setBid(e.target.value)} className="flex-1 h-12 rounded-xl border border-neutral-200 bg-neutral-100 px-4 text-neutral-950 outline-none focus:border-yellow-400 transition" />

                            <button disabled={loading} type="submit" className="w-full sm:w-auto px-6 h-12 rounded-xl bg-yellow-400 text-black font-semibold hover:bg-yellow-300 transition disabled:opacity-50 whitespace-nowrap">
                                {loading ? "Adding..." : "Place Bid"}
                            </button>
                        </div>

                        <button type="button" onClick={onClose} className="w-full rounded-xl bg-neutral-300 py-3 text-neutral-950 hover:bg-neutral-4q00 transition">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}