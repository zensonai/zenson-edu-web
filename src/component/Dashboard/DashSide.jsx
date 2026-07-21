import React, { useEffect, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, CloudCogIcon } from "lucide-react";


import defaultUser from "../../assets/User.png";
import { useAuth } from "../../context/AuthContext";
import { menus } from "./menus";
import { MdSchool } from "react-icons/md";
import API from "../../services/api";

const DashSide = ({ closeSidebar }) => {
    const { auth } = useAuth();
    const location = useLocation();
    const token = localStorage.getItem('access_token')

    const [openMenu, setOpenMenu] = useState(null);
    const [myprofile, setMyProfile] = useState(null);
    const sections = menus[auth?.role] || [];

    useEffect(() => {
        const activeMenu = sections
            .flatMap((section) => section.items)
            .find((item) =>
                item.submenu?.some((sub) =>
                    location.pathname.startsWith(sub.link)
                )
            );

        if (activeMenu) {
            setOpenMenu(activeMenu.name);
        }
    }, [location.pathname, auth?.role]);

    const toggleMenu = (name) => {
        setOpenMenu((prev) => (prev === name ? null : name));
    };

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

    return (
        <aside className="h-screen w-72 bg-white border-r border-indigo-100 flex flex-col px-4 py-5 overflow-y-auto">

            <div className="mb-10 px-2">
                <div className="flex items-center gap-3">
                    <div className="flex items-center justify-center w-10 h-10 rounded-xl bg-indigo-100 text-indigo-600">
                        <MdSchool className="w-5 h-5" />
                    </div>

                    <div className="leading-tight">
                        <p className="text-base font-semibold text-gray-800">
                            ZensonEdu AI
                        </p>

                        <p className="text-xs font-medium text-indigo-500">
                            Intelligent Learning Management System
                        </p>
                    </div>
                </div>
            </div>


            <div className="flex-1 space-y-6">
                {sections.map((section) => (
                    <div key={section.section}>

                        <p className="px-2 mb-2 text-[11px] font-semibold uppercase text-gray-400">
                            {section.section}
                        </p>

                        <div className="space-y-1">

                            {section.items.map((item) => {

                                const activeSubmenu = item.submenu?.some(
                                    (sub) =>
                                        location.pathname.startsWith(sub.link)
                                );

                                const isOpen =
                                    openMenu === item.name || activeSubmenu;


                                return (
                                    <div key={item.name}>

                                        {item.submenu ? (

                                            <>
                                                <button
                                                    onClick={() =>
                                                        toggleMenu(item.name)
                                                    }
                                                    className={`relative w-full flex items-center justify-between px-3 py-2.5 rounded-xl transition ${isOpen
                                                        ? "bg-indigo-50 text-indigo-600"
                                                        : "text-gray-500 hover:bg-gray-100"
                                                        }`}
                                                >

                                                    {isOpen && (
                                                        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 bg-indigo-600 rounded-r" />
                                                    )}

                                                    <div className="flex items-center gap-3">

                                                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600">
                                                            {item.icon}
                                                        </span>

                                                        <span className="text-sm font-medium">
                                                            {item.name}
                                                        </span>

                                                    </div>


                                                    <ChevronDown
                                                        className={`w-4 h-4 transition-transform ${isOpen
                                                            ? "rotate-180"
                                                            : ""
                                                            }`}
                                                    />

                                                </button>


                                                <AnimatePresence>
                                                    {isOpen && (
                                                        <motion.div
                                                            initial={{
                                                                opacity: 0,
                                                                height: 0,
                                                            }}
                                                            animate={{
                                                                opacity: 1,
                                                                height: "auto",
                                                            }}
                                                            exit={{
                                                                opacity: 0,
                                                                height: 0,
                                                            }}
                                                            className="ml-11 mt-1 space-y-1 overflow-hidden"
                                                        >

                                                            {item.submenu.map(
                                                                (sub) => (
                                                                    <NavLink
                                                                        key={sub.link}
                                                                        to={sub.link}
                                                                        onClick={closeSidebar}
                                                                        className={({ isActive }) =>
                                                                            `block px-3 py-1.5 rounded-md text-sm transition ${isActive
                                                                                ? "text-indigo-600 font-medium"
                                                                                : "text-gray-500 hover:text-indigo-600"
                                                                            }`
                                                                        }
                                                                    >
                                                                        {sub.name}
                                                                    </NavLink>
                                                                )
                                                            )}

                                                        </motion.div>
                                                    )}
                                                </AnimatePresence>

                                            </>

                                        ) : (

                                            <NavLink
                                                to={item.link}
                                                onClick={closeSidebar}
                                                className={({ isActive }) =>
                                                    `relative flex items-center gap-3 px-3 py-2.5 rounded-xl transition ${isActive
                                                        ? "bg-indigo-50 text-indigo-600"
                                                        : "text-gray-500 hover:bg-gray-100"
                                                    }`
                                                }
                                            >

                                                {({ isActive }) => (
                                                    <>
                                                        {isActive && (
                                                            <span className="absolute left-0 top-1/2 -translate-y-1/2 h-6 w-1 bg-indigo-600 rounded-r" />
                                                        )}

                                                        <span className="flex items-center justify-center w-8 h-8 rounded-lg bg-indigo-100 text-indigo-600">
                                                            {item.icon}
                                                        </span>

                                                        <span className="text-sm font-medium">
                                                            {item.name}
                                                        </span>
                                                    </>
                                                )}

                                            </NavLink>

                                        )}

                                    </div>
                                );
                            })}

                        </div>

                    </div>
                ))}
            </div>


            <div className="mt-6">
                <div className="flex items-center gap-3 p-3 rounded-xl border border-gray-200">

                    <img
                        src={
                            myprofile?.profle_img
                                ? `${import.meta.env.VITE_APP_API_FILES}/uploads/profile/${myprofile.profle_img}`
                                : defaultUser
                        }
                        alt="User"
                        className="w-10 h-10 rounded-full object-cover"
                    />

                    <div className="flex-1 min-w-0">

                        <p className="text-sm font-medium text-gray-800 truncate">
                            {auth?.user?.username || "User"}
                        </p>

                        <p className="text-xs text-indigo-500 capitalize">
                            {auth?.role}
                        </p>

                    </div>

                </div>
            </div>

        </aside>
    );
};

export default DashSide;