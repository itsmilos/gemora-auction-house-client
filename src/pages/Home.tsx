import Faq from "../components/Faq";
import FeaturedAuctions from "../components/FeaturedAuctions";
import Hero from "../components/Hero";

export default function Home() {
    return (
        <>
            <section id="center">
                <div className="hero">
                    <Hero />
                </div>
                <FeaturedAuctions />
                <div id="faq">
                    <Faq />
                </div>
            </section>
        </>

    )
}