import { useState } from "react";
import api from "../lib/api";
import axios from "axios";

interface DeleteModalProps {
    id: string;
    onSuccess: () => void;
    onClose: () => void;
}

export default function DeleteConfirmModal({ id, onSuccess, onClose }: DeleteModalProps) {
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    async function handleDelete(e: React.FormEvent) {
        e.preventDefault();
        if (!id) return;
        setError("");
        setLoading(true);

        try {
            await api.delete(`/auctions/${id}`);
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
            <div className="w-full max-w-md rounded-3xl border border-neutral-800 bg-neutral-900 p-6 sm:p-8 shadow-2xl">
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-2xl font-bold text-white">Are you sure you want to delete this auction?</h2>
                </div>

                <form onSubmit={handleDelete}>
                    <div className="space-y-4">
                        {error && <p className="text-red-400 bg-red-950/40 border border-red-900 p-3 rounded-xl text-sm text-center">{error}</p>}

                        <div className="flex flex-col sm:flex-row gap-3">

                            <button disabled={loading} type="submit" className="w-full px-6 h-12 rounded-xl bg-red-400 text-black font-semibold hover:bg-red-300 transition disabled:opacity-50">
                                {loading ? "Deleting..." : "Delete"}
                            </button>
                        </div>

                        <button type="button" onClick={onClose} className="w-full rounded-xl bg-neutral-800 py-3 text-white hover:bg-neutral-700 transition">
                            Cancel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}