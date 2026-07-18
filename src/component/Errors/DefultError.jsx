import React from "react";

const DefultError = () => {
    return (
        <div className="min-h-screen flex items-center justify-center px-6 bg-slate-50 relative overflow-hidden">

            <div className="absolute w-[450px] h-[450px] bg-[#2573E6]/20 rounded-full blur-3xl -top-32 -left-32"></div>
            <div className="absolute w-[450px] h-[450px] bg-indigo-300/20 rounded-full blur-3xl -bottom-32 -right-32"></div>
            <div className="absolute w-[300px] h-[300px] bg-blue-200/30 rounded-full blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"></div>

            <div className="absolute inset-0 opacity-[0.04]
                bg-[linear-gradient(to_right,#2573E6_1px,transparent_1px),
                linear-gradient(to_bottom,#2573E6_1px,transparent_1px)]
                bg-[size:40px_40px]">
            </div>

            <div className="relative max-w-xl w-full text-center">

                <div className="bg-white/60 backdrop-blur-2xl border border-white/70 rounded-3xl shadow-[0_20px_60px_rgba(37,115,230,0.15)] px-8 py-12">

                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-[#2573E6]/10 mb-6">
                        <span className="text-3xl">
                            🚀
                        </span>
                    </div>

                    <h1 className="text-[100px] sm:text-[140px] font-extrabold leading-none tracking-tight bg-gradient-to-r from-[#2573E6] to-indigo-400 text-transparent bg-clip-text">
                        404
                    </h1>

                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-4">
                        Lost in Space
                    </h2>

                    <p className="mt-4 text-slate-500 text-sm sm:text-base leading-relaxed">
                        The page you’re looking for doesn’t exist, was moved,
                        or is currently unavailable. Let’s get you back on track.
                    </p>

                    <div className="mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">

                        <a href="/">
                            <button
                                className="px-8 py-3 rounded-xl bg-[#2573E6] text-white font-semibold
                                hover:bg-blue-700 transition-all duration-200 shadow-lg shadow-blue-500/25"
                            >
                                Go Home
                            </button>
                        </a>

                        <button
                            onClick={() => window.history.back()}
                            className="px-8 py-3 rounded-xl bg-white/50 backdrop-blur-lg
                            border border-slate-200 text-slate-700 font-semibold
                            hover:bg-white transition-all duration-200"
                        >
                            Go Back
                        </button>

                    </div>

                    <div className="mt-8 flex items-center justify-center gap-2 text-xs text-slate-400">
                        <span className="w-2 h-2 rounded-full bg-[#2573E6]"></span>
                        Error code: 404 • Page not found
                    </div>

                </div>

            </div>

        </div>
    );
};

export default DefultError;