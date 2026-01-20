import { Link, useLocation } from "react-router-dom";
import { useState } from "react";
import logo from "../assets/nganya-logo.png";

export default function Navbar() {
    const location = useLocation();
    const isAdmin = localStorage.getItem("isAdmin") === "true";
    const [menuOpen, setMenuOpen] = useState(false);

    const logout = () => {
        localStorage.removeItem("isAdmin");
        window.location.href = "/";
    };

    const isHome = location.pathname === "/";

    return (
        <nav
            className={`fixed top-0 w-full z-50 transition-all duration-300
            ${isHome
                ? "bg-[#121212]/70 backdrop-blur-md"
                : "bg-[#121212] shadow-[0_4px_20px_rgba(0,0,0,0.6)]"}`}
        >
            <div className="max-w-7xl mx-auto flex justify-between items-center px-6 py-4">

                {/* LOGO */}
                <Link to="/" className="flex items-center gap-3">
                    <div className="bg-white/90 px-3 py-1 rounded-lg">
                        <img
                            src={logo}
                            alt="Nganya Experience"
                            className="h-10 w-auto object-contain"
                        />
                    </div>
                </Link>

                {/* DESKTOP NAV */}
                <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-gray-200">
                    <Link to="/" className="hover:text-red-400 transition">
                        Home
                    </Link>

                    <Link to="/events" className="hover:text-red-400 transition">
                        Events
                    </Link>

                    <Link to="/hire" className="hover:text-red-400 transition">
                        Hire Nganya
                    </Link>

                    {isAdmin && (
                        <>
                            <Link to="/admin" className="text-yellow-400">
                                Admin
                            </Link>

                            <Link to="/admin/nganya" className="text-yellow-400">
                                Admin Nganyas
                            </Link>

                            <button
                                onClick={logout}
                                className="text-red-500 hover:text-red-600 transition"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>

                {/* RIGHT SIDE */}
                <div className="flex items-center gap-4">
                    <Link
                        to="/hire"
                        className="bg-red-600 hover:bg-red-700 transition px-5 py-2 rounded-xl text-sm font-semibold text-white"
                    >
                        Hire Nganya
                    </Link>

                    <button
                        onClick={() => setMenuOpen(!menuOpen)}
                        className="md:hidden text-gray-200 text-2xl focus:outline-none"
                    >
                        ☰
                    </button>
                </div>
            </div>

            {/* MOBILE MENU */}
            {menuOpen && (
                <div className="md:hidden bg-[#1A1A1A] border-t border-[#2A2A2A] px-6 py-6 space-y-5 text-gray-200 text-sm font-semibold">
                    <Link onClick={() => setMenuOpen(false)} to="/" className="block">
                        Home
                    </Link>

                    <Link onClick={() => setMenuOpen(false)} to="/events" className="block">
                        Events
                    </Link>

                    <Link onClick={() => setMenuOpen(false)} to="/hire" className="block">
                        Hire Nganya
                    </Link>

                    {isAdmin && (
                        <>
                            <Link
                                onClick={() => setMenuOpen(false)}
                                to="/admin"
                                className="block text-yellow-400"
                            >
                                Admin
                            </Link>

                            <Link
                                onClick={() => setMenuOpen(false)}
                                to="/admin/nganya"
                                className="block text-yellow-400"
                            >
                                Admin Nganyas
                            </Link>

                            <button
                                onClick={logout}
                                className="block text-red-500"
                            >
                                Logout
                            </button>
                        </>
                    )}
                </div>
            )}
        </nav>
    );
}
