import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

export default function Home() {
    const [show, setShow] = useState(false);

    useEffect(() => {
        setTimeout(() => setShow(true), 200);
    }, []);

    return (
        <div className="bg-black text-white">
            {/* HERO */}
            <section
                className="h-screen flex items-center justify-center text-center px-6 bg-cover bg-center relative"
                style={{
                    backgroundImage: "url('/hero-nganya.jpg')",
                }}
            >
                {/* Overlay */}
                <div className="absolute inset-0 bg-black/70"></div>

                {/* Content */}
                <div
                    className={`relative max-w-4xl transition-all duration-1000 ease-out
                    ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                >
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
                        NGANYA  <span className="text-purple-500">EXPERIENCE</span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-300 mb-8">
                        Premium matatu culture. Hire legendary nganyas. Feel the vibe.
                    </p>

                    {/* CTA BUTTONS */}
                    <div className="flex justify-center gap-4">
                        <Link
                            to="/hire"
                            className="bg-red-600 hover:bg-red-700 px-8 py-3 rounded-xl font-semibold"
                        >
                            Book a Nganya
                        </Link>

                        <Link
                            to="/events"
                            className="border border-yellow-400 text-yellow-400 px-8 py-3 rounded-xl font-semibold hover:bg-yellow-400 hover:text-black"
                        >
                            Explore Events
                        </Link>
                    </div>
                </div>
            </section>

            {/* WHY CHOOSE NGANYA */}
            <WhyChooseNganya />
        </div>
    );
}

/* =========================
   WHY CHOOSE NGANYA SECTION
========================= */

function WhyChooseNganya() {
    return (
        <section className="py-20 px-6 bg-zinc-950">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">
                Why Choose <span className="text-purple-500">Nganya</span>?
            </h2>

            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
                {/* CARD 1 */}
                <div className="bg-black border border-zinc-800 rounded-2xl p-8 text-center hover:border-purple-500 transition">
                    <h3 className="text-xl font-semibold mb-4 text-yellow-400">
                        Legendary Culture
                    </h3>
                    <p className="text-gray-400">
                        Authentic matatu art, sound systems, lights, and vibes —
                        straight from the streets.
                    </p>
                </div>

                {/* CARD 2 */}
                <div className="bg-black border border-zinc-800 rounded-2xl p-8 text-center hover:border-purple-500 transition">
                    <h3 className="text-xl font-semibold mb-4 text-yellow-400">
                        Premium Hire
                    </h3>
                    <p className="text-gray-400">
                        Weddings, shoots, parties, road trips — hire nganyas built
                        to turn heads.
                    </p>
                </div>

                {/* CARD 3 */}
                <div className="bg-black border border-zinc-800 rounded-2xl p-8 text-center hover:border-purple-500 transition">
                    <h3 className="text-xl font-semibold mb-4 text-yellow-400">
                        Trusted & Safe
                    </h3>
                    <p className="text-gray-400">
                        Verified owners, professional drivers, and smooth bookings
                        via WhatsApp.
                    </p>
                </div>
            </div>
        </section>
    );
}
