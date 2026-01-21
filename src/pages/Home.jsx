import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";

const API_BASE = "https://nganya-experience-backend-2.onrender.com";

export default function Home() {
    const [show, setShow] = useState(false);
    const [showAdminBtn, setShowAdminBtn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        setTimeout(() => setShow(true), 200);
    }, []);

    // Optional: hidden key sequence to show admin button
    useEffect(() => {
        let keySequence = [];
        const secretCode = ["a", "d", "m", "i", "n"]; // type 'admin' to show button

        const handleKeyDown = (e) => {
            keySequence.push(e.key.toLowerCase());
            if (keySequence.length > secretCode.length) keySequence.shift();

            if (keySequence.join("") === secretCode.join("")) {
                setShowAdminBtn(true);
            }
        };

        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    return (
        <div className="bg-black text-white min-h-screen relative">
            {/* HERO */}
            <section
                className="h-screen flex items-center justify-center text-center px-6 bg-cover bg-center relative"
                style={{ backgroundImage: "url('/hero-nganya.jpg')" }}
            >
                <div className="absolute inset-0 bg-black/70"></div>

                <div
                    className={`relative max-w-4xl transition-all duration-1000 ease-out
                    ${show ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"}`}
                >
                    <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
                        NGANYA <span className="text-purple-500">EXPERIENCE</span>
                    </h1>

                    <p className="text-lg md:text-xl text-gray-300 mb-8">
                        Premium matatu culture. Hire legendary nganyas. Feel the vibe.
                    </p>

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

            <WhyChooseNganya />

            {/* Hidden Admin Button */}
            {showAdminBtn && (
                <button
                    onClick={() => navigate("/admin-login")}
                    className="fixed bottom-4 right-4 bg-red-600 text-white px-4 py-2 rounded-xl shadow-lg z-50"
                >
                    Admin
                </button>
            )}
        </div>
    );
}

function WhyChooseNganya() {
    return (
        <section className="py-20 px-6 bg-zinc-950">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-14">
                Why Choose <span className="text-purple-500">Nganya</span>?
            </h2>

            <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-10">
                <div className="bg-black border border-zinc-800 rounded-2xl p-8 text-center hover:border-purple-500 transition">
                    <h3 className="text-xl font-semibold mb-4 text-yellow-400">
                        Legendary Culture
                    </h3>
                    <p className="text-gray-400">
                        Authentic matatu art, sound systems, lights, and vibes — straight from the streets.
                    </p>
                </div>

                <div className="bg-black border border-zinc-800 rounded-2xl p-8 text-center hover:border-purple-500 transition">
                    <h3 className="text-xl font-semibold mb-4 text-yellow-400">
                        Premium Hire
                    </h3>
                    <p className="text-gray-400">
                        Weddings, shoots, parties, road trips — hire nganyas built to turn heads.
                    </p>
                </div>

                <div className="bg-black border border-zinc-800 rounded-2xl p-8 text-center hover:border-purple-500 transition">
                    <h3 className="text-xl font-semibold mb-4 text-yellow-400">
                        Trusted & Safe
                    </h3>
                    <p className="text-gray-400">
                        Verified owners, professional drivers, and smooth bookings via WhatsApp.
                    </p>
                </div>
            </div>
        </section>
    );
}
