import { useEffect, useState } from "react"

interface CountdownProps {
    endsAt: string;
}

export default function Countdown({ endsAt }: CountdownProps) {
    const [timeLeft, setTimeLeft] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            const now = new Date().getTime();
            const end = new Date(endsAt).getTime();
            const diff = end - now;

            setTimeLeft(diff > 0 ? diff : 0);

            if (diff <= 0) {
                clearInterval(interval);
            }
        }, 1000);

        return () => clearInterval(interval);
    }, [endsAt]);

    if (timeLeft <= 0) {
        return (
            <div className="border border-neutral-200 rounded-lg p-3">
                <h1 className="font-mono text-2xl font-semibold text-red-500">Auction ended</h1>
            </div>
        );
    }

    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24));
    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24);
    const minutes = Math.floor((timeLeft / (1000 * 60)) % 60);
    const seconds = Math.floor((timeLeft / 1000) % 60);

    return (
        <div className="border border-neutral-200 text-neutral-950 rounded-lg p-3">
            <h1 className="font-mono text-xl md:text-3xl font-semibold animate-pulse">{days > 0 && `${days}d `}{hours}h {minutes}m {seconds}s</h1>
        </div>
    )
}