import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import API from '../../services/api';
import Toast from '../../component/Toast/Toast';
import DefaultInput from '../../component/Form/DefaultInput';
import useForm from '../../hooks/useForm';
import DefaultButton from '../../component/Buttons/DefaultButton';


const Register = () => {
    const navigate = useNavigate()
    const { values, handleChange } = useForm({
        email: '',
        password: ''
    });

    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false)


    const headleRegistaion = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const res = await API.post("auth/register", values);

            if (res.data.success === true) {
                setToast({
                    success: true,
                    message: res.data.message,
                });

                setTimeout(() => navigate("/"), 3000);
            } else {
                setToast({
                    success: false,
                    message: res.data.message || "Something went wrong",
                });
            }
        } catch (err) {
            setToast({
                success: false,
                message: err.response?.data?.message || "Something went wrong",
            });
        } finally {
            setLoading(false);
        }
    };

    
    return (
        <div className="min-h-screen bg-slate-50 flex items-center justify-center px-6 py-12">
            {toast && (
                <div className="fixed top-8 right-8 z-50">
                    <Toast
                        success={toast.success}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}

            <div className="w-full max-w-md">
                <div className="bg-white border border-slate-200 rounded-3xl p-10">
                    <div className="mb-10 text-center">
                        <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-indigo-100 text-indigo-600 text-2xl font-bold mb-5">
                            ✦
                        </div>

                        <h1 className="text-3xl font-bold text-slate-900">
                            Create Account
                        </h1>

                        <p className="text-slate-500 mt-3">
                            Create your account to continue.
                        </p>
                    </div>

                    <form
                        onSubmit={headleRegistaion}
                        className="space-y-6"
                    >
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

                        <div className="pt-2">
                            <DefaultButton
                                type="submit"
                                label={
                                    loading
                                        ? "Creating Account..."
                                        : "Create New Account"
                                }
                            />
                        </div>
                    </form>

                    <div className="mt-10 pt-6 border-t border-slate-100 text-center">
                        <p className="text-sm text-slate-500">
                            Already have an account?
                            <button
                                type="button"
                                onClick={() => navigate("/")}
                                className="ml-2 font-semibold text-indigo-600 hover:text-indigo-700 transition-colors"
                            >
                                Sign In
                            </button>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register