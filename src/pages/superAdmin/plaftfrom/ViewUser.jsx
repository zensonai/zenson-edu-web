import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../../../services/api'
import {
    FiMail,
    FiPhone,
    FiMapPin,
    FiUser,
    FiCalendar,
    FiShield,
    FiClock,
    FiCreditCard
} from 'react-icons/fi'
import Toast from '../../../component/Toast/Toast'
import { useAuth } from '../../../context/AuthContext'


const ViewUser = () => {
    const { id } = useParams()
    const token = localStorage.getItem('access_token')
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false)
    const { auth } = useAuth()

    useEffect(() => {
        const fetchuserdata = async () => {
            try {
                const res = await API.get(`/admin/fetch-user/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (res.data.success === true) {
                    setUser(res.data.result)
                }
            } catch (err) {
                console.log(err)
            }
        }

        if (token) {
            fetchuserdata()
        }
    }, [id, token])

    if (!user) {
        return (
            <div className="flex justify-center items-center h-96">
                <p className="text-gray-500">Loading user...</p>
            </div>
        )
    }

    const HeadleUpdateUserStatus = async (e) => {
        e.preventDefault();
        setLoading(true)

        try {
            const res = await API.patch(`/admin/update-user-status/${id}`, {}, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if (res.data.success === true) {
                setToast({
                    success: true,
                    message: res.data.message,
                });
                setTimeout(() => window.location.reload(), 3000);
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

    const profile = user.getprofile
    const account = user.tragetuser

    return (
        <div className="w-full md:p-0 bg-gray-50 min-h-screen">

            {toast && (
                <div className="fixed top-8 right-8 z-50">
                    <Toast
                        success={toast.success}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}
            <div className="bg-white border border-gray-200">

                <div className="bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500 h-36 md:h-48 relative">

                    <div className="absolute -bottom-16 left-6">
                        {
                            profile?.profle_img ? (
                                <img
                                    src={`${import.meta.env.VITE_APP_API_FILES}/uploads/profile/${profile.profle_img}`}
                                    alt=""
                                    className="rounded-full w-32 h-32 md:w-40 md:h-40 border-4 border-white object-cover bg-white"
                                />
                            ) : (
                                <div className="w-32 h-32 md:w-40 md:h-40 bg-white border-4 border-white flex items-center justify-center">
                                    <FiUser size={60} className="text-gray-400" />
                                </div>
                            )
                        }
                    </div>

                </div>

                <div className="pt-20 md:pt-24 px-6 pb-8">

                    <div className="flex flex-col lg:flex-row lg:justify-between gap-6">

                        <div>
                            <div>
                                {auth?.user?.email === account?.email ? (
                                    <div className="w-full bg-gray-100 border border-gray-300 text-gray-600 text-center font-semibold py-3 px-5">
                                        ⚠️ You cannot update your own account status.
                                    </div>
                                ) : (
                                    <button
                                        onClick={HeadleUpdateUserStatus}
                                        disabled={loading}
                                        className={`w-full py-3 px-5 font-semibold text-white transition-all duration-300 active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed ${account?.account_stats
                                                ? "bg-red-600 hover:bg-red-700"
                                                : "bg-green-600 hover:bg-green-700"
                                            }`}
                                    >
                                        {loading ? (
                                            <div className="flex items-center justify-center gap-3">
                                                <svg
                                                    className="w-5 h-5 animate-spin"
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                >
                                                    <circle
                                                        className="opacity-25"
                                                        cx="12"
                                                        cy="12"
                                                        r="10"
                                                        stroke="currentColor"
                                                        strokeWidth="4"
                                                    />
                                                    <path
                                                        className="opacity-75"
                                                        fill="currentColor"
                                                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                                    />
                                                </svg>
                                                Updating...
                                            </div>
                                        ) : account?.account_stats ? (
                                            <div className="flex items-center justify-center gap-2">
                                                <span className="text-lg">🔒</span>
                                                Disable Account
                                            </div>
                                        ) : (
                                            <div className="flex items-center justify-center gap-2">
                                                <span className="text-lg">✅</span>
                                                Enable Account
                                            </div>
                                        )}
                                    </button>
                                )}
                            </div>

                            <h1 className="text-3xl font-bold text-gray-800">
                                {profile?.fname} {profile?.mname} {profile?.lname}
                            </h1>

                            <p className="text-gray-500 mt-2">
                                {account?.email}
                            </p>

                            <div className="flex flex-wrap gap-3 mt-4">

                                <span className="bg-indigo-100 text-indigo-700 px-4 py-1 text-sm font-semibold">
                                    {account?.role?.role}
                                </span>

                                <span className={`${account?.account_stats ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'} px-4 py-1 text-sm font-semibold`}>
                                    {account?.account_stats ? 'Active' : 'Disabled'}
                                </span>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

            <div className="grid grid-cols-1 xl:grid-cols-3 gap-6 mt-6">

                <div className="xl:col-span-2 space-y-6">

                    <div className="bg-white border border-gray-200 p-6">

                        <h2 className="text-xl font-bold mb-6">
                            Personal Information
                        </h2>

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                            <div className="flex items-center gap-4">
                                <FiMail className="text-indigo-600" size={20} />
                                <div>
                                    <p className="text-gray-400 text-sm">Email</p>
                                    <p className="font-medium">{account?.email}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <FiPhone className="text-green-600" size={20} />
                                <div>
                                    <p className="text-gray-400 text-sm">Mobile</p>
                                    <p className="font-medium">{profile?.mobile}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <FiCreditCard className="text-orange-500" size={20} />
                                <div>
                                    <p className="text-gray-400 text-sm">NIC</p>
                                    <p className="font-medium">{profile?.nic}</p>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <FiCalendar className="text-pink-500" size={20} />
                                <div>
                                    <p className="text-gray-400 text-sm">Date of Birth</p>
                                    <p className="font-medium">
                                        {new Date(profile?.dob).toLocaleDateString()}
                                    </p>
                                </div>
                            </div>

                            <div className="md:col-span-2 flex items-start gap-4">
                                <FiMapPin className="text-red-500 mt-1" size={20} />
                                <div>
                                    <p className="text-gray-400 text-sm">Address</p>
                                    <p className="font-medium whitespace-pre-line">
                                        {profile?.address}
                                    </p>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className="bg-white border border-gray-200 p-6">

                        <h2 className="text-xl font-bold mb-5">
                            Biography
                        </h2>

                        <p className="leading-8 text-gray-600 whitespace-pre-line">
                            {profile?.bio}
                        </p>

                    </div>

                </div>

                <div className="space-y-6">

                    <div className="bg-white border border-gray-200 p-6">

                        <h2 className="text-xl font-bold mb-6">
                            Account Details
                        </h2>

                        <div className="space-y-5">

                            <div className="flex justify-between items-center">
                                <span className="text-gray-500">User ID</span>
                                <span className="font-medium text-right break-all">
                                    {account?._id}
                                </span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-gray-500">Role</span>
                                <span className="font-semibold">
                                    {account?.role?.role}
                                </span>
                            </div>

                            <div className="flex justify-between items-center">
                                <span className="text-gray-500">Status</span>
                                <span className={`${account?.account_stats ? 'text-green-600' : 'text-red-600'} font-semibold`}>
                                    {account?.account_stats ? 'Active' : 'Disabled'}
                                </span>
                            </div>

                        </div>

                    </div>

                    <div className="bg-white border border-gray-200 p-6">

                        <h2 className="text-xl font-bold mb-6">
                            Activity
                        </h2>

                        <div className="space-y-5">

                            <div className="flex gap-3">
                                <FiClock className="text-indigo-600 mt-1" />
                                <div>
                                    <p className="text-gray-400 text-sm">
                                        Last Login
                                    </p>
                                    <p className="font-medium">
                                        {new Date(account?.last_login).toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <FiCalendar className="text-green-600 mt-1" />
                                <div>
                                    <p className="text-gray-400 text-sm">
                                        Account Created
                                    </p>
                                    <p className="font-medium">
                                        {new Date(account?.createdAt).toLocaleString()}
                                    </p>
                                </div>
                            </div>

                            <div className="flex gap-3">
                                <FiShield className="text-orange-500 mt-1" />
                                <div>
                                    <p className="text-gray-400 text-sm">
                                        Last Updated
                                    </p>
                                    <p className="font-medium">
                                        {new Date(account?.updatedAt).toLocaleString()}
                                    </p>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    )
}

export default ViewUser