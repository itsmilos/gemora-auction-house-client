import { Mail, Clock, MessageCircle } from "lucide-react";

export default function Contact() {
    return (
        <div className="min-h-scree text-neutral-950 py-12 px-6">

            <div className="container mx-auto max-w-6xl">

                <section className="py-10">

                    <div className="max-w-4xl flex flex-col gap-6">

                        <h1 className="
                            text-5xl
                            md:text-6xl
                            font-black
                        ">
                            Contact <span className="text-yellow-400">GEMORA</span>
                        </h1>


                        <p className="
                            text-xl
                            text-neutral-500
                            leading-8
                        ">
                            Our team is here to help collectors, buyers, and sellers
                            with any questions about auctions and listings.
                        </p>


                        <p className="
                            text-neutral-600
                            leading-8
                        ">
                            Whether you want to list a valuable item, participate in an
                            auction, or need assistance with your account, the GEMORA
                            support team is ready to guide you through every step.
                        </p>

                    </div>

                </section>



                <section className="py-10">

                    <div className="
                        grid
                        grid-cols-1
                        md:grid-cols-3
                        gap-6
                    ">


                        <div className="
                            border
                            border-neutral-200
                            rounded-3xl
                            p-6
                        ">

                            <Mail
                                className="text-yellow-400 mb-4"
                                size={32}
                            />

                            <h3 className="
                                font-bold
                                text-xl
                            ">
                                Email Support
                            </h3>

                            <p className="text-neutral-500 mt-2">
                                support@gemora.com
                            </p>

                        </div>




                        <div className="
                            border
                            border-neutral-200
                            rounded-3xl
                            p-6
                        ">

                            <MessageCircle
                                className="text-yellow-400 mb-4"
                                size={32}
                            />

                            <h3 className="
                                font-bold
                                text-xl
                            ">
                                Customer Assistance
                            </h3>

                            <p className="
                                text-neutral-500
                                mt-2
                                leading-7
                            ">
                                Help with auctions, accounts, and listings.
                            </p>

                        </div>




                        <div className="
                            border
                            border-neutral-200
                            rounded-3xl
                            p-6
                        ">

                            <Clock
                                className="text-yellow-400 mb-4"
                                size={32}
                            />

                            <h3 className="
                                font-bold
                                text-xl
                            ">
                                Support Hours
                            </h3>

                            <p className="
                                text-neutral-500
                                mt-2
                                leading-7
                            ">
                                Monday – Friday
                                <br />
                                9:00 AM – 6:00 PM
                            </p>

                        </div>


                    </div>

                </section>

            </div>

        </div>
    );
}