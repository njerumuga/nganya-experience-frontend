import { useEffect, useState } from "react";

const API_BASE = "https://nganya-experience-backend-2.onrender.com";

export default function AdminDashboard() {
    const [events, setEvents] = useState([]);

    const [title, setTitle] = useState("");
    const [date, setDate] = useState("");
    const [time, setTime] = useState("");
    const [location, setLocation] = useState("");
    const [posterFile, setPosterFile] = useState(null);
    const [description, setDescription] = useState("");

    const [tickets, setTickets] = useState([
        { name: "", price: "", capacity: "" }
    ]);

    const fetchEvents = () => {
        fetch(`${API_BASE}/api/events`)
            .then(res => res.json())
            .then(setEvents);
    };

    useEffect(() => {
        fetchEvents();
    }, []);

    const uploadPoster = async () => {
        if (!posterFile) return null;

        const formData = new FormData();
        formData.append("file", posterFile);

        const res = await fetch(`${API_BASE}/api/events/upload-poster`, {
            method: "POST",
            body: formData,
        });

        return await res.text();
    };

    const updateTicket = (index, field, value) => {
        const updated = [...tickets];
        updated[index][field] = value;
        setTickets(updated);
    };

    const addTicket = () => setTickets([...tickets, { name: "", price: "", capacity: "" }]);
    const removeTicket = (index) => setTickets(tickets.filter((_, i) => i !== index));

    const createEvent = async () => {
        if (!title || !date || !location) return alert("Fill required fields");

        let posterUrl = null;
        if (posterFile) posterUrl = await uploadPoster();

        await fetch(`${API_BASE}/api/events`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                title,
                date,
                time,
                location,
                description,
                posterUrl,
                status: "UPCOMING",
                tickets: tickets.map(t => ({
                    name: t.name,
                    price: Number(t.price),
                    capacity: Number(t.capacity),
                }))
            }),
        });

        setTitle("");
        setDate("");
        setTime("");
        setLocation("");
        setPosterFile(null);
        setDescription("");
        setTickets([{ name: "", price: "", capacity: "" }]);

        fetchEvents();
    };

    const deleteEvent = async (id) => {
        if (!window.confirm("Delete this event?")) return;
        await fetch(`${API_BASE}/api/admin/events/${id}`, { method: "DELETE" });
        fetchEvents();
    };

    return (
        <div className="p-8 max-w-6xl mx-auto space-y-10">
            <h1 className="text-3xl font-bold">Admin Dashboard</h1>

            <div className="border rounded-xl p-6 shadow space-y-6">
                <h2 className="text-xl font-semibold">Create Event</h2>

                <div className="grid md:grid-cols-2 gap-4">
                    <input placeholder="Title" value={title} onChange={e => setTitle(e.target.value)} className="border p-3 rounded" />
                    <input type="date" value={date} onChange={e => setDate(e.target.value)} className="border p-3 rounded" />
                    <input type="time" value={time} onChange={e => setTime(e.target.value)} className="border p-3 rounded" />
                    <input placeholder="Location" value={location} onChange={e => setLocation(e.target.value)} className="border p-3 rounded" />
                    <input type="file" accept="image/*" onChange={e => setPosterFile(e.target.files[0])} className="border p-3 rounded md:col-span-2" />
                    <textarea placeholder="Description" value={description} onChange={e => setDescription(e.target.value)} className="border p-3 rounded md:col-span-2" />
                </div>

                <div className="space-y-4">
                    <h3 className="font-semibold">Ticket Types</h3>

                    {tickets.map((t, i) => (
                        <div key={i} className="grid grid-cols-4 gap-3">
                            <input placeholder="Name" value={t.name} onChange={e => updateTicket(i, "name", e.target.value)} className="border p-2 rounded" />
                            <input type="number" placeholder="Price" value={t.price} onChange={e => updateTicket(i, "price", e.target.value)} className="border p-2 rounded" />
                            <input type="number" placeholder="Capacity" value={t.capacity} onChange={e => updateTicket(i, "capacity", e.target.value)} className="border p-2 rounded" />
                            <button onClick={() => removeTicket(i)} className="text-red-600">Remove</button>
                        </div>
                    ))}

                    <button onClick={addTicket} className="text-blue-600">+ Add Ticket</button>
                </div>

                <button onClick={createEvent} className="bg-black text-white px-6 py-3 rounded-xl">Add Event</button>
            </div>

            <div className="space-y-4">
                <h2 className="text-2xl font-bold">Posted Events</h2>
                {events.map(event => (
                    <div key={event.id} className="flex justify-between items-center border p-4 rounded-lg">
                        <div>
                            <p className="font-semibold">{event.title}</p>
                            <p className="text-sm text-gray-500">{event.location} · {event.date}</p>
                        </div>
                        <button onClick={() => deleteEvent(event.id)} className="bg-red-600 text-white px-4 py-2 rounded-lg">Delete</button>
                    </div>
                ))}
            </div>
        </div>
    );
}
