import React, { useEffect, useMemo, useState } from 'react'
import API from '../../../services/api'
import {
    FaMagnifyingGlass,
    FaClipboardList,
    FaCalendarDays,
    FaBookOpen,
    FaArrowRight,
    FaClock,
    FaChalkboardUser,
} from 'react-icons/fa6'

const MyAssignments = () => {
    const token = localStorage.getItem('access_token')
    const [myassignments, setMyassignments] = useState([])
    const [search, setSearch] = useState('')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchmyassignments = async () => {
            const res = await API.get('/learn/student-assigments', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (res.data.success === true) {
                setMyassignments(res.data.result)
            }

            setLoading(false)
        }

        if (token) fetchmyassignments()
    }, [token])

    const filteredAssignments = useMemo(() => {
        return myassignments.filter((assignment) => {
            const searchValue = search.toLowerCase()

            const timetableSearch = assignment.timetable?.some((schedule) => {
                return (
                    schedule.day?.toLowerCase().includes(searchValue) ||
                    schedule.startTime?.toLowerCase().includes(searchValue) ||
                    schedule.endTime?.toLowerCase().includes(searchValue)
                )
            })

            return (
                assignment.title?.toLowerCase().includes(searchValue) ||
                assignment.description?.toLowerCase().includes(searchValue) ||
                assignment.subject?.toLowerCase().includes(searchValue) ||
                assignment.subjectName?.toLowerCase().includes(searchValue) ||
                assignment.class?.name?.toLowerCase().includes(searchValue) ||
                assignment.class?.className?.toLowerCase().includes(searchValue) ||
                assignment.teacher?.email?.toLowerCase().includes(searchValue) ||
                timetableSearch
            )
        })
    }, [myassignments, search])

    const getStatus = (assignment) => {
        if (assignment.status) {
            return assignment.status
        }

        if (assignment.due_date) {
            return new Date(assignment.due_date) < new Date()
                ? 'Overdue'
                : 'Active'
        }

        return 'Active'
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

    return (
        <div className="min-h-full bg-gray-50 p-4 md:p-6">
            <div className="rounded-2xl border border-gray-200 bg-white shadow-sm">
                <div className="border-b border-gray-200 p-5 md:p-6">
                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                        <div>
                            <div className="flex items-center gap-3">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                    <FaClipboardList className="text-lg" />
                                </div>

                                <div>
                                    <h1 className="text-2xl font-bold text-gray-900">
                                        My Assignments
                                    </h1>

                                    <p className="mt-1 text-sm text-gray-500">
                                        View and manage your assigned coursework
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center gap-2 rounded-xl border border-gray-200 bg-gray-50 px-4 py-2.5">
                            <FaClipboardList className="text-sm text-gray-400" />

                            <span className="text-sm font-medium text-gray-600">
                                {filteredAssignments.length} Assignments
                            </span>
                        </div>
                    </div>

                    <div className="mt-6">
                        <div className="relative max-w-xl">
                            <FaMagnifyingGlass className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-gray-400" />

                            <input
                                type="text"
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                placeholder="Search assignments, subjects, classes, timetable..."
                                className="w-full rounded-xl border border-gray-200 bg-gray-50 py-3 pl-11 pr-4 text-sm text-gray-800 outline-none transition focus:border-indigo-500 focus:bg-white focus:ring-2 focus:ring-indigo-100"
                            />
                        </div>
                    </div>
                </div>

                <div className="p-5 md:p-6">
                    {loading ? (
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                            {[1, 2, 3, 4].map((item) => {
                                return (
                                    <div
                                        key={item}
                                        className="animate-pulse overflow-hidden rounded-2xl border border-gray-200 bg-white"
                                    >
                                        <div className="h-2 bg-gray-200" />

                                        <div className="p-5">
                                            <div className="h-5 w-3/4 rounded bg-gray-200" />
                                            <div className="mt-3 h-4 w-full rounded bg-gray-100" />
                                            <div className="mt-2 h-4 w-2/3 rounded bg-gray-100" />
                                            <div className="mt-6 h-10 rounded bg-gray-100" />
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    ) : filteredAssignments.length > 0 ? (
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-3 2xl:grid-cols-4">
                            {filteredAssignments.map((data, index) => {
                                const status = getStatus(data)

                                return (
                                    <div
                                        key={data._id || index}
                                        className="group overflow-hidden rounded-2xl border border-gray-200 bg-white transition duration-300 hover:-translate-y-1 hover:border-indigo-200 hover:shadow-lg"
                                    >
                                        <div className="h-1.5 bg-indigo-600" />

                                        <div className="p-5">
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                                    <FaClipboardList />
                                                </div>

                                                <span
                                                    className={`rounded-full border px-3 py-1 text-xs font-semibold ${getStatusStyle(status)}`}
                                                >
                                                    {status}
                                                </span>
                                            </div>

                                            <div className="mt-5">
                                                <h2 className="line-clamp-2 text-lg font-bold text-gray-900">
                                                    {data.title || 'Untitled Assignment'}
                                                </h2>

                                                <p className="mt-2 line-clamp-2 min-h-[40px] text-sm leading-5 text-gray-500">
                                                    {data.description || 'No description available for this assignment.'}
                                                </p>
                                            </div>

                                            <div className="mt-5 space-y-3 border-t border-gray-100 pt-4">
                                                {(data.subject || data.subjectName) && (
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-gray-500">
                                                            <FaBookOpen className="text-xs" />
                                                        </div>

                                                        <div className="min-w-0">
                                                            <p className="text-xs text-gray-400">
                                                                Subject
                                                            </p>

                                                            <p className="truncate text-sm font-medium text-gray-700">
                                                                {data.subject || data.subjectName}
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}

                                                {data.class && (
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-gray-500">
                                                            <FaClipboardList className="text-xs" />
                                                        </div>

                                                        <div className="min-w-0">
                                                            <p className="text-xs text-gray-400">
                                                                Class
                                                            </p>

                                                            <p className="truncate text-sm font-medium text-gray-700">
                                                                {data.class?.name ||
                                                                    data.class?.className ||
                                                                    'Assigned Class'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}

                                                {data.teacher && (
                                                    <div className="flex items-center gap-3">
                                                        <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-gray-500">
                                                            <FaChalkboardUser className="text-xs" />
                                                        </div>

                                                        <div className="min-w-0">
                                                            <p className="text-xs text-gray-400">
                                                                Teacher
                                                            </p>

                                                            <p className="truncate text-sm font-medium text-gray-700">
                                                                {data.teacher?.email || 'Assigned Teacher'}
                                                            </p>
                                                        </div>
                                                    </div>
                                                )}

                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-gray-500">
                                                        <FaClock className="text-xs" />
                                                    </div>

                                                    <div>
                                                        <p className="text-xs text-gray-400">
                                                            Class Time
                                                        </p>

                                                        <p className="text-sm font-medium text-gray-700">
                                                            {data.timetable?.length > 0
                                                                ? `${data.timetable[0].startTime} - ${data.timetable[0].endTime}`
                                                                : 'No class time'}
                                                        </p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-3">
                                                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-gray-50 text-gray-500">
                                                        <FaCalendarDays className="text-xs" />
                                                    </div>

                                                    <div>
                                                        <p className="text-xs text-gray-400">
                                                            Due Date
                                                        </p>

                                                        <p className="text-sm font-medium text-gray-700">
                                                            {formatDate(data.due_date)}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>

                                            {data.timetable?.length > 0 && (
                                                <div className="mt-5 border-t border-gray-100 pt-4">
                                                    <div className="mb-3 flex items-center gap-2">
                                                        <FaClock className="text-xs text-indigo-500" />

                                                        <p className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                            Class Timetable
                                                        </p>
                                                    </div>

                                                    <div className="space-y-2">
                                                        {data.timetable.map((schedule, scheduleIndex) => {
                                                            return (
                                                                <div
                                                                    key={schedule._id || scheduleIndex}
                                                                    className="flex items-center justify-between rounded-xl bg-gray-50 px-3 py-2.5"
                                                                >
                                                                    <div>
                                                                        <p className="text-xs font-semibold text-gray-700">
                                                                            {formatDay(schedule.day)}
                                                                        </p>

                                                                        <p className="mt-0.5 text-xs text-gray-400">
                                                                            {schedule.startTime} - {schedule.endTime}
                                                                        </p>
                                                                    </div>

                                                                    <FaClock className="text-xs text-gray-300" />
                                                                </div>
                                                            )
                                                        })}
                                                    </div>
                                                </div>
                                            )}

                                            <a href={`../assignment/view/${data._id}`}>
                                                <button
                                                    type="button"
                                                    className="mt-5 flex w-full items-center justify-between rounded-xl bg-gray-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-indigo-600"
                                                >
                                                    <span>View Assignment</span>

                                                    <FaArrowRight className="text-xs transition-transform group-hover:translate-x-1" />
                                                </button>
                                            </a>
                                        </div>
                                    </div>
                                )
                            })}
                        </div>
                    ) : (
                        <div className="flex min-h-[300px] flex-col items-center justify-center text-center">
                            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gray-100 text-gray-400">
                                <FaClipboardList className="text-2xl" />
                            </div>

                            <h2 className="mt-5 text-lg font-bold text-gray-900">
                                {search ? 'No assignments found' : 'No assignments available'}
                            </h2>

                            <p className="mt-2 max-w-md text-sm text-gray-500">
                                {search
                                    ? `We couldn't find any assignments matching "${search}".`
                                    : 'You currently have no assignments assigned to you.'}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default MyAssignments