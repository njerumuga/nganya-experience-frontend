import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

// ✅ Render backend
const API_BASE = "https://nganya-experience-backend-2.onrender.com";

export default function EventDetails() {
    const ADMIN_PHONE = "+254719522977";
    const { id } = useParams();

    const [event, setEvent] = useState(null);
    const [selectedTicket, setSelectedTicket] = useState(null);
    const [customerName, setCustomerName] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);

    useEffect(() => {
        fetch(`${API_BASE}/api/events/${id}`)
            .then(res => res.json())
            .then(setEvent)
            .catch(err => console.error("Failed to load event", err));
    }, [id]);

    if (!event) {
        return (
            <div className="min-h-screen bg-[#121212] flex items-center justify-center text-gray-300">
                Loading event...
            </div>
        );
    }

    const handleBooking = async () => {
        if (!selectedTicket || selectedTicket.seatsLeft <= 0) return;

        setLoading(true);

        try {
            const response = await fetch(`${API_BASE}/api/bookings`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    customerName: customerName.trim(),
                    phoneNumber: phoneNumber.trim(),
                    eventId: event.id,
                    ticketTypeId: selectedTicket.id,
                }),
            });

            const data = await response.json();

            const message = `
Hello Nganya Experience 👋

🎉 Event: ${event.title}
📍 Location: ${event.location}
📅 Date: ${event.date} ${event.time}

🎟️ Ticket: ${selectedTicket.name}
💰 Price: KES ${selectedTicket.price}

👤 Name: ${customerName}
📞 Phone: ${phoneNumber}

🆔 Ticket Code: ${data.ticketCode}
            `;

            const whatsappUrl = `https://wa.me/${ADMIN_PHONE.replace(
                "+",
                ""
            )}?text=${encodeURIComponent(message)}`;

            window.open(whatsappUrl, "_blank");

            setSuccess(data);

            // refresh event seats
            fetch(`${API_BASE}/api/events/${id}`)
                .then(res => res.json())
                .then(setEvent);

            setCustomerName("");
            setPhoneNumber("");
            setSelectedTicket(null);
        } catch (e) {
            console.error("Booking failed", e);
            alert("Booking failed. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-[#121212] text-gray-200 px-4 py-10">
            <div className="max-w-4xl mx-auto bg-[#1A1A1A] rounded-2xl overflow-hidden shadow-[0_10px_40px_rgba(0,0,0,0.6)]">
                <img
                    src={
                        event.posterUrl
                            ? `${API_BASE}${event.posterUrl}`
                            : "/placeholder.jpg"
                    }
                    onError={(e) => (e.target.src = "/placeholder.jpg")}
                    alt={event.title}
                    className="w-full h-80 object-cover"
                />

                <div className="p-6">
                    <h1 className="text-3xl font-bold text-gray-100">
                        {event.title}
                    </h1>

                    <p className="text-gray-400 mt-1">{event.location}</p>
                    <p className="text-sm text-gray-500">
                        {event.date} · {event.time}
                    </p>

                    <p className="mt-4 text-gray-300 leading-relaxed">
                        {event.description}
                    </p>

                    <h2 className="text-2xl font-semibold mt-10 mb-4 text-gray-100">
                        Select Ticket
                    </h2>

                    <div className="space-y-4">
                        {event.tickets &&
                            event.tickets.map(ticket => {
                                const soldOut = ticket.seatsLeft <= 0;

                                return (
                                    <label
                                        key={ticket.id}
                                        className={`flex justify-between items-center border p-4 rounded-xl transition
                                        border-[#2A2A2A]
                                        ${soldOut
                                            ? "opacity-50 cursor-not-allowed"
                                            : "cursor-pointer hover:border-red-500"}
                                        ${selectedTicket?.id === ticket.id
                                            ? "border-red-500 bg-[#202020]"
                                            : ""}`}
                                    >
                                        <div className="flex items-center gap-3">
                                            <input
                                                type="radio"
                                                name="ticket"
                                                disabled={soldOut}
                                                checked={
                                                    selectedTicket?.id ===
                                                    ticket.id
                                                }
                                                onChange={() =>
                                                    setSelectedTicket(ticket)
                                                }
                                            />
                                            <span className="font-medium text-gray-200">
                                                {ticket.name}
                                                {soldOut && (
                                                    <span className="ml-2 text-red-500 font-semibold">
                                                        SOLD OUT
                                                    </span>
                                                )}
                                            </span>
                                        </div>

                                        <div className="text-right">
                                            <p className="font-bold text-gray-100">
                                                KES {ticket.price}
                                            </p>
                                            <p className="text-sm text-gray-400">
                                                {ticket.seatsLeft} seats left
                                            </p>
                                        </div>
                                    </label>
                                );
                            })}
                    </div>

                    {selectedTicket && selectedTicket.seatsLeft > 0 && (
                        <div className="mt-8 space-y-4">
                            <input
                                type="text"
                                placeholder="Your Name"
                                value={customerName}
                                onChange={e =>
                                    setCustomerName(e.target.value)
                                }
                                className="w-full bg-[#202020] border border-[#2A2A2A] p-3 rounded-xl text-gray-200 placeholder-gray-500"
                            />

                            <input
                                type="tel"
                                placeholder="Phone Number"
                                value={phoneNumber}
                                onChange={e =>
                                    setPhoneNumber(e.target.value)
                                }
                                className="w-full bg-[#202020] border border-[#2A2A2A] p-3 rounded-xl text-gray-200 placeholder-gray-500"
                            />

                            <button
                                onClick={handleBooking}
                                disabled={
                                    !customerName || !phoneNumber || loading
                                }
                                className="w-full bg-red-600 hover:bg-red-700 transition text-white py-3 rounded-xl font-semibold disabled:opacity-50"
                            >
                                {loading
                                    ? "Processing..."
                                    : "Book via WhatsApp"}
                            </button>
                        </div>
                    )}

                    {success && (
                        <p className="mt-6 text-green-400 font-semibold text-center">
                            ✅ Booking successful <br />
                            Ticket Code: <b>{success.ticketCode}</b>
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
}
