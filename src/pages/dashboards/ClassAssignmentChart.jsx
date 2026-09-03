import React, { useEffect, useState } from 'react'
import API from '../../services/api'
import BarChart from '../../component/Dashboard/Charts/BarChart'
import { useAuth } from '../../context/AuthContext'

const ClassAssignmentChart = () => {
    const token = localStorage.getItem('access_token')
    const [myclasses, setMyClasses] = useState([])
    const [myAssignments, setMyAssignment] = useState([])
    const { auth } = useAuth()

    useEffect(() => {
        const fetchmyclass = async () => {
            const endpoint = auth?.role === 'teacher'
                ? '/class/teacher-classes'
                : '/class/student-classes'

            const res = await API.get(endpoint, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (res.data.success === true) {
                setMyClasses(res.data.result || [])
            }
        }

        if (token) fetchmyclass()
    }, [token, auth?.role])

    useEffect(() => {
        const fetchmyassignments = async () => {
            const endpoint = auth?.role === 'teacher'
                ? '/learn/teacher-assigments'
                : '/learn/student-assigments'

            const res = await API.get(endpoint, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (res.data.success === true) {
                setMyAssignment(res.data.result || [])
            }
        }

        if (token) fetchmyassignments()
    }, [token, auth?.role])

    const months = []

    for (let i = 5; i >= 0; i--) {
        const date = new Date()
        date.setDate(1)
        date.setMonth(date.getMonth() - i)

        months.push({
            name: date.toLocaleDateString('en-US', {
                month: 'short',
            }),
            year: date.getFullYear(),
            month: date.getMonth(),
        })
    }

    const chartData = months.map((month) => {
        const classes = myclasses.filter((item) => {
            const date = item.createdAt || item.created_at
            if (!date) return false

            const itemDate = new Date(date)

            return (
                itemDate.getMonth() === month.month &&
                itemDate.getFullYear() === month.year
            )
        }).length

        const assignments = myAssignments.filter((item) => {
            const date = item.createdAt || item.created_at
            if (!date) return false

            const itemDate = new Date(date)

            return (
                itemDate.getMonth() === month.month &&
                itemDate.getFullYear() === month.year
            )
        }).length

        return {
            name: month.name,
            classes,
            assignments,
        }
    })

    const totalClasses = chartData.reduce((total, item) => {
        return total + item.classes
    }, 0)

    const totalAssignments = chartData.reduce((total, item) => {
        return total + item.assignments
    }, 0)

    return (
        <div className="w-full overflow-hidden rounded-2xl border border-slate-200 bg-white shadow-sm">
            <div className="flex flex-col gap-4 border-b border-slate-100 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
                <div>
                    <h2 className="text-lg font-bold text-slate-800 sm:text-xl">
                        Classes & Assignments
                    </h2>
                    <p className="mt-1 text-sm text-slate-400">
                        Your activity over the last 6 months
                    </p>
                </div>

                <div className="grid grid-cols-2 gap-2 sm:gap-3">
                    <div className="rounded-xl bg-indigo-50 px-4 py-3">
                        <div className="flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-full bg-indigo-500" />
                            <span className="text-xs font-semibold text-indigo-500">
                                Classes
                            </span>
                        </div>
                        <p className="mt-1 text-xl font-black text-indigo-700">
                            {totalClasses}
                        </p>
                    </div>

                    <div className="rounded-xl bg-lime-50 px-4 py-3">
                        <div className="flex items-center gap-2">
                            <span className="h-2.5 w-2.5 rounded-full bg-lime-500" />
                            <span className="text-xs font-semibold text-lime-600">
                                Assignments
                            </span>
                        </div>
                        <p className="mt-1 text-xl font-black text-lime-700">
                            {totalAssignments}
                        </p>
                    </div>
                </div>
            </div>

            <div className="w-full px-2 pb-4 pt-5 sm:px-5 sm:pb-6">
                <BarChart
                    data={chartData}
                    xKey="name"
                    bars={[
                        {
                            dataKey: 'classes',
                            name: 'Classes',
                            color: '#6366f1',
                            barSize: 18,
                        },
                        {
                            dataKey: 'assignments',
                            name: 'Assignments',
                            color: '#84cc16',
                            barSize: 18,
                        },
                    ]}
                    height={320}
                    showGrid={true}
                    showLegend={true}
                />
            </div>
        </div>
    )
}

export default ClassAssignmentChart