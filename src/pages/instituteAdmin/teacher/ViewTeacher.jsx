import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
    FaArrowLeft,
    FaEnvelope,
    FaPhone,
    FaIdCard,
    FaCalendar,
    FaLocationDot,
    FaChalkboardUser,
    FaCircleInfo,
    FaUserTie
} from 'react-icons/fa6'
import API from '../../../services/api'
import UpdateTeacher from './UpdateTeacher'

const ViewTeacher = () => {
    const { id } = useParams()
    const token = localStorage.getItem('access_token')
    const [teacher, setTeacher] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchTeacher = async () => {
            const res = await API.get(`/teacher/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (res.data.success === true) {
                setTeacher(res.data.result)
            }

            setLoading(false)
        }

        if (token && id) {
            fetchTeacher()
        }
    }, [token, id])

    if (loading) {
        return (
            <div className="w-full min-h-[60vh] bg-white flex items-center justify-center px-4">
                <div className="flex items-center gap-3 text-indigo-600">
                    <div className="w-5 h-5 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
                    <span className="text-sm font-medium">
                        Loading teacher...
                    </span>
                </div>
            </div>
        )
    }

    if (!teacher) {
        return (
            <div className="w-full min-h-[60vh] bg-white flex items-center justify-center px-4">
                <div className="text-center">
                    <div className="w-14 h-14 mx-auto rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                        <FaUserTie size={22} />
                    </div>

                    <h2 className="mt-4 text-lg font-semibold text-gray-800">
                        Teacher not found
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        The requested teacher could not be found.
                    </p>
                </div>
            </div>
        )
    }

    const profile = teacher.profile
    const user = teacher.user

    return (
        <div className="">
            <div className="w-full bg-white">

                <div className="w-full px-4 py-5 sm:px-6 lg:px-8">

                    <div className="w-full">

                        <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">

                            <div className="flex items-center gap-3 min-w-0">

                                <button
                                    type="button"
                                    onClick={() => window.history.back()}
                                    className="w-10 h-10 shrink-0 rounded-xl border border-gray-200 flex items-center justify-center text-gray-600 hover:bg-indigo-50 hover:text-indigo-600 hover:border-indigo-200 transition"
                                >
                                    <FaArrowLeft size={15} />
                                </button>

                                <div className="min-w-0">
                                    <h1 className="text-xl sm:text-2xl font-bold text-gray-900 truncate">
                                        Teacher Profile
                                    </h1>

                                    <p className="text-sm text-gray-500 mt-1">
                                        Teacher information and account details
                                    </p>
                                </div>

                            </div>

                            <span
                                className={`self-start sm:self-auto inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${teacher.status === 'active'
                                    ? 'bg-green-50 text-green-600'
                                    : 'bg-gray-100 text-gray-600'
                                    }`}
                            >
                                {teacher.status}
                            </span>

                        </div>

                        <div className="mt-6 grid grid-cols-1 xl:grid-cols-3 gap-5">

                            <div className="xl:col-span-2 rounded-2xl border border-gray-200 overflow-hidden">

                                <div className="bg-indigo-600 px-5 sm:px-7 py-6">

                                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">

                                        <div className="w-16 h-16 shrink-0 rounded-2xl bg-white flex items-center justify-center text-indigo-600 text-2xl font-bold">
                                            {profile?.fname?.charAt(0)?.toUpperCase() ||
                                                user?.email?.charAt(0)?.toUpperCase()}
                                        </div>

                                        <div className="min-w-0 text-white">

                                            <h2 className="text-xl sm:text-2xl font-bold break-words">
                                                {[
                                                    profile?.fname,
                                                    profile?.mname,
                                                    profile?.lname
                                                ]
                                                    .filter(Boolean)
                                                    .join(' ') || 'Teacher'}
                                            </h2>

                                            <p className="text-sm text-indigo-100 mt-1 break-all">
                                                {user?.email}
                                            </p>

                                        </div>

                                    </div>

                                </div>

                                <div className="p-5 sm:p-7">

                                    <div className="flex items-center gap-3 mb-6">

                                        <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                            <FaCircleInfo size={15} />
                                        </div>

                                        <div>
                                            <h3 className="text-base font-semibold text-gray-800">
                                                Personal Information
                                            </h3>

                                            <p className="text-xs text-gray-500 mt-0.5">
                                                Basic teacher details
                                            </p>
                                        </div>

                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                                        <div>
                                            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                                                First Name
                                            </p>

                                            <p className="mt-1.5 text-sm font-medium text-gray-800 break-words">
                                                {profile?.fname || '-'}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                                                Middle Name
                                            </p>

                                            <p className="mt-1.5 text-sm font-medium text-gray-800 break-words">
                                                {profile?.mname || '-'}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                                                Last Name
                                            </p>

                                            <p className="mt-1.5 text-sm font-medium text-gray-800 break-words">
                                                {profile?.lname || '-'}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                                                NIC Number
                                            </p>

                                            <p className="mt-1.5 text-sm font-medium text-gray-800 break-words">
                                                {profile?.nic || '-'}
                                            </p>
                                        </div>

                                        <div className="flex items-start gap-3">

                                            <div className="w-9 h-9 shrink-0 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                                <FaPhone size={13} />
                                            </div>

                                            <div className="min-w-0">
                                                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                                                    Mobile
                                                </p>

                                                <p className="mt-1 text-sm font-medium text-gray-800 break-all">
                                                    {profile?.mobile || '-'}
                                                </p>
                                            </div>

                                        </div>

                                        <div className="flex items-start gap-3">

                                            <div className="w-9 h-9 shrink-0 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                                <FaCalendar size={13} />
                                            </div>

                                            <div className="min-w-0">
                                                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                                                    Date of Birth
                                                </p>

                                                <p className="mt-1 text-sm font-medium text-gray-800">
                                                    {profile?.dob
                                                        ? new Date(profile.dob).toLocaleDateString()
                                                        : '-'}
                                                </p>
                                            </div>

                                        </div>

                                    </div>

                                    <div className="mt-6 pt-6 border-t border-gray-100">

                                        <div className="flex items-start gap-3">

                                            <div className="w-9 h-9 shrink-0 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                                <FaLocationDot size={13} />
                                            </div>

                                            <div className="min-w-0">
                                                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                                                    Address
                                                </p>

                                                <p className="mt-1 text-sm text-gray-700 leading-6 break-words">
                                                    {profile?.address || '-'}
                                                </p>
                                            </div>

                                        </div>

                                    </div>

                                    <div className="mt-6 pt-6 border-t border-gray-100">

                                        <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                                            Teacher Bio
                                        </p>

                                        <p className="mt-2 text-sm text-gray-700 leading-6 break-words">
                                            {profile?.bio || 'No bio available.'}
                                        </p>

                                    </div>

                                </div>

                            </div>

                            <div className="space-y-5">

                                <div className="rounded-2xl border border-gray-200 p-5 sm:p-6">

                                    <div className="flex items-center gap-3 mb-6">

                                        <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                            <FaChalkboardUser size={16} />
                                        </div>

                                        <div>
                                            <h3 className="text-base font-semibold text-gray-800">
                                                Teacher Details
                                            </h3>

                                            <p className="text-xs text-gray-500 mt-0.5">
                                                Teacher identification
                                            </p>
                                        </div>

                                    </div>

                                    <div className="space-y-5">

                                        <div className="flex items-start gap-3">

                                            <div className="w-9 h-9 shrink-0 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                                <FaIdCard size={14} />
                                            </div>

                                            <div className="min-w-0">
                                                <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">
                                                    Teacher ID
                                                </p>

                                                <p className="mt-1 text-sm font-semibold text-gray-800 break-all">
                                                    {teacher.teacher_id || '-'}
                                                </p>
                                            </div>

                                        </div>

                                        <div className="flex items-start gap-3">

                                            <div className="w-9 h-9 shrink-0 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                                <FaEnvelope size={14} />
                                            </div>

                                            <div className="min-w-0">
                                                <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">
                                                    Email
                                                </p>

                                                <p className="mt-1 text-sm font-medium text-gray-800 break-all">
                                                    {user?.email || '-'}
                                                </p>
                                            </div>

                                        </div>

                                    </div>

                                </div>

                                <div className="rounded-2xl border border-gray-200 p-5 sm:p-6">

                                    <h3 className="text-base font-semibold text-gray-800">
                                        Account Information
                                    </h3>

                                    <div className="mt-5 space-y-4">

                                        <div className="flex items-center justify-between gap-4">

                                            <span className="text-sm text-gray-500">
                                                Status
                                            </span>

                                            <span
                                                className={`text-xs font-semibold px-3 py-1 rounded-full ${teacher.status === 'active'
                                                    ? 'bg-green-50 text-green-600'
                                                    : 'bg-gray-100 text-gray-600'
                                                    }`}
                                            >
                                                {teacher.status}
                                            </span>

                                        </div>

                                        <div className="flex items-center justify-between gap-4">

                                            <span className="text-sm text-gray-500">
                                                Created
                                            </span>

                                            <span className="text-sm font-medium text-gray-700">
                                                {teacher.createdAt
                                                    ? new Date(
                                                        teacher.createdAt
                                                    ).toLocaleDateString()
                                                    : '-'}
                                            </span>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

            </div>
            <div className="mt-4">
                <UpdateTeacher
                    token={token}
                    teacher={teacher}
                />
            </div>
        </div>
    )
}

export default ViewTeacher