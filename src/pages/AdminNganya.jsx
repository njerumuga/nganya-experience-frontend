import { useEffect, useState } from "react";

// ✅ Render backend base URL
const API_BASE = "https://nganya-experience-backend-2.onrender.com";

export default function AdminNganya() {
    const [nganyas, setNganyas] = useState([]);
    const [name, setName] = useState("");
    const [size, setSize] = useState("");
    const [image, setImage] = useState(null);

    const fetchNganyas = () => {
        fetch(`${API_BASE}/api/nganyas`)
            .then(res => res.json())
            .then(setNganyas)
            .catch(err => console.error("Fetch nganyas error:", err));
    };

    useEffect(() => {
        fetchNganyas();
    }, []);

    const createNganya = async () => {
        if (!name || !size) {
            alert("Name & size required");
            return;
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("size", size);
        if (image) formData.append("image", image);

        try {
            await fetch(`${API_BASE}/api/admin/nganyas`, {
                method: "POST",
                body: formData,
            });

            setName("");
            setSize("");
            setImage(null);
            fetchNganyas();
        } catch (err) {
            console.error("Create nganya error:", err);
            alert("Failed to create Nganya");
        }
    };

    const deleteNganya = async (id) => {
        if (!window.confirm("Delete this Nganya?")) return;

        try {
            await fetch(`${API_BASE}/api/admin/nganyas/${id}`, {
                method: "DELETE",
            });

            fetchNganyas();
        } catch (err) {
            console.error("Delete nganya error:", err);
            alert("Failed to delete Nganya");
        }
    };

    // ✅ Images served from backend
    const resolveImage = (url) =>
        url ? `${API_BASE}${url}` : "/placeholder.jpg";

    return (
        <div className="max-w-6xl mx-auto p-8 space-y-10">
            <h1 className="text-3xl font-bold">Admin – Nganyas</h1>

            {/* ADD NGANYA */}
            <div className="border rounded-xl p-6 space-y-4 shadow">
                <input
                    placeholder="Nganya Name"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    className="border p-3 w-full rounded"
                />

                <input
                    placeholder="Size (e.g 33 Seater)"
                    value={size}
                    onChange={e => setSize(e.target.value)}
                    className="border p-3 w-full rounded"
                />

                <input
                    type="file"
                    accept="image/*"
                    onChange={e => setImage(e.target.files[0])}
                />

                <button
                    onClick={createNganya}
                    className="bg-black text-white px-6 py-3 rounded-xl"
                >
                    Add Nganya
                </button>
            </div>

            {/* LIST NGANYAS */}
            <div className="grid md:grid-cols-3 gap-6">
                {nganyas.map(n => (
                    <div key={n.id} className="border rounded-xl shadow">
                        <img
                            src={resolveImage(n.imageUrl)}
                            onError={(e) => (e.target.src = "/placeholder.jpg")}
                            className="h-48 w-full object-cover rounded-t-xl"
                        />

                        <div className="p-4 space-y-2">
                            <h3 className="font-semibold">{n.name}</h3>
                            <p>Size: {n.size}</p>

                            <button
                                onClick={() => deleteNganya(n.id)}
                                className="text-red-600 font-semibold"
                            >
                                🗑️ Delete
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
