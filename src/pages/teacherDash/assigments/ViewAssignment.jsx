import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { useAuth } from '../../../context/AuthContext'
import API from '../../../services/api'
import {
    FaArrowLeft,
    FaBookOpen,
    FaCalendarDays,
    FaChalkboardUser,
    FaClipboardList,
    FaClock,
} from 'react-icons/fa6'
import ViewSubmittedRecodes from './ViewSubmittedRecodes'
import SubmitAssignment from './SubmitAssignment'
import ViewMyAnswerSheet from './ViewMyAnswerSheet'

const ViewAssignment = () => {
    const { id } = useParams()
    const token = localStorage.getItem('access_token')
    const { auth } = useAuth()
    const [assignment, setAssigment] = useState(null)
    const [loading, setLoading] = useState(true)



    useEffect(() => {
        const fetchassignment = async () => {
            const res = await API.get(`/learn/assignment-view/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (res.data.success === true) {
                setAssigment(res.data.result)
            }

            setLoading(false)
        }

        if (token && id) fetchassignment()
    }, [token, id])

    const formatDate = (date) => {
        if (!date) {
            return 'No due date'
        }

        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        })
    }

    const formatDay = (day) => {
        if (!day) {
            return ''
        }

        return day.charAt(0).toUpperCase() + day.slice(1)
    }

    const getStatusStyle = (status) => {
        const normalizedStatus = status?.toLowerCase()

        if (normalizedStatus === 'completed') {
            return 'bg-green-50 text-green-700 border-green-200'
        }

        if (normalizedStatus === 'overdue') {
            return 'bg-red-50 text-red-700 border-red-200'
        }

        if (normalizedStatus === 'pending') {
            return 'bg-yellow-50 text-yellow-700 border-yellow-200'
        }

        return 'bg-indigo-50 text-indigo-700 border-indigo-200'
    }

    if (loading) {
        return (
            <div className="min-h-full bg-gray-50 p-4 md:p-6">
                <div className="animate-pulse rounded-2xl border border-gray-200 bg-white p-6">
                    <div className="h-8 w-1/2 rounded bg-gray-200" />
                    <div className="mt-4 h-4 w-full rounded bg-gray-100" />
                    <div className="mt-2 h-4 w-3/4 rounded bg-gray-100" />

                    <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                        {[1, 2, 3, 4].map((item) => {
                            return (
                                <div
                                    key={item}
                                    className="h-20 rounded-xl bg-gray-100"
                                />
                            )
                        })}
                    </div>
                </div>
            </div>
        )
    }

    if (!assignment) {
        return (
            <div className="min-h-full bg-gray-50 p-4 md:p-6">
                <div className="flex min-h-[400px] flex-col items-center justify-center rounded-2xl border border-gray-200 bg-white text-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
                        <FaClipboardList className="text-2xl" />
                    </div>

                    <h2 className="mt-5 text-lg font-bold text-gray-900">
                        Assignment Not Found
                    </h2>

                    <p className="mt-2 text-sm text-gray-500">
                        The assignment you are looking for is not available.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-full bg-gray-50 p-4 md:p-6">
            <div className="">
                <div className="mb-5">
                    <button
                        type="button"
                        onClick={() => window.history.back()}
                        className="flex items-center gap-2 text-sm font-medium text-gray-500 transition hover:text-indigo-600"
                    >
                        <FaArrowLeft className="text-xs" />
                        Back to Assignments
                    </button>
                </div>

                <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
                    <div className="h-2 bg-indigo-600" />

                    <div className="p-6 md:p-8">
                        <div className="flex flex-col gap-5 md:flex-row md:items-start md:justify-between">
                            <div className="flex items-start gap-4">
                                <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                    <FaClipboardList className="text-xl" />
                                </div>

                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900 md:text-3xl">
                                        {assignment.title || 'Untitled Assignment'}
                                    </h1>

                                    <p className="mt-2 text-sm text-gray-500">
                                        Assignment Details
                                    </p>
                                </div>
                            </div>

                            <span
                                className={`w-fit rounded-full border px-4 py-2 text-xs font-semibold ${getStatusStyle(
                                    assignment.status || 'Active'
                                )}`}
                            >
                                {assignment.status || 'Active'}
                            </span>
                        </div>

                        <div className="mt-8">
                            <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                                Description
                            </h2>

                            <p className="mt-3 whitespace-pre-wrap text-sm leading-7 text-gray-600">
                                {assignment.description ||
                                    'No description available for this assignment.'}
                            </p>
                        </div>

                        <div className="mt-8 grid grid-cols-1 gap-4 md:grid-cols-2">
                            {(assignment.subject || assignment.subjectName) && (
                                <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-gray-500">
                                        <FaBookOpen />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-xs text-gray-400">
                                            Subject
                                        </p>

                                        <p className="mt-1 truncate text-sm font-semibold text-gray-800">
                                            {assignment.subject ||
                                                assignment.subjectName}
                                        </p>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-gray-500">
                                    <FaClipboardList />
                                </div>

                                <div className="min-w-0">
                                    <p className="text-xs text-gray-400">
                                        Class
                                    </p>

                                    <p className="mt-1 truncate text-sm font-semibold text-gray-800">
                                        {assignment.class?.name ||
                                            assignment.class?.className ||
                                            'Assigned Class'}
                                    </p>
                                </div>
                            </div>

                            {assignment.teacher && (
                                <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-gray-500">
                                        <FaChalkboardUser />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-xs text-gray-400">
                                            Teacher
                                        </p>

                                        <p className="mt-1 truncate text-sm font-semibold text-gray-800">
                                            {assignment.teacher?.email ||
                                                'Assigned Teacher'}
                                        </p>
                                    </div>
                                </div>
                            )}

                            <div className="flex items-center gap-4 rounded-xl border border-gray-200 bg-gray-50 p-4">
                                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-white text-gray-500">
                                    <FaCalendarDays />
                                </div>

                                <div>
                                    <p className="text-xs text-gray-400">
                                        Due Date
                                    </p>

                                    <p className="mt-1 text-sm font-semibold text-gray-800">
                                        {formatDate(assignment.due_date)}
                                    </p>
                                </div>
                            </div>
                        </div>

                        {assignment.timetable?.length > 0 && (
                            <div className="mt-8 border-t border-gray-100 pt-6">
                                <div className="flex items-center gap-2">
                                    <FaClock className="text-sm text-indigo-500" />

                                    <h2 className="text-sm font-semibold uppercase tracking-wide text-gray-500">
                                        Class Timetable
                                    </h2>
                                </div>

                                <div className="mt-4 grid grid-cols-1 gap-3 md:grid-cols-2">
                                    {assignment.timetable.map(
                                        (schedule, index) => {
                                            return (
                                                <div
                                                    key={
                                                        schedule._id || index
                                                    }
                                                    className="flex items-center justify-between rounded-xl border border-gray-200 bg-gray-50 px-4 py-3"
                                                >
                                                    <div>
                                                        <p className="text-sm font-semibold text-gray-800">
                                                            {formatDay(
                                                                schedule.day
                                                            )}
                                                        </p>

                                                        <p className="mt-1 text-xs text-gray-500">
                                                            {
                                                                schedule.startTime
                                                            }{' '}
                                                            -{' '}
                                                            {
                                                                schedule.endTime
                                                            }
                                                        </p>
                                                    </div>

                                                    <FaClock className="text-sm text-gray-300" />
                                                </div>
                                            )
                                        }
                                    )}
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                {
                    auth.role === 'student' ?
                        <div className="mt-8">
                            <ViewMyAnswerSheet
                                token={token}
                                assignment={assignment}
                            />
                        </div>
                        :
                        <div className="mt-8">
                        </div>
                }
                {
                    auth.role === 'super_admin' || auth.role === 'institute_admin' || auth.role === 'teacher' ?
                        <div className="mt-8">
                            <ViewSubmittedRecodes
                                token={token}
                                assignment={assignment}
                            />
                        </div>
                        :
                        <div className="mt-8">
                            <SubmitAssignment
                                token={token}
                                assignment={assignment}
                            />
                        </div>
                }

            </div>
        </div>
    )
}

export default ViewAssignment