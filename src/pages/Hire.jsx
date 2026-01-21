import { useEffect, useState } from "react";

const API_BASE = "https://nganya-experience-backend-2.onrender.com";
const ADMIN_PHONE = "254719522977"; // no +

export default function Hire() {
    const [nganyas, setNganyas] = useState([]);
    const [selected, setSelected] = useState(null);
    const [name, setName] = useState("");
    const [phone, setPhone] = useState("");
    const [date, setDate] = useState("");

    useEffect(() => {
        fetch(`${API_BASE}/api/nganyas`)
            .then(res => res.json())
            .then(setNganyas)
            .catch(() => setNganyas([]));
    }, []);

    const hireNow = () => {
        if (!selected || !name || !phone || !date) {
            alert("Please fill all fields");
            return;
        }

        const message = `
Hello Nganya Experience 👋

🚐 Nganya Hire Request

🚌 Nganya: ${selected.name}
📏 Size: ${selected.size}
📅 Date: ${date}

👤 Name: ${name}
📞 Phone: ${phone}
        `;

        const whatsappUrl =
            `https://wa.me/${ADMIN_PHONE}?text=${encodeURIComponent(message)}`;

        window.open(whatsappUrl, "_blank");

        setSelected(null);
        setName("");
        setPhone("");
        setDate("");
    };

    const resolveImage = (url) => url ? `${API_BASE}${url}` : "/placeholder.jpg";

    return (
        <div className="bg-black text-white min-h-screen pt-24">
            <div className="max-w-7xl mx-auto px-4 md:px-6 space-y-16">
                {/* NGANYA LIST */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
                    {nganyas.map(n => (
                        <div
                            key={n.id}
                            onClick={() => setSelected(n)}
                            className={`
                                group relative cursor-pointer rounded-2xl overflow-hidden
                                bg-white/5 backdrop-blur-xl
                                border border-white/10
                                transition-all duration-500
                                hover:-translate-y-2 hover:scale-[1.02]
                                hover:shadow-[0_0_40px_rgba(168,85,247,0.35)]
                                ${selected?.id === n.id
                                ? "ring-2 ring-purple-500 shadow-[0_0_45px_rgba(168,85,247,0.6)]"
                                : ""}
                            `}
                        >
                            <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition bg-gradient-to-br from-purple-500/20 via-transparent to-red-500/20" />

                            <img
                                src={resolveImage(n.imageUrl)}
                                onError={e => (e.currentTarget.src = "/placeholder.jpg")}
                                alt={n.name}
                                className="h-56 w-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />

                            <div className="relative p-6">
                                <h3 className="text-xl font-bold">{n.name}</h3>
                                <p className="text-gray-400 mt-1">Size: {n.size}</p>

                                {selected?.id === n.id && (
                                    <span className="inline-block mt-3 text-xs px-3 py-1 rounded-full bg-purple-500/20 text-purple-300">
                                        Selected
                                    </span>
                                )}
                            </div>
                        </div>
                    ))}
                </div>

                {/* FORM */}
                {selected && (
                    <div className="max-w-xl mx-auto bg-zinc-900/80 backdrop-blur-xl rounded-2xl p-8 space-y-4 shadow-xl border border-white/10">
                        <h2 className="text-xl font-semibold">
                            Hire <span className="text-purple-400">{selected.name}</span>
                        </h2>

                        <input
                            placeholder="Your Name"
                            value={name}
                            onChange={e => setName(e.target.value)}
                            className="w-full bg-black/70 border border-zinc-700 p-3 rounded focus:border-purple-500 outline-none"
                        />

                        <input
                            placeholder="Phone Number"
                            value={phone}
                            onChange={e => setPhone(e.target.value)}
                            className="w-full bg-black/70 border border-zinc-700 p-3 rounded focus:border-purple-500 outline-none"
                        />

                        <input
                            type="date"
                            value={date}
                            onChange={e => setDate(e.target.value)}
                            className="w-full bg-black/70 border border-zinc-700 p-3 rounded focus:border-purple-500 outline-none"
                        />

                        <button
                            onClick={hireNow}
                            className="w-full bg-red-600 hover:bg-red-700 py-3 rounded-xl font-semibold transition"
                        >
                            Hire via WhatsApp
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
}
