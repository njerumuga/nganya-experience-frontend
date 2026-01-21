import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { getEvents } from "../api/eventApi";

const API_BASE = "https://nganya-experience-backend-2.onrender.com";

export default function Events() {
    const [events, setEvents] = useState([]);

    useEffect(() => {
        getEvents().then(setEvents);
    }, []);

    return (
        <div className="bg-[#121212] text-gray-200 min-h-screen pt-24">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">

                    {events.map(event => (
                        <Link
                            key={event.id}
                            to={`/events/${event.id}`}
                            className="group"
                        >
                            <div
                                className="relative rounded-2xl overflow-hidden
                                bg-[#1A1A1A] border border-[#2A2A2A]
                                transition-all duration-300
                                hover:-translate-y-2 hover:scale-[1.02]
                                hover:shadow-[0_0_40px_rgba(211,47,47,0.18)]"
                            >
                                <div className="relative h-48 md:h-56 overflow-hidden">
                                    <img
                                        src={
                                            event.posterUrl
                                                ? `${API_BASE}${event.posterUrl}`
                                                : "/placeholder.jpg"
                                        }
                                        onError={e =>
                                            (e.currentTarget.src = "/placeholder.jpg")
                                        }
                                        alt={event.title}
                                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                                    />

                                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
                                </div>

                                <div className="p-5 space-y-2">
                                    <h2 className="text-lg font-bold text-gray-100">
                                        {event.title}
                                    </h2>

                                    <p className="text-gray-400 text-sm">
                                        {event.location}
                                    </p>

                                    <p className="text-gray-500 text-xs">
                                        {event.date}
                                    </p>

                                    <div className="pt-3 space-y-1">
                                        {event.tickets && event.tickets.map(ticket => (
                                            <p
                                                key={ticket.id}
                                                className="text-sm flex justify-between text-gray-300"
                                            >
                                                <span>{ticket.name}</span>
                                                <span className="text-yellow-400 font-semibold">
                                                    KES {ticket.price}
                                                </span>
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}

                </div>
            </div>
        </div>
    );
}
