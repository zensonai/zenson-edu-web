import React, { useEffect, useMemo, useState } from 'react'
import API from '../../services/api'
import PieChart from '../../component/Dashboard/Charts/PieChart'
import { useAuth } from '../../context/AuthContext'

const MarksAssignment = () => {
    const token = localStorage.getItem('access_token')
    const [marks, setMarks] = useState([])
    const { auth } = useAuth()

    useEffect(() => {
        const fetchmarks = async () => {
            const endpoint = auth?.role === 'institute_admin'
                ? '/learn/fetch-marks'
                : '/learn/teacher-fetch-marks'

            const res = await API.get(endpoint, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (res.data.success === true) {
                setMarks(res.data.result || [])
            }
        }

        if (token && auth?.role) fetchmarks()
    }, [token, auth?.role])

    const chartData = useMemo(() => {
        let zeroTo35 = 0
        let thirtySixTo65 = 0
        let sixtySixTo99 = 0

        marks.forEach((assignment) => {
            if (!assignment.submissions) return

            assignment.submissions.forEach((submission) => {
                const mark = Number(submission.marks)

                if (Number.isNaN(mark)) return

                if (mark >= 0 && mark <= 35) {
                    zeroTo35++
                } else if (mark >= 36 && mark <= 65) {
                    thirtySixTo65++
                } else if (mark >= 66 && mark <= 99) {
                    sixtySixTo99++
                }
            })
        })

        return [
            {
                name: '0–35',
                value: zeroTo35,
                color: '#ef4444',
            },
            {
                name: '36–65',
                value: thirtySixTo65,
                color: '#f97316',
            },
            {
                name: '66–99',
                value: sixtySixTo99,
                color: '#6366f1',
            },
        ]
    }, [marks])

    return (
        <div className="w-full rounded-xl border border-slate-200 bg-white p-3">
            <div className="mb-1">
                <h2 className="text-base font-bold text-slate-900">Student Marks</h2>
                <p className="text-xs text-slate-500">Marks distribution</p>
            </div>
            <PieChart data={chartData} />
        </div>
    )
}

export default MarksAssignment