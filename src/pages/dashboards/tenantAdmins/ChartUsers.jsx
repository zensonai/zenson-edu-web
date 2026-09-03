import React, { useEffect, useMemo, useState } from 'react'
import BarChart from '../../../component/Dashboard/Charts/BarChart'
import API from '../../../services/api'

const ChartUsers = () => {
    const token = localStorage.getItem('access_token')
    const [students, setStudents] = useState([])
    const [teachers, setTeachers] = useState([])

    useEffect(() => {
        const fetchStudents = async () => {
            const res = await API.get('/student', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (res.data.success === true) {
                setStudents(res.data.result || [])
            }
        }

        if (token) fetchStudents()
    }, [token])

    useEffect(() => {
        const fetchTeachers = async () => {
            const res = await API.get('/teacher', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (res.data.success === true) {
                setTeachers(res.data.result || [])
            }
        }

        if (token) fetchTeachers()
    }, [token])

    const chartData = useMemo(() => {
        const result = []

        for (let i = 5; i >= 0; i--) {
            const date = new Date()
            date.setDate(1)
            date.setMonth(date.getMonth() - i)

            result.push({
                name: date.toLocaleString('en-US', {
                    month: 'short',
                }),
                month: date.getMonth(),
                year: date.getFullYear(),
                students: 0,
                teachers: 0,
            })
        }

        students.forEach((student) => {
            if (!student.createdAt) return

            const date = new Date(student.createdAt)

            const month = result.find(
                (item) =>
                    item.month === date.getMonth() &&
                    item.year === date.getFullYear()
            )

            if (month) {
                month.students++
            }
        })

        teachers.forEach((teacher) => {
            if (!teacher.createdAt) return

            const date = new Date(teacher.createdAt)

            const month = result.find(
                (item) =>
                    item.month === date.getMonth() &&
                    item.year === date.getFullYear()
            )

            if (month) {
                month.teachers++
            }
        })

        return result
    }, [students, teachers])

    const bars = [
        {
            dataKey: 'students',
            name: 'Students',
            color: '#6366f1',
        },
        {
            dataKey: 'teachers',
            name: 'Teachers',
            color: '#84cc16',
        },
    ]

    return (
        <div className="w-full rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
            <div className="mb-4">
                <h2 className="text-lg font-bold text-slate-900">Users Overview</h2>
                <p className="text-sm text-slate-500">Students and teachers registered over the last 6 months</p>
            </div>

            <div className="w-full overflow-hidden">
                <BarChart
                    data={chartData}
                    bars={bars}
                    xKey="name"
                />
            </div>
        </div>
    )
}

export default ChartUsers