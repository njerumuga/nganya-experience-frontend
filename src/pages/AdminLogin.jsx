import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ✅ Render backend
const API_BASE = "https://nganya-experience-backend-2.onrender.com";

export default function AdminLogin() {
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const login = async () => {
        setError("");

        if (!password.trim()) {
            setError("Password cannot be empty");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(`${API_BASE}/api/admin/auth/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ password: password.trim() }),
            });

            const data = await res.json();

            if (data.success) {
                localStorage.setItem("isAdmin", "true");
                navigate("/admin");
            } else {
                setError("Wrong password");
            }
        } catch (err) {
            console.error("Admin login error:", err);
            setError("Server error. Try again later.");
        } finally {
            setLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === "Enter") login();
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50">
            <div className="border p-8 rounded-xl w-96 space-y-4 shadow bg-white">
                <h1 className="text-2xl font-bold text-center">Admin Login</h1>

                {error && (
                    <p className="text-red-600 text-center">{error}</p>
                )}

                <input
                    type="password"
                    placeholder="Admin Password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="border p-3 w-full rounded"
                    disabled={loading}
                />

                <button
                    onClick={login}
                    disabled={loading}
                    className={`w-full py-3 rounded-xl text-white ${
                        loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-black"
                    }`}
                >
                    {loading ? "Logging in..." : "Login"}
                </button>

                <p
                    className="text-sm text-blue-600 text-center cursor-pointer hover:underline"
                    onClick={() => navigate("/admin/change-password")}
                >
                    Change Password
                </p>
            </div>
        </div>
    );
}
