import React, { useState } from 'react'
import { ChevronLeft, ChevronRight } from 'lucide-react'

const Calendar = () => {
    const today = new Date()
    const [currentDate, setCurrentDate] = useState(new Date())

    const year = currentDate.getFullYear()
    const month = currentDate.getMonth()

    const monthName = currentDate.toLocaleDateString('en-US', {
        month: 'long',
        year: 'numeric',
    })

    const firstDay = new Date(year, month, 1).getDay()
    const daysInMonth = new Date(year, month + 1, 0).getDate()

    const days = []

    for (let i = 0; i < firstDay; i++) days.push(null)
    for (let i = 1; i <= daysInMonth; i++) days.push(i)

    const previousMonth = () => {
        setCurrentDate(new Date(year, month - 1, 1))
    }

    const nextMonth = () => {
        setCurrentDate(new Date(year, month + 1, 1))
    }

    const isToday = (day) =>
        day &&
        today.getDate() === day &&
        today.getMonth() === month &&
        today.getFullYear() === year

    return (
        <div className="w-full max-w-md overflow-hidden rounded-lg border border-slate-200 bg-white shadow-sm">
            <div className="flex items-center justify-between border-b border-slate-200 px-3 py-2.5">
                <button
                    onClick={previousMonth}
                    className="flex h-7 w-7 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100"
                >
                    <ChevronLeft size={16} />
                </button>

                <h2 className="text-sm font-semibold text-slate-800">
                    {monthName}
                </h2>

                <button
                    onClick={nextMonth}
                    className="flex h-7 w-7 items-center justify-center rounded-md text-slate-500 hover:bg-slate-100"
                >
                    <ChevronRight size={16} />
                </button>
            </div>

            <div className="grid grid-cols-7 border-b border-slate-200">
                {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map((day) => (
                    <div
                        key={day}
                        className="py-2 text-center text-[10px] font-semibold text-slate-400"
                    >
                        {day}
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-7">
                {days.map((day, index) => (
                    <div
                        key={index}
                        className="flex h-11 items-center justify-center border-b border-r border-slate-100"
                    >
                        {day && (
                            <div
                                className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-medium ${isToday(day)
                                        ? 'bg-indigo-600 text-white'
                                        : 'text-slate-700 hover:bg-slate-100'
                                    }`}
                            >
                                {day}
                            </div>
                        )}
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Calendar