import React, { useEffect, useState } from "react";
import { MdLockOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import API from "../services/api";

const Unauthorized = () => {
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(5);

    useEffect(() => {
        const token = localStorage.getItem("access_token");

        if (!token) {
            navigate("/", { replace: true });
            return;
        }

        const timer = setInterval(() => {
            setCountdown((prev) => {
                if (prev <= 1) {
                    clearInterval(timer);

                    localStorage.removeItem("access_token");
                    localStorage.removeItem("refresh_token");

                    navigate("/", { replace: true });

                    return 0;
                }

                return prev - 1;
            });
        }, 1000);

        return () => clearInterval(timer);
    }, [navigate]);

    const handleUnauthorized = async () => {
        try {
            const token = localStorage.getItem("access_token");

            const res = await API.post(
                "/auth/unauthorized-attempt",
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (res.data.success === true) {
                localStorage.removeItem("access_token");
                localStorage.removeItem("refresh_token");

                navigate("/", { replace: true });
            }
        } catch (err) {
            localStorage.removeItem("access_token");
            localStorage.removeItem("refresh_token");

            navigate("/", { replace: true });
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center px-4 bg-slate-50 relative overflow-hidden">

            <div className="absolute w-[400px] h-[400px] bg-red-400/20 rounded-full blur-3xl -top-20 -left-20"></div>
            <div className="absolute w-[400px] h-[400px] bg-blue-300/20 rounded-full blur-3xl -bottom-20 -right-20"></div>

            <div className="relative bg-white/70 backdrop-blur-xl shadow-[0_20px_60px_rgba(15,23,42,0.12)] rounded-3xl p-8 max-w-md text-center border border-white/60">

                <div className="flex justify-center mb-5">
                    <div className="bg-red-100 text-red-500 p-4 rounded-2xl">
                        <MdLockOutline size={48} />
                    </div>
                </div>

                <h1 className="text-2xl font-bold text-slate-900 mb-4">
                    Unauthorized Access
                </h1>

                <p className="text-slate-500 mb-4">
                    You don’t have permission to access this page. Any unauthorized attempts are being recorded.
                </p>

                <p className="text-slate-500 mb-6">
                    Please login with the correct credentials or contact the administrator.
                </p>

                <div className="mb-6">
                    <p className="text-sm text-slate-400">
                        Redirecting to login in
                    </p>

                    <span className="text-4xl font-bold text-[#2573E6]">
                        {countdown}
                    </span>
                </div>

                <button
                    onClick={handleUnauthorized}
                    className="px-6 py-3 bg-[#2573E6] hover:bg-blue-700 text-white rounded-xl font-semibold transition-all shadow-lg shadow-blue-500/20"
                >
                    Logout & Go Back
                </button>

            </div>
        </div>
    );
};

export default Unauthorized;