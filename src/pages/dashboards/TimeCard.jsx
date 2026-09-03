import React, { useEffect, useState } from 'react'
import { FaClock } from 'react-icons/fa'

const TimeCard = () => {
    const [date, setDate] = useState(new Date())

    useEffect(() => {
        const timer = setInterval(() => {
            setDate(new Date())
        }, 1000)

        return () => clearInterval(timer)
    }, [])

    const hour = date.getHours()

    const period =
        hour >= 5 && hour < 12
            ? 'Morning'
            : hour >= 12 && hour < 17
                ? 'Afternoon'
                : hour >= 17 && hour < 21
                    ? 'Evening'
                    : 'Night'

    const day = date.toLocaleDateString('en-US', {
        weekday: 'long',
    })

    const month = date.toLocaleDateString('en-US', {
        month: 'long',
    })

    const time = date.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
    })

    return (
        <div className="relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm">
            <div className="absolute right-0 top-0 h-32 w-32 rounded-full bg-indigo-50 blur-3xl" />

            <div className="relative flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
                <div>
                    <div className="flex items-center gap-3">
                        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-600 text-white shadow-sm">
                            <FaClock className="text-lg" />
                        </div>

                        <div>
                            <p className="text-sm font-medium text-gray-500">
                                Current Time
                            </p>

                            <h2 className="text-2xl font-bold text-gray-900">
                                {time}
                            </h2>
                        </div>
                    </div>
                </div>

                <div className="text-left sm:text-right">
                    <p className="text-sm font-semibold text-indigo-600">
                        {day}
                    </p>

                    <p className="mt-1 text-lg font-bold text-gray-900">
                        {date.getDate()} {month} {date.getFullYear()}
                    </p>

                    <span
                        className={`mt-3 inline-flex rounded-full px-3 py-1 text-xs font-semibold ${period === 'Morning'
                                ? 'bg-lime-100 text-lime-700'
                                : period === 'Afternoon'
                                    ? 'bg-orange-100 text-orange-700'
                                    : period === 'Evening'
                                        ? 'bg-indigo-100 text-indigo-700'
                                        : 'bg-gray-100 text-gray-700'
                            }`}
                    >
                        {period}
                    </span>
                </div>
            </div>
        </div>
    )
}

export default TimeCard