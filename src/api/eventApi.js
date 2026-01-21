const BASE_URL = "https://nganya-experience-backend-2.onrender.com/api/events";

// Get all events
export const getEvents = async () => {
    try {
        const res = await fetch(BASE_URL);
        if (!res.ok) throw new Error("Failed to fetch events");
        return await res.json();
    } catch (error) {
        console.error("getEvents error:", error);
        throw error;
    }
};

// Create a new event
export const createEvent = async (event) => {
    try {
        const res = await fetch(BASE_URL, {
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

// Default matatu tickets
export const addMatatuTickets = () => [
    { name: "Regular", price: 1000, capacity: 14 },
    { name: "VIP", price: 3000, capacity: 6 }
];
