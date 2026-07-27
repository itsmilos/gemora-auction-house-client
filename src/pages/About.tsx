import Contact from "./Contact";
import { Gem, Gavel, ShieldCheck } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-scree text-neutral-950 py-12 px-6">
      <div className="container mx-auto max-w-6xl">
        <section className="py-10">
          <div className="max-w-4xl flex flex-col gap-6">
            <h1 className="text-5xl md:text-6xl font-black flex flex-wrap items-center gap-3">
              About
              <span
                className="
                            text-yellow-400
                            flex
                            items-center
                            gap-2
                        "
              >
                <Gem size={42} />
                GEMORA
              </span>
            </h1>

            <p
              className="
                        text-xl
                        text-neutral-500
                        leading-8
                    "
            >
              A modern online auction marketplace where rare items, timeless
              treasures, and passionate collectors come together.
            </p>

            <p
              className="
                        text-neutral-600
                        leading-8
                    "
            >
              GEMORA connects collectors, enthusiasts, and sellers from around
              the world through a trusted digital auction platform. From vintage
              vehicles and rare collectibles to jewelry, artwork, and unique
              pieces, we create a place where valuable items find their next
              owner.
            </p>
          </div>
        </section>

        <section className="py-10">
          <div
            className="
                    grid
                    grid-cols-1
                    md:grid-cols-3
                    gap-6
                "
          >
            <div
              className="
                        border
                        border-neutral-200
                        rounded-3xl
                        p-6
                    "
            >
              <Gem className="text-yellow-400 mb-4" size={32} />

              <h3
                className="
                            font-bold
                            text-xl
                            mb-2
                        "
              >
                Unique Collections
              </h3>

              <p className="text-neutral-500 leading-7">
                Discover carefully selected items including vintage vehicles,
                art, jewelry, and rare collectibles.
              </p>
            </div>

            <div
              className="
                        border
                        border-neutral-200
                        rounded-3xl
                        p-6
                    "
            >
              <Gavel className="text-yellow-400 mb-4" size={32} />

              <h3
                className="
                            font-bold
                            text-xl
                            mb-2
                        "
              >
                Transparent Auctions
              </h3>

              <p className="text-neutral-500 leading-7">
                Participate in fair bidding experiences designed for buyers and
                sellers worldwide.
              </p>
            </div>

            <div
              className="
                        border
                        border-neutral-200
                        rounded-3xl
                        p-6
                    "
            >
              <ShieldCheck className="text-yellow-400 mb-4" size={32} />

              <h3
                className="
                            font-bold
                            text-xl
                            mb-2
                        "
              >
                Trusted Marketplace
              </h3>

              <p className="text-neutral-500 leading-7">
                A secure environment where collectors can trade items with
                confidence.
              </p>
            </div>
          </div>
        </section>

        <section className="py-10">
          <div className="max-w-4xl">
            <h2
              className="
                        text-3xl
                        font-black
                        mb-5
                    "
            >
              Our Mission
            </h2>

            <p
              className="
                        text-neutral-500
                        leading-8
                    "
            >
              At GEMORA, we believe every item carries a story. Our mission is
              to build a modern marketplace where collectors and sellers can
              connect, discover exceptional pieces, and preserve the value
              behind every treasure.
            </p>
          </div>
        </section>

        <section className="py-10">
          <div
            className="
                    grid
                    grid-cols-2
                    md:grid-cols-4
                    gap-6
                "
          >
            {[
              ["10K+", "Collectors"],
              ["5K+", "Items Listed"],
              ["50+", "Categories"],
              ["24/7", "Online Access"],
            ].map(([number, text]) => (
              <div
                key={text}
                className="
                                border
                                border-neutral-200
                                rounded-3xl
                                p-6
                                text-center
                            "
              >
                <h3
                  className="
                                text-3xl
                                font-black
                            "
                >
                  {number}
                </h3>

                <p className="text-neutral-500 mt-1">{text}</p>
              </div>
            ))}
          </div>
        </section>

        <div className="pt-20">
          <Contact />
        </div>
      </div>
    </div>
  );
}
