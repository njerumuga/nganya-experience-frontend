import { useState } from "react";
import { useNavigate } from "react-router-dom";

// ✅ Render backend
const API_BASE = "https://nganya-experience-backend-2.onrender.com";

export default function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const changePassword = async () => {
        if (!currentPassword || !newPassword) {
            alert("Fill both fields");
            return;
        }

        setLoading(true);

        try {
            const res = await fetch(
                `${API_BASE}/api/admin/auth/change-password`,
                {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        currentPassword: currentPassword.trim(),
                        newPassword: newPassword.trim(),
                    }),
                }
            );

            const data = await res.json();
            alert(data.message);

            if (data.status === "success") {
                navigate("/admin");
            }
        } catch (err) {
            console.error("Change password error:", err);
            alert("Failed to change password");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="border p-8 rounded-xl w-96 space-y-4 shadow bg-white">
                <h1 className="text-2xl font-bold text-center">
                    Change Admin Password
                </h1>

                <input
                    type="password"
                    placeholder="Current Password"
                    value={currentPassword}
                    onChange={e => setCurrentPassword(e.target.value)}
                    className="border p-3 w-full rounded"
                    disabled={loading}
                />

                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    className="border p-3 w-full rounded"
                    disabled={loading}
                />

                <button
                    onClick={changePassword}
                    disabled={loading}
                    className={`w-full py-3 rounded-xl text-white ${
                        loading
                            ? "bg-gray-400 cursor-not-allowed"
                            : "bg-green-600 hover:bg-green-700"
                    }`}
                >
                    {loading ? "Updating..." : "Update Password"}
                </button>
            </div>
        </div>
    );
}
