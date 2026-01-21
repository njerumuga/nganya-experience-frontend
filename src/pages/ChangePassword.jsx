import { useState } from "react";
import { useNavigate } from "react-router-dom";

const API_BASE = "https://nganya-experience-backend-2.onrender.com";

export default function ChangePassword() {
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const navigate = useNavigate();

    const changePassword = async () => {
        if (!currentPassword || !newPassword) {
            alert("Fill both fields");
            return;
        }
        const res = await fetch(`${API_BASE}/api/admin/auth/change-password`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ currentPassword, newPassword }),
        });
        const data = await res.json();
        alert(data.message);
        if (data.status === "success") {
            navigate("/admin"); // redirect after success
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="border p-8 rounded-xl w-96 space-y-4 shadow">
                <h1 className="text-2xl font-bold text-center">Change Admin Password</h1>
                <input
                    type="password"
                    placeholder="Current Password"
                    value={currentPassword}
                    onChange={e => setCurrentPassword(e.target.value)}
                    className="border p-3 w-full rounded"
                />
                <input
                    type="password"
                    placeholder="New Password"
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    className="border p-3 w-full rounded"
                />
                <button
                    onClick={changePassword}
                    className="bg-green-600 text-white w-full py-3 rounded-xl"
                >
                    Update Password
                </button>
            </div>
        </div>
    );
};
