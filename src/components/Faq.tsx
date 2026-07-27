import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Link } from "react-router-dom";
import SectionBadge from "./SectionBadge";

export default function Faq() {
    const faqs = [
        {
            id: 1,
            question: "How do auctions work?",
            answer:
                "Browse available listings and place your bid before the auction ends. Once the timer expires, the highest valid bid wins the auction."
        },
        {
            id: 2,
            question: "How can I place a bid?",
            answer:
                "Create an account, open any active auction, enter your bid, and confirm it. You can continue bidding until the auction closes."
        },
        {
            id: 3,
            question: "How do I sell an item?",
            answer:
                "Sign in, create a new auction, upload clear photos, add a detailed description, choose a starting price, and publish your listing."
        },
        {
            id: 4,
            question: "What items can I list?",
            answer:
                "You can list vintage cars, jewelry, artwork, collectibles, watches, furniture, cameras, books, musical instruments, and other unique items that comply with our marketplace guidelines."
        },
        {
            id: 5,
            question: "Can I edit my auction after posting it?",
            answer:
                "You can update your listing before bidding begins. Once an auction has active bids, some changes may be restricted to ensure a fair experience for all participants."
        },
        {
            id: 6,
            question: "What happens when an auction ends?",
            answer:
                "When the countdown reaches zero, the highest bidder wins. The buyer and seller can then proceed with completing the transaction."
        },
        {
            id: 7,
            question: "Are payments secure?",
            answer:
                "We are committed to providing a secure marketplace by protecting user accounts and maintaining a transparent bidding experience."
        },
        {
            id: 8,
            question: "Can I cancel my bid?",
            answer:
                "Bids are considered binding, so make sure you review your offer carefully before confirming it."
        },
        {
            id: 9,
            question: "How do I contact support?",
            answer:
                "If you need assistance with your account, auctions, or listings, you can reach our support team through the Contact section."
        },
        {
            id: 10,
            question: "Is there a fee for selling an item?",
            answer:
                "Creating an account is free. Any applicable selling fees or commissions will be clearly displayed before you publish your auction."
        }
    ];

    const [activeId, setActiveId] = useState<number | null>(null);

    const toggleFAQ = (id: number) => {
        setActiveId(activeId === id ? null : id);
    }

    return (
        <section>
            <div className="flex justify-center my-10">
                <SectionBadge text="FAQ" />
            </div>
            {faqs.map((faq) => (
                <div key={faq.id} className="flex justify-center">
                    <motion.div className={activeId === faq.id ? "bg-neutral-50 w-full md:w-[900px] border border-yellow-400 rounded-xl mb-5 flex flex-col relative px-5" : "bg-neutral-50 w-full md:w-[900px] border border-neutral-200 rounded-xl mb-5 flex flex-col relative px-5"}>
                        <button className="w-full h-[60px] flex justify-between items-center font-medium" onClick={() => toggleFAQ(faq.id)}>{faq.question} <motion.span animate={{ rotate: activeId === faq.id ? 45 : 0 }} transition={{ duration: 0.2 }} className="text-xl">+</motion.span></button>
                        <AnimatePresence> {activeId === faq.id && (
                            <motion.div
                                initial={{ opacity: 0, y: -10, height: 0 }}
                                animate={{ opacity: 1, y: 0, height: "auto", transition: { duration: 0.3, ease: 'easeOut' } }}
                                exit={{ height: 0, opacity: 0, transition: { duration: 0.25, ease: 'easeInOut' } }}
                                className="py-2 text-neutral-500 overflow-hidden"> {faq.answer}
                            </motion.div>
                        )}
                        </AnimatePresence>
                    </motion.div>
                </div>
            ))}
            <Link className="flex justify-center items-center text-neutral-500" to="/contact">Have a question? <span className="text-yellow-400 hover:text-yellow-300 px-1">Contact Us</span></Link>
        </section>
    )
}

