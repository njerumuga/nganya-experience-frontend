// Base backend URL (Render)
const API_BASE = "https://nganya-experience-backend-2.onrender.com";

// Events endpoint
const EVENTS_URL = `${API_BASE}/api/events`;

// Get all events
export const getEvents = async () => {
    try {
        const res = await fetch(EVENTS_URL);
        if (!res.ok) throw new Error("Failed to fetch events");
        return await res.json();
    } catch (error) {
        console.error("getEvents error:", error);
        throw error;
    }
};

// Create a new event with tickets
export const createEvent = async (event) => {
    try {
        const res = await fetch(EVENTS_URL, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(event),
        });

        if (!res.ok) throw new Error("Failed to create event");
        return await res.json();
    } catch (error) {
        console.error("createEvent error:", error);
        throw error;
    }
};

// Helper to create default matatu tickets
export const addMatatuTickets = () => {
    return [
        { name: "Regular", price: 1000, capacity: 14 },
        { name: "VIP", price: 3000, capacity: 6 }
    ];
};
