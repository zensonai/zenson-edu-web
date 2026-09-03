import React from 'react'
import {
    ResponsiveContainer,
    PieChart as RePieChart,
    Pie,
    Cell,
} from 'recharts'

const ProgressCircle = ({
    value = 0,
    size = 180,
    color = '#6366f1',
    backgroundColor = '#e5e7eb',
    strokeWidth = 18,
    showLabel = true,
}) => {
    const progress = Math.min(Math.max(Number(value) || 0, 0), 100)

    const chartData = [
        {
            name: 'Progress',
            value: progress,
        },
        {
            name: 'Remaining',
            value: 100 - progress,
        },
    ]

    return (
        <div
            className="relative"
            style={{
                width: size,
                height: size,
            }}
        >
            <ResponsiveContainer width="100%" height="100%">
                <RePieChart>
                    <Pie
                        data={chartData}
                        dataKey="value"
                        cx="50%"
                        cy="50%"
                        startAngle={90}
                        endAngle={-270}
                        innerRadius={size / 2 - strokeWidth}
                        outerRadius={size / 2}
                        paddingAngle={0}
                        stroke="none"
                    >
                        <Cell fill={color} />
                        <Cell fill={backgroundColor} />
                    </Pie>
                </RePieChart>
            </ResponsiveContainer>

            {showLabel && (
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-4xl font-black tracking-tight text-slate-800">
                        {progress}%
                    </span>

                    <span className="mt-1 rounded-full bg-indigo-50 px-3 py-1 text-xs font-bold text-indigo-600">
                        Progress
                    </span>
                </div>
            )}
        </div>
    )
}

export default ProgressCircle