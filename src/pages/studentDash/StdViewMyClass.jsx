import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {
    FaArrowLeft,
    FaChalkboardUser,
    FaCircleInfo,
    FaCalendar,
    FaClock,
    FaEnvelope,
    FaIdCard,
    FaUserGraduate,
    FaUserTie
} from 'react-icons/fa6'
import API from '../../services/api'
import DefaultButton from '../../component/Buttons/DefaultButton'

const StdViewMyClass = () => {
    const { id } = useParams()
    const token = localStorage.getItem('access_token')

    const [classData, setClassData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [currentTime, setCurrentTime] = useState(new Date())
    const [attendanceLoading, setAttendanceLoading] = useState(false)
    const [attendanceMessage, setAttendanceMessage] = useState('')
    const [attendanceSuccess, setAttendanceSuccess] = useState(false)

    useEffect(() => {
        const fetchClass = async () => {
            try {
                const res = await API.get(`/class/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (res.data.success === true) {
                    setClassData(res.data.result)
                }
            } catch (error) {
                setClassData(null)
            } finally {
                setLoading(false)
            }
        }

        if (token && id) {
            fetchClass()
        }
    }, [token, id])

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentTime(new Date())
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    const handleAttendance = async () => {
        if (!classData?._id || attendanceLoading) {
            return
        }

        setAttendanceLoading(true)
        setAttendanceMessage('')
        setAttendanceSuccess(false)

        try {
            const res = await API.post(
                `/class/create-attendance/${classData._id}`,
                {},
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            if (res.data.success === true) {
                setAttendanceSuccess(true)
                setAttendanceMessage(
                    res.data.message || 'Attendance marked successfully.'
                )
            } else {
                setAttendanceMessage(
                    res.data.message || 'Unable to mark attendance.'
                )
            }
        } catch (error) {
            setAttendanceMessage(
                error?.response?.data?.message ||
                'Unable to mark attendance.'
            )
        } finally {
            setAttendanceLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="w-full min-h-[60vh] bg-white flex items-center justify-center px-4">
                <div className="flex items-center gap-3 text-indigo-600">
                    <div className="w-5 h-5 border-2 border-indigo-200 border-t-indigo-600 rounded-full animate-spin" />
                    <span className="text-sm font-medium">
                        Loading class...
                    </span>
                </div>
            </div>
        )
    }

    if (!classData) {
        return (
            <div className="w-full min-h-[60vh] bg-white flex items-center justify-center px-4">
                <div className="text-center">
                    <div className="w-14 h-14 mx-auto rounded-full bg-indigo-50 flex items-center justify-center text-indigo-600">
                        <FaChalkboardUser size={22} />
                    </div>

                    <h2 className="mt-4 text-lg font-semibold text-gray-800">
                        Class not found
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        The requested class could not be found.
                    </p>
                </div>
            </div>
        )
    }

    const teacher = classData.teacher
    const teacherProfile = teacher?.profile
    const students = classData.students || []

    const teacherName = [
        teacherProfile?.fname,
        teacherProfile?.mname,
        teacherProfile?.lname
    ]
        .filter(Boolean)
        .join(' ') || teacher?.email || 'Teacher'

    const classDate = classData.time
        ? new Date(classData.time)
        : null

    const classDateText =
        classDate && !isNaN(classDate.getTime())
            ? classDate.toLocaleDateString()
            : '-'

    const classTimeText =
        classDate && !isNaN(classDate.getTime())
            ? classDate.toLocaleTimeString([], {
                hour: '2-digit',
                minute: '2-digit'
            })
            : '-'

    const getAttendanceStatus = () => {
        if (!classData.time) {
            return {
                type: 'unavailable',
                message: 'Class time is not available.'
            }
        }

        if (
            !classData.timetable?.startTime ||
            !classData.timetable?.endTime
        ) {
            return {
                type: 'unavailable',
                message: 'Class timetable is not available.'
            }
        }

        const baseDate = new Date(classData.time)

        if (isNaN(baseDate.getTime())) {
            return {
                type: 'unavailable',
                message: 'Class time is not available.'
            }
        }

        const [startHour, startMinute] = classData.timetable.startTime
            .split(':')
            .map(Number)

        const [endHour, endMinute] = classData.timetable.endTime
            .split(':')
            .map(Number)

        const classStart = new Date(baseDate)
        classStart.setHours(startHour, startMinute, 0, 0)

        const classEnd = new Date(baseDate)
        classEnd.setHours(endHour, endMinute, 0, 0)

        if (classEnd <= classStart) {
            classEnd.setDate(classEnd.getDate() + 1)
        }

        const attendanceEnd = new Date(
            classEnd.getTime() + 30 * 60 * 1000
        )

        if (currentTime < classStart) {
            return {
                type: 'not-started',
                message: 'Class is not yet started. You cannot make attendance.'
            }
        }

        if (currentTime > attendanceEnd) {
            return {
                type: 'ended',
                message: 'Attendance time has ended.'
            }
        }

        return {
            type: 'available',
            classStart,
            classEnd,
            attendanceEnd
        }
    }

    const attendanceStatus = getAttendanceStatus()

    return (
        <div>
            <div className="w-full bg-white">
                <div className="w-full px-4 py-5 sm:px-6 lg:px-8">

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
                                    Class Details
                                </h1>

                                <p className="text-sm text-gray-500 mt-1">
                                    Class schedule, teacher and student information
                                </p>
                            </div>

                        </div>

                        <span
                            className={`self-start sm:self-auto inline-flex items-center px-3 py-1.5 rounded-full text-xs font-semibold ${classData.status === 'active'
                                    ? 'bg-green-50 text-green-600'
                                    : 'bg-gray-100 text-gray-600'
                                }`}
                        >
                            {classData.status}
                        </span>

                    </div>

                    <div className="mt-6 grid grid-cols-1 xl:grid-cols-3 gap-5">

                        <div className="xl:col-span-2 space-y-5">

                            <div className="rounded-2xl border border-gray-200 overflow-hidden">

                                <div className="bg-indigo-600 px-5 sm:px-7 py-6">

                                    <div className="flex flex-col sm:flex-row sm:items-center gap-4">

                                        <div className="w-16 h-16 shrink-0 rounded-2xl bg-white flex items-center justify-center text-indigo-600 text-2xl font-bold">
                                            <FaChalkboardUser />
                                        </div>

                                        <div className="min-w-0 text-white">

                                            <h2 className="text-xl sm:text-2xl font-bold break-words">
                                                Class
                                            </h2>

                                            <p className="text-sm text-indigo-100 mt-1 break-all">
                                                {classData._id}
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
                                                Class Information
                                            </h3>

                                            <p className="text-xs text-gray-500 mt-0.5">
                                                Schedule and class details
                                            </p>
                                        </div>

                                    </div>

                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">

                                        <div className="flex items-start gap-3">

                                            <div className="w-9 h-9 shrink-0 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                                <FaCalendar size={13} />
                                            </div>

                                            <div className="min-w-0">
                                                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                                                    Date
                                                </p>

                                                <p className="mt-1 text-sm font-medium text-gray-800">
                                                    {classDateText}
                                                </p>
                                            </div>

                                        </div>

                                        <div className="flex items-start gap-3">

                                            <div className="w-9 h-9 shrink-0 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                                <FaClock size={13} />
                                            </div>

                                            <div className="min-w-0">
                                                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                                                    Time
                                                </p>

                                                <p className="mt-1 text-sm font-medium text-gray-800">
                                                    {classTimeText}
                                                </p>
                                            </div>

                                        </div>

                                        <div className="flex items-start gap-3">

                                            <div className="w-9 h-9 shrink-0 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                                <FaClock size={13} />
                                            </div>

                                            <div className="min-w-0">
                                                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                                                    Start Time
                                                </p>

                                                <p className="mt-1 text-sm font-medium text-gray-800">
                                                    {classData.timetable?.startTime || '-'}
                                                </p>
                                            </div>

                                        </div>

                                        <div className="flex items-start gap-3">

                                            <div className="w-9 h-9 shrink-0 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                                <FaClock size={13} />
                                            </div>

                                            <div className="min-w-0">
                                                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                                                    End Time
                                                </p>

                                                <p className="mt-1 text-sm font-medium text-gray-800">
                                                    {classData.timetable?.endTime || '-'}
                                                </p>
                                            </div>

                                        </div>

                                    </div>

                                    <div className="mt-6 pt-6 border-t border-gray-100">

                                        <div className="flex items-center justify-between gap-4">

                                            <div>
                                                <p className="text-xs font-medium text-gray-400 uppercase tracking-wide">
                                                    Weekly Class
                                                </p>

                                                <p className="mt-1 text-sm text-gray-700">
                                                    {classData.continue_class
                                                        ? 'This class repeats every week.'
                                                        : 'This is a single class.'}
                                                </p>
                                            </div>

                                            <span
                                                className={`text-xs font-semibold px-3 py-1.5 rounded-full ${classData.continue_class
                                                        ? 'bg-indigo-50 text-indigo-600'
                                                        : 'bg-gray-100 text-gray-600'
                                                    }`}
                                            >
                                                {classData.continue_class
                                                    ? 'Weekly'
                                                    : 'One Time'}
                                            </span>

                                        </div>

                                    </div>

                                </div>

                            </div>

                            <div className="rounded-2xl border border-gray-200 p-5 sm:p-7">

                                <div className="flex items-center gap-3 mb-6">

                                    <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                        <FaUserGraduate size={15} />
                                    </div>

                                    <div>
                                        <h3 className="text-base font-semibold text-gray-800">
                                            Students
                                        </h3>

                                        <p className="text-xs text-gray-500 mt-0.5">
                                            Students assigned to this class
                                        </p>
                                    </div>

                                </div>

                                {students.length === 0 ? (
                                    <div className="py-8 text-center text-sm text-gray-500">
                                        No students assigned to this class.
                                    </div>
                                ) : (
                                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">

                                        {students.map((student, index) => {

                                            const profile = student.profile

                                            const name = [
                                                profile?.fname,
                                                profile?.mname,
                                                profile?.lname
                                            ]
                                                .filter(Boolean)
                                                .join(' ') ||
                                                student.email ||
                                                'Student'

                                            return (
                                                <div
                                                    key={student._id || index}
                                                    className="rounded-xl border border-gray-100 p-4"
                                                >

                                                    <div className="flex items-center gap-3">

                                                        <div className="w-10 h-10 shrink-0 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold">
                                                            {profile?.fname
                                                                ?.charAt(0)
                                                                ?.toUpperCase() ||
                                                                student.email
                                                                    ?.charAt(0)
                                                                    ?.toUpperCase() ||
                                                                'S'}
                                                        </div>

                                                        <div className="min-w-0">

                                                            <p className="text-sm font-semibold text-gray-800 break-words">
                                                                {name}
                                                            </p>

                                                            <p className="text-xs text-gray-500 mt-1 break-all">
                                                                {student.email || '-'}
                                                            </p>

                                                        </div>

                                                    </div>

                                                </div>
                                            )
                                        })}

                                    </div>
                                )}

                            </div>

                        </div>

                        <div className="space-y-5">

                            <div className="rounded-2xl border border-gray-200 p-5 sm:p-6">

                                <div className="flex items-center gap-3 mb-6">

                                    <div className="w-9 h-9 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                        <FaUserTie size={16} />
                                    </div>

                                    <div>
                                        <h3 className="text-base font-semibold text-gray-800">
                                            Teacher
                                        </h3>

                                        <p className="text-xs text-gray-500 mt-0.5">
                                            Assigned class teacher
                                        </p>
                                    </div>

                                </div>

                                <div className="flex items-center gap-3">

                                    <div className="w-12 h-12 shrink-0 rounded-xl bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold">
                                        {teacherProfile?.fname
                                            ?.charAt(0)
                                            ?.toUpperCase() ||
                                            teacher?.email
                                                ?.charAt(0)
                                                ?.toUpperCase() ||
                                            'T'}
                                    </div>

                                    <div className="min-w-0">

                                        <p className="text-sm font-semibold text-gray-800 break-words">
                                            {teacherName}
                                        </p>

                                        <p className="text-xs text-gray-500 mt-1 break-all">
                                            {teacher?.email || '-'}
                                        </p>

                                    </div>

                                </div>

                                <div className="mt-5 pt-5 border-t border-gray-100 space-y-4">

                                    <div className="flex items-start gap-3">

                                        <div className="w-9 h-9 shrink-0 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                            <FaIdCard size={13} />
                                        </div>

                                        <div className="min-w-0">
                                            <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">
                                                Teacher ID
                                            </p>

                                            <p className="mt-1 text-sm font-medium text-gray-800 break-all">
                                                {teacher?.teacher_id ||
                                                    teacher?._id ||
                                                    '-'}
                                            </p>
                                        </div>

                                    </div>

                                    <div className="flex items-start gap-3">

                                        <div className="w-9 h-9 shrink-0 rounded-lg bg-indigo-50 text-indigo-600 flex items-center justify-center">
                                            <FaEnvelope size={13} />
                                        </div>

                                        <div className="min-w-0">
                                            <p className="text-xs text-gray-400 uppercase tracking-wide font-medium">
                                                Email
                                            </p>

                                            <p className="mt-1 text-sm font-medium text-gray-800 break-all">
                                                {teacher?.email || '-'}
                                            </p>
                                        </div>

                                    </div>

                                </div>

                            </div>

                            <div className="rounded-2xl border border-gray-200 p-5 sm:p-6">

                                <h3 className="text-base font-semibold text-gray-800">
                                    Class Information
                                </h3>

                                <div className="mt-5 space-y-4">

                                    <div className="flex items-center justify-between gap-4">
                                        <span className="text-sm text-gray-500">
                                            Students
                                        </span>

                                        <span className="text-sm font-semibold text-gray-700">
                                            {students.length}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between gap-4">
                                        <span className="text-sm text-gray-500">
                                            Status
                                        </span>

                                        <span
                                            className={`text-xs font-semibold px-3 py-1 rounded-full ${classData.status === 'active'
                                                    ? 'bg-green-50 text-green-600'
                                                    : 'bg-gray-100 text-gray-600'
                                                }`}
                                        >
                                            {classData.status}
                                        </span>
                                    </div>

                                    <div className="flex items-center justify-between gap-4">
                                        <span className="text-sm text-gray-500">
                                            Created
                                        </span>

                                        <span className="text-sm font-medium text-gray-700">
                                            {classData.createdAt
                                                ? new Date(
                                                    classData.createdAt
                                                ).toLocaleDateString()
                                                : '-'}
                                        </span>
                                    </div>

                                </div>

                            </div>

                            <div>
                                <h1 className="text-lg font-bold">
                                    Attendance
                                </h1>

                                {attendanceStatus.type === 'available' && (
                                    <div className="mt-4">
                                        <button
                                            type="button"
                                            onClick={handleAttendance}
                                            disabled={attendanceLoading}
                                            className="disabled:opacity-50 disabled:cursor-not-allowed"
                                        >
                                            <DefaultButton
                                                label={
                                                    attendanceLoading
                                                        ? 'Marking...'
                                                        : 'Make Attendance'
                                                }
                                            />
                                        </button>
                                    </div>
                                )}

                                {attendanceStatus.type === 'not-started' && (
                                    <p className="mt-4 text-sm text-gray-500">
                                        Class is not yet started. You cannot
                                        make attendance.
                                    </p>
                                )}

                                {attendanceStatus.type === 'ended' && (
                                    <p className="mt-4 text-sm text-gray-500">
                                        Attendance time has ended.
                                    </p>
                                )}

                                {attendanceStatus.type === 'unavailable' && (
                                    <p className="mt-4 text-sm text-red-500">
                                        {attendanceStatus.message}
                                    </p>
                                )}

                                {attendanceMessage && (
                                    <p
                                        className={`mt-4 text-sm ${attendanceSuccess
                                                ? 'text-green-600'
                                                : 'text-red-500'
                                            }`}
                                    >
                                        {attendanceMessage}
                                    </p>
                                )}

                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </div>
    )
}

export default StdViewMyClass