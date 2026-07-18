import React from "react";
import { FaTwitter, FaLinkedin, FaGithub } from "react-icons/fa";
import { MdSchool, MdAutoAwesome } from "react-icons/md";

const DashFooter = () => {
    const year = new Date().getFullYear();

    const quickLinks = [
        { name: "Home", href: "https://zenson.ai/" },
        { name: "Documentation", href: "#" },
        { name: "Student Support", href: "#" },
        { name: "Teacher Resources", href: "#" },
        { name: "Privacy Policy", href: "#" },
    ];

    const socials = [
        { icon: <FaTwitter />, href: "https://twitter.com" },
        { icon: <FaLinkedin />, href: "https://linkedin.com" },
        { icon: <FaGithub />, href: "https://github.com" },
    ];

    return (
        <footer className="bg-white border-t border-gray-200 mt-10">

            <div className="max-w-7xl mx-auto px-8 py-14">

                <div className="grid grid-cols-1 md:grid-cols-3 gap-20">

                    <div className="space-y-5">

                        <div className="flex items-center gap-4">

                            <div className="w-12 h-12 flex items-center justify-center bg-indigo-50 rounded-xl">
                                <MdSchool size={30} className="text-indigo-600" />
                            </div>

                            <div>
                                <h1 className="text-xl font-bold text-gray-900">
                                    ZensonEdu AI
                                </h1>

                                <p className="text-xs text-indigo-600 font-medium">
                                    Intelligent Learning Management System
                                </p>
                            </div>

                        </div>

                        <p className="text-sm text-gray-500 leading-7 max-w-xs">
                            AI-powered learning management platform designed for institutes, teachers and students to create smarter and personalized education experiences.
                        </p>

                    </div>


                    <div>

                        <h3 className="text-sm font-semibold text-gray-900 mb-6">
                            Platform
                        </h3>

                        <div className="flex flex-col gap-5">

                            {quickLinks.map((link, index) => (
                                <a
                                    key={index}
                                    href={link.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-sm text-gray-500 hover:text-indigo-600 transition"
                                >
                                    {link.name}
                                </a>
                            ))}

                        </div>

                    </div>


                    <div>

                        <h3 className="text-sm font-semibold text-gray-900 mb-6">
                            Connect With Us
                        </h3>

                        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
                            <MdAutoAwesome size={20} className="text-indigo-600" />
                            <span>
                                Smarter learning powered by AI
                            </span>
                        </div>


                        <div className="flex gap-4">

                            {socials.map((social, index) => (
                                <a
                                    key={index}
                                    href={social.href}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="w-11 h-11 flex items-center justify-center rounded-xl bg-gray-50 text-gray-500 hover:bg-indigo-600 hover:text-white transition"
                                >
                                    {social.icon}
                                </a>
                            ))}

                        </div>

                    </div>

                </div>


                <div className="mt-14 pt-7 border-t border-gray-100 flex flex-col md:flex-row justify-between items-center gap-4">

                    <p className="text-xs text-gray-400">
                        © {year} ZensonEdu AI. All rights reserved | Developed and Maintained by <a href="https://zenson.ai/" target="_blank" rel="noopener noreferrer" className="text-indigo-600 hover:text-indigo-700">ZensonAI</a>
                    </p>

                    <p className="text-xs text-gray-400">
                        Intelligent Learning Management System
                    </p>

                </div>

            </div>

        </footer>
    );
};

export default DashFooter;