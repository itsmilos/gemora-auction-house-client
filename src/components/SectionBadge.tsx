import { Gem } from "lucide-react";

interface SectionBadgeProps {
    text: string;
}

export default function SectionBadge({ text }: SectionBadgeProps) {
    return (
        <div className="
            inline-flex
            items-center
            gap-3
            rounded-full
            bg-yellow-100
            px-8
            py-3
            text-yellow-600
            font-medium
            uppercase
            tracking-wide
            text-sm
        ">
            <Gem size={24} fill="currentColor" />
            <span>{text}</span>
        </div>
    );
}