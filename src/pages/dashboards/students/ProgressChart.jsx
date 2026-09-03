import React, { useEffect, useState } from 'react'
import API from '../../../services/api'
import ProgressCircle from '../../../component/Dashboard/Charts/ProgressCircle'

const ProgressChart = () => {
    const token = localStorage.getItem('access_token')
    const [myresult, setMyResult] = useState([])

    useEffect(() => {
        const fetchStudentMarks = async () => {
            const res = await API.get('/learn/student-fetch-marks', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if (res.data.success) {
                setMyResult(res.data.result || [])
            }
        }
        if (token) fetchStudentMarks()
    }, [token])

    const totalMarks = myresult.reduce((total, item) => {
        return total + (Number(item.marks) || 0)
    }, 0)

    const totalPossibleMarks = myresult.length * 100

    const percentage = totalPossibleMarks > 0
        ? Math.min(Math.round((totalMarks / totalPossibleMarks) * 100), 100)
        : 0

    return (
        <div className="w-full rounded-2xl border border-slate-200 bg-white p-5 sm:p-6">
            <div className="mb-5">
                <h2 className="text-lg font-bold text-slate-800">
                    Overall Progress
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                    Your performance across all results
                </p>
            </div>

            <div className="flex justify-center">
                <ProgressCircle
                    value={percentage}
                    color="#6366f1"
                    backgroundColor="#e0e7ff"
                />
            </div>

            <div className="mt-5 grid grid-cols-2 gap-3">
                <div className="rounded-xl bg-indigo-50 p-4">
                    <p className="text-xs font-semibold text-indigo-500">
                        Obtained
                    </p>
                    <p className="mt-1 text-xl font-black text-indigo-700">
                        {totalMarks}
                    </p>
                </div>

                <div className="rounded-xl bg-lime-50 p-4">
                    <p className="text-xs font-semibold text-lime-600">
                        Total
                    </p>
                    <p className="mt-1 text-xl font-black text-lime-700">
                        {totalPossibleMarks}
                    </p>
                </div>
            </div>
        </div>
    )
}

export default ProgressChart