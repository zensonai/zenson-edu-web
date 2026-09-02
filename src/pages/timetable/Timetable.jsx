import React, { useEffect, useMemo, useState } from 'react'
import API from '../../services/api'
import { useAuth } from '../../context/AuthContext'

const Timetable = () => {
    const { auth } = useAuth()

    const [timetable, setTimetable] = useState([])
    const [currentDate, setCurrentDate] = useState(new Date())

    useEffect(() => {
        const fetchTimetable = async () => {
            try {
                let endpoint = '/class/timetable'

                if (auth?.role === 'teacher') {
                    endpoint = '/class/teacher-timetable'
                } else if (auth?.role === 'student') {
                    endpoint = '/class/student-timetable'
                }

                const res = await API.get(endpoint)

                if (res.data?.success === true) {
                    const data = Array.isArray(res.data.result)
                        ? res.data.result
                        : []

                    setTimetable(data)
                } else {
                    setTimetable([])
                }
            } catch (error) {

                setTimetable([])
            }
        }

        if (auth?.role) {
            fetchTimetable()
        }
    }, [auth?.role])

    const getMonday = date => {
        const result = new Date(date)
        const day = result.getDay()

        result.setDate(
            result.getDate() + (day === 0 ? -6 : 1 - day)
        )

        result.setHours(0, 0, 0, 0)

        return result
    }

    const weekStart = getMonday(currentDate)

    const weekDays = useMemo(() => {
        return Array.from({ length: 7 }, (_, index) => {
            const date = new Date(weekStart)

            date.setDate(
                weekStart.getDate() + index
            )

            return date
        })
    }, [
        weekStart.getFullYear(),
        weekStart.getMonth(),
        weekStart.getDate(),
    ])

    const getClassesForDate = date => {
        const dayNames = [
            'sunday',
            'monday',
            'tuesday',
            'wednesday',
            'thursday',
            'friday',
            'saturday',
        ]

        const selectedDay = dayNames[date.getDay()]

        return timetable
            .filter(item => {
                if (item?.status !== 'active') {
                    return false
                }

                return (
                    String(item?.day || '').toLowerCase() ===
                    selectedDay
                )
            })
            .sort((a, b) =>
                String(a?.startTime || '').localeCompare(
                    String(b?.startTime || '')
                )
            )
    }

    const getTeacherName = item => {
        const teacher = item?.class?.teacher

        if (!teacher) {
            return 'Teacher'
        }

        if (teacher.profile) {
            return [
                teacher.profile.fname,
                teacher.profile.mname,
                teacher.profile.lname,
            ]
                .filter(Boolean)
                .join(' ')
        }

        if (teacher.user?.profile) {
            return [
                teacher.user.profile.fname,
                teacher.user.profile.mname,
                teacher.user.profile.lname,
            ]
                .filter(Boolean)
                .join(' ')
        }

        return (
            teacher.email ||
            teacher.user?.email ||
            'Teacher'
        )
    }

    const formatTime = time => {
        if (!time) {
            return '-'
        }

        const [hours, minutes] = String(time).split(':')

        let hour = Number(hours)

        if (Number.isNaN(hour)) {
            return String(time)
        }

        const period = hour >= 12 ? 'PM' : 'AM'

        hour = hour % 12

        if (hour === 0) {
            hour = 12
        }

        return `${hour}:${minutes || '00'} ${period}`
    }

    const formatDate = date => {
        return date.toLocaleDateString('en-US', {
            weekday: 'long',
            month: 'long',
            day: 'numeric',
            year: 'numeric',
        })
    }

    const previousWeek = () => {
        const date = new Date(currentDate)

        date.setDate(
            date.getDate() - 7
        )

        setCurrentDate(date)
    }

    const nextWeek = () => {
        const date = new Date(currentDate)

        date.setDate(
            date.getDate() + 7
        )

        setCurrentDate(date)
    }

    const goToday = () => {
        setCurrentDate(new Date())
    }

    const weekClasses = weekDays.flatMap(date => {
        return getClassesForDate(date).map(item => ({
            item,
            date,
        }))
    })

    return (
        <div className="min-h-screen bg-gray-50 p-3 sm:p-5 lg:p-7">

            <div className="mb-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                <div>
                    <h1 className="text-2xl font-bold text-gray-900">
                        Timetable
                    </h1>

                    <p className="mt-1 text-sm text-gray-500">
                        Your class schedule
                    </p>
                </div>

                <div className="flex items-center gap-2">

                    <button
                        type="button"
                        onClick={previousWeek}
                        className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700"
                    >
                        ←
                    </button>

                    <button
                        type="button"
                        onClick={goToday}
                        className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700"
                    >
                        Today
                    </button>

                    <button
                        type="button"
                        onClick={nextWeek}
                        className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700"
                    >
                        →
                    </button>

                </div>

            </div>

            <div className="mb-5 rounded-xl border border-gray-200 bg-white p-4">

                <p className="text-sm font-medium text-gray-500">
                    {weekDays[0].toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                    })}
                    {' - '}
                    {weekDays[6].toLocaleDateString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        year: 'numeric',
                    })}
                </p>

            </div>

            <div className="space-y-4 md:hidden">

                {weekClasses.length === 0 ? (
                    <div className="rounded-xl border border-gray-200 bg-white p-8 text-center">
                        <p className="text-sm font-medium text-gray-500">
                            No classes this week
                        </p>
                    </div>
                ) : (
                    weekClasses.map(({ item, date }) => (
                        <div
                            key={item._id}
                            className="rounded-2xl border border-gray-200 bg-white p-4 shadow-sm"
                        >

                            <div className="mb-4 flex items-start justify-between gap-3">

                                <div>
                                    <p className="text-base font-bold text-gray-900">
                                        Class
                                    </p>

                                    <p className="mt-1 text-sm font-medium text-indigo-600">
                                        {formatDate(date)}
                                    </p>
                                </div>

                                {item.class?.continue_class === true && (
                                    <span className="shrink-0 rounded-full bg-green-100 px-3 py-1 text-[10px] font-semibold text-green-700">
                                        Every Week
                                    </span>
                                )}

                            </div>

                            <div className="rounded-xl bg-indigo-50 p-4">

                                <p className="text-[10px] font-semibold uppercase tracking-wide text-indigo-500">
                                    Time
                                </p>

                                <p className="mt-1 text-lg font-bold text-gray-900">
                                    {formatTime(item.startTime)}
                                    {' - '}
                                    {formatTime(item.endTime)}
                                </p>

                            </div>

                            <div className="mt-4">

                                <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                                    Teacher
                                </p>

                                <p className="mt-1 text-sm font-semibold text-gray-800">
                                    {getTeacherName(item)}
                                </p>

                            </div>

                        </div>
                    ))
                )}

            </div>

            <div className="hidden overflow-x-auto rounded-xl border border-gray-200 bg-white md:block">

                <div className="grid min-w-[1050px] grid-cols-7">

                    {weekDays.map(date => {

                        const classes = getClassesForDate(date)

                        const isToday =
                            date.toDateString() ===
                            new Date().toDateString()

                        return (
                            <div
                                key={date.toISOString()}
                                className="min-h-[600px] border-r border-gray-200 last:border-r-0"
                            >

                                <div
                                    className={`border-b border-gray-200 p-4 ${
                                        isToday
                                            ? 'bg-indigo-50'
                                            : 'bg-gray-50'
                                    }`}
                                >

                                    <p
                                        className={`text-xs font-semibold uppercase ${
                                            isToday
                                                ? 'text-indigo-600'
                                                : 'text-gray-500'
                                        }`}
                                    >
                                        {date.toLocaleDateString(
                                            'en-US',
                                            {
                                                weekday: 'long',
                                            }
                                        )}
                                    </p>

                                    <p
                                        className={`mt-1 text-2xl font-bold ${
                                            isToday
                                                ? 'text-indigo-600'
                                                : 'text-gray-900'
                                        }`}
                                    >
                                        {date.getDate()}
                                    </p>

                                </div>

                                <div className="space-y-3 p-3">

                                    {classes.length === 0 ? (
                                        <div className="flex min-h-[100px] items-center justify-center rounded-xl border border-dashed border-gray-200">
                                            <span className="text-xs text-gray-400">
                                                No classes
                                            </span>
                                        </div>
                                    ) : (
                                        classes.map(item => (
                                            <div
                                                key={item._id}
                                                className="rounded-xl border border-indigo-100 bg-indigo-50 p-3"
                                            >

                                                <div className="flex items-start justify-between gap-2">

                                                    <div>
                                                        <p className="text-sm font-bold text-gray-900">
                                                            Class
                                                        </p>

                                                        {item.class?.continue_class === true && (
                                                            <span className="mt-1 inline-flex rounded-full bg-green-100 px-2 py-1 text-[10px] font-semibold text-green-700">
                                                                Every Week
                                                            </span>
                                                        )}
                                                    </div>

                                                </div>

                                                <div className="mt-3 rounded-lg bg-white p-3">

                                                    <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                                                        Time
                                                    </p>

                                                    <p className="mt-1 text-sm font-bold text-gray-800">
                                                        {formatTime(item.startTime)}
                                                        {' - '}
                                                        {formatTime(item.endTime)}
                                                    </p>

                                                </div>

                                                <div className="mt-3">

                                                    <p className="text-[10px] font-semibold uppercase tracking-wide text-gray-400">
                                                        Teacher
                                                    </p>

                                                    <p className="mt-1 break-words text-sm font-medium text-gray-700">
                                                        {getTeacherName(item)}
                                                    </p>

                                                </div>

                                            </div>
                                        ))
                                    )}

                                </div>

                            </div>
                        )
                    })}

                </div>

            </div>

        </div>
    )
}

export default Timetable