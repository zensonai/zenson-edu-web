import React, { useState, useEffect, useRef } from "react";
import { FiSearch, FiBell, FiMail, FiMenu, FiX, FiUser, FiLogOut, FiSettings } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import defultUser from "../../assets/User.png";
import { useAuth } from "../../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import DashSide from "./DashSide";
import API from "../../services/api";



const DashNav = () => {
    const navigate = useNavigate();
    const token = localStorage.getItem('access_token')
    const { auth } = useAuth();
    const [dropdownOpen, setDropdownOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);
    const [myprofile, setMyProfile] = useState(null);

    const dropdownRef = useRef(null);


    const headleLogout = async (e) => {
        e.preventDefault();

        try {
            const res = await API.post('/auth/logout', {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })

            if (res.data.success === true) {
                localStorage.removeItem('access_token')
                localStorage.removeItem('refresh_token')
                window.location.reload()
            }
        }
        catch (err) {
            console.log(err)
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token")
        }
    }

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const res = await API.get('/profile/profile-data', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                });

                if (res.data.success) {
                    setMyProfile(res.data.result);
                }

            } catch (err) {
                console.log(err.response?.data || err.message);
            }
        };

        if (token) {
            fetchProfile();
        }

    }, [token]);

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setDropdownOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () =>
            document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <>
            {/* NAVBAR */}
            <motion.header
                initial={{ y: -40, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="sticky top-0 z-30 w-full bg-white border-b border-gray-200"
            >
                <div className="flex items-center justify-between px-4 md:px-8 h-16 xl:pl-[20rem]">
                    {/* LEFT */}
                    <div className="flex items-center gap-3">
                        {/* MOBILE MENU */}
                        <button
                            onClick={() => setMobileOpen(!mobileOpen)}
                            className="p-2 rounded-lg hover:bg-gray-100 transition xl:hidden"
                        >
                            {mobileOpen ? <FiX /> : <FiMenu />}
                        </button>

                        {/* TITLE */}
                        <div>
                            <h1 className="text-base font-semibold text-gray-800">
                                Dashboard
                            </h1>
                            <p className="text-xs text-indigo-500">Welcome back 👋</p>
                        </div>
                    </div>

                    {/* RIGHT */}
                    <div className="flex items-center gap-2" ref={dropdownRef}>
                        {/* SEARCH */}
                        <button
                            onClick={() => setSearchOpen(true)}
                            className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-indigo-600 transition"
                        >
                            <FiSearch />
                        </button>

                        {/* ICONS */}
                        {[FiMail, FiBell].map((Icon, i) => (
                            <motion.button
                                key={i}
                                whileHover={{ scale: 1.1 }}
                                className="p-2 rounded-lg hover:bg-gray-100 text-gray-600 hover:text-indigo-600 transition"
                            >
                                <Icon />
                            </motion.button>
                        ))}

                        {/* PROFILE */}
                        <div className="relative">
                            <button
                                onClick={() => setDropdownOpen(!dropdownOpen)}
                                className="ml-2 flex items-center gap-2 px-2 py-1 rounded-full hover:bg-gray-100 transition"
                            >
                                <img
                                    src={
                                        myprofile?.profle_img
                                            ? `${import.meta.env.VITE_APP_API_FILES}/uploads/profile/${myprofile.profle_img}`
                                            : defultUser
                                    }
                                    alt="Profile"
                                    className="w-10 h-10 rounded-full object-cover"
                                />
                            </button>

                            <AnimatePresence>
                                {dropdownOpen && (
                                    <motion.div
                                        initial={{ opacity: 0, y: -15 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -15 }}
                                        transition={{ type: "spring", stiffness: 300, damping: 30 }}
                                        className="absolute right-0 mt-3 w-72 bg-white border border-gray-200 rounded-2xl shadow-md overflow-hidden z-50"
                                    >
                                        {/* USER HEADER */}
                                        <div className="flex items-center gap-3 p-4 border-b border-indigo-100">
                                            <div className="relative">
                                                <img
                                                    src={
                                                        myprofile?.profle_img
                                                            ? `${import.meta.env.VITE_APP_API_FILES}/uploads/profile/${myprofile?.profle_img}`
                                                            : defultUser
                                                    }
                                                    alt="User"
                                                    className="w-12 h-12 rounded-full border-2 border-indigo-100 object-cover"
                                                />
                                                {/* Online indicator */}
                                                <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full animate-pulse"></span>
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="font-semibold text-gray-800 truncate">
                                                    {auth?.user?.username || "User"}
                                                </p>

                                                <p className="text-xs text-indigo-600 font-medium truncate">
                                                    {auth?.role || "Role"}
                                                </p>

                                                <p className="text-xs text-gray-400 truncate">
                                                    {auth?.user?.email || "user@example.com"}
                                                </p>
                                            </div>
                                        </div>

                                        {/* QUICK ACTIONS */}
                                        <div className="py-2 px-2 grid grid-cols-2 gap-2 border-b border-indigo-100">
                                            <Link
                                                to="/Dashboard/my-profile"
                                                className="flex items-center justify-center gap-2 px-2 py-2 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition text-sm font-medium"
                                            >
                                                <FiUser className="w-4 h-4" />
                                                Profile
                                            </Link>
                                            <Link
                                                to="/Dashboard/settings"
                                                className="flex items-center justify-center gap-2 px-2 py-2 rounded-lg bg-indigo-50 text-indigo-600 hover:bg-indigo-100 transition text-sm font-medium"
                                            >
                                                <FiSettings className="w-4 h-4" />
                                                Settings
                                            </Link>
                                        </div>

                                        {/* MENU */}
                                        <div className="py-2">
                                            <button
                                                onClick={headleLogout}
                                                className="flex items-center gap-2 w-full text-left px-4 py-2 text-red-500 hover:bg-red-50 rounded-lg transition text-sm font-medium"
                                            >
                                                <FiLogOut className="w-4 h-4" />
                                                Logout
                                            </button>
                                            <Link
                                                to="/Dashboard/notifications"
                                                className="flex items-center gap-2 w-full text-left px-4 py-2 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition text-sm font-medium"
                                            >
                                                <FiBell className="w-4 h-4" />
                                                Notifications
                                            </Link>
                                            <Link
                                                to="/Dashboard/messages"
                                                className="flex items-center gap-2 w-full text-left px-4 py-2 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 rounded-lg transition text-sm font-medium"
                                            >
                                                <FiMail className="w-4 h-4" />

                                                Messages
                                            </Link>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </motion.header>

            {/* SEARCH OVERLAY */}
            <AnimatePresence>
                {searchOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50 flex items-start justify-center pt-24 px-4"
                        onClick={() => setSearchOpen(false)}
                    >
                        <motion.div
                            initial={{ y: -30, opacity: 0 }}
                            animate={{ y: 0, opacity: 1 }}
                            exit={{ y: -30, opacity: 0 }}
                            className="bg-white w-full max-w-lg rounded-2xl p-5 shadow-xl"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <input
                                autoFocus
                                placeholder="Search anything..."
                                className="w-full p-3 border border-gray-300 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
                            />
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* DESKTOP SIDEBAR */}
            <div className="hidden xl:flex fixed top-0 left-0 z-50 h-screen w-72">
                <DashSide />
            </div>

            {/* MOBILE SIDEBAR */}
            <AnimatePresence>
                {mobileOpen && (
                    <div className="xl:hidden">
                        <motion.div
                            initial={{ x: -300 }}
                            animate={{ x: 0 }}
                            exit={{ x: -300 }}
                            className="fixed top-0 left-0 z-50 h-screen w-72 shadow-xl"
                        >
                            <DashSide closeSidebar={() => setMobileOpen(false)} />
                        </motion.div>

                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.4 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black z-40"
                            onClick={() => setMobileOpen(false)}
                        />
                    </div>
                )}
            </AnimatePresence>
        </>
    );
};

export default DashNav;