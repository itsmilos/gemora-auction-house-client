import { Link } from "react-router-dom";

interface Props {
    auctionId: string;
    amount: string;
    title: string;
    createdAt: string;
    currentPrice: string;
}

export default function BidListItem({ auctionId, amount, title, createdAt, currentPrice }: Props) {
    const isWinning = parseFloat(amount) >= parseFloat(currentPrice);

    return (
        <Link
            to={`/auctions/${auctionId}`}
            className="block rounded-xl p-4 border border-neutral-200 transition-transform duration-200 hover:scale-[1.02] hover:border-yellow-400"
        >
            <p className="text-neutral-500 text-xs uppercase tracking-wide">
                {new Date(createdAt).toLocaleString()}
            </p>
            <h3 className="font-sans font-semibold text-lg mt-1 truncate">{title}</h3>
            <div className="flex justify-between items-center mt-3">
                <span className="font-mono text-xl">${amount}</span>
                <span className={`text-xs font-medium ${isWinning ? "text-green-400" : "text-red-400"}`}>
                    {isWinning ? "Winning" : "Outbid"}
                </span>
            </div>
        </Link>
    );
}