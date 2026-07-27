import { Link } from "react-router-dom";

interface Props {
    id: string;
    title: string;
    category: string;
    currentPrice: string;
    imageUrl: string;
}

export default function Card({ id, title, category, currentPrice, imageUrl }: Props) {
    return (
        <Link
            to={`/auctions/${id}`}
            className="bg-white group rounded-xl p-4 border border-neutral-800/10 transition-transform duration-200 hover:scale-[1.02] hover:border-yellow-400"
        >
            <img
                src={imageUrl}
                alt={title}
                className="w-full aspect-[4/3] object-cover rounded-xl mb-5"
            />
            <p className="text-neutral-500 text-xs uppercase tracking-wide">{category}</p>
            <h3 className="text-neutral-900 font-sans font-semibold text-lg mt-1 truncate">{title}</h3>
            <p className="text-neutral-950 font-mono text-xl mt-3">${currentPrice}</p>
        </Link>
    );
}

