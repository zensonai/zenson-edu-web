import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import useForm from '../../hooks/useForm';
import { FaGraduationCap } from 'react-icons/fa';
import DefaultButton from '../../component/Buttons/DefaultButton';
import DefaultInput from '../../component/Form/DefaultInput';
import API from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import Toast from '../../component/Toast/Toast';


const Login = () => {
    const navigate = useNavigate()
    const { values, handleChange } = useForm({
        email: '',
        password: ''
    });

    const { login } = useAuth();

    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false)

    const headlelogin = async (e) => {
        e.preventDefault();
        setLoading(true)

        try {
            const res = await API.post('/auth/login', values)
            if (res.data.success === true) {
                login(
                    res.data.access_token,
                    res.data.refresh_token
                );
                setToast({
                    success: true,
                    message: res.data.message,
                });
                setTimeout(() => navigate("/dashboard"), 3000);
            }
            else {
                setToast({
                    success: false,
                    message: res.data.message || "Something went wrong",
                });
            }
        }
        catch (err) {
            setToast({
                success: false,
                message: err.response?.data?.message || "Something went wrong",
            });
        }
        finally {
            setLoading(false)
        }
    }


    return (
        <div className="min-h-screen bg-slate-50 relative overflow-hidden flex items-center justify-center px-6 py-12">
            <div className="absolute top-0 left-0 w-72 h-72 bg-indigo-500/20 rounded-full blur-3xl"></div>
            <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-200/30 rounded-full blur-3xl"></div>
            <div className="absolute top-1/2 left-1/2 w-64 h-64 bg-blue-100/40 rounded-full blur-3xl -translate-x-1/2 -translate-y-1/2"></div>

            {toast && (
                <div className="fixed top-8 right-8 z-50">
                    <Toast
                        success={toast.success}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}

            <div className="w-full max-w-md mx-auto relative z-10">
                <div className="flex flex-col items-center text-center mb-6">
                    <div className="bg-indigo-500 p-2.5 rounded-xl mb-3">
                        <FaGraduationCap className="w-7 h-7 text-white" />
                    </div>

                    <h1 className="text-xl font-bold text-indigo-500">
                        ZensonEdu AI
                    </h1>
                </div>

                <div className="bg-white/80 backdrop-blur-lg w-full rounded-3xl shadow-xl border border-slate-200/50 p-8">
                    <div className="text-center mb-8">
                        <h2 className="text-2xl font-semibold text-slate-900">
                            Welcome Back
                        </h2>

                        <p className="text-gray-500 mt-2">
                            Intelligent Learning Management System
                        </p>
                    </div>

                    <div className="space-y-6">
                        <div className="flex items-center justify-center gap-3 bg-indigo-50 rounded-2xl py-4">
                            <div className="w-10 h-10 rounded-xl bg-[#2573E6]/10 flex items-center justify-center">
                                <FaGraduationCap className="w-5 h-5 text-indigo-500" />
                            </div>

                            <div className="text-left">
                                <h3 className="font-semibold text-slate-900">
                                    ZensonEdu AI Portal
                                </h3>

                                <p className="text-sm text-slate-500">
                                    Smart education management platform
                                </p>
                            </div>
                        </div>

                        <div className="flex items-center gap-3 text-sm text-slate-500">
                            <div className="h-px flex-1 bg-slate-200"></div>

                            <span>
                                Secure Access
                            </span>

                            <div className="h-px flex-1 bg-slate-200"></div>
                        </div>

                        <form onSubmit={headlelogin} method="post">
                            <DefaultInput
                                label="Email Address"
                                type="email"
                                value={values.email}
                                name="email"
                                onChange={handleChange}
                                placeholder="username@example.com"
                                required
                            />

                            <DefaultInput
                                label="Password"
                                type="password"
                                value={values.password}
                                name="password"
                                onChange={handleChange}
                                placeholder="••••••••••••"
                                required
                            />

                            <div className="pt-4">
                                <DefaultButton
                                    type="submit"
                                    label={
                                        loading
                                            ? "Signing In..."
                                            : "Sign In"
                                    }
                                />
                            </div>
                        </form>

                        <div className="flex justify-center gap-6 pt-3 text-sm text-slate-500">
                            <span className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-green-500"></span>
                                Secure Login
                            </span>

                            <span className="flex items-center gap-2">
                                <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                                AI Powered
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Login