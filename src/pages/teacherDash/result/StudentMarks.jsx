import React, { useEffect, useState } from 'react'
import API from '../../../services/api'

const StudentMarks = () => {
    const token = localStorage.getItem('access_token')
    const [stdmarks, setStdMarks] = useState([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchStudentMarks = async () => {
            try {
                const res = await API.get('/learn/student-fetch-marks', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (res.data.success) {
                    setStdMarks(res.data.result || [])
                }
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        if (token) {
            fetchStudentMarks()
        }
    }, [token])

    return (
        <div className="w-full space-y-6">
            <div>
                <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                    My Marks
                </h1>
                <p className="mt-1 text-sm text-gray-500">
                    View your assignment marks and class information
                </p>
            </div>

            {loading ? (
                <div className="border border-gray-200 bg-white p-10 text-center">
                    <p className="text-sm text-gray-500">Loading marks...</p>
                </div>
            ) : stdmarks.length === 0 ? (
                <div className="border border-gray-200 bg-white p-10 text-center">
                    <p className="text-sm text-gray-500">
                        No marks records found
                    </p>
                </div>
            ) : (
                <div className="overflow-hidden border border-gray-200 bg-white">
                    <div className="overflow-x-auto">
                        <table className="w-full min-w-[900px]">
                            <thead>
                                <tr className="border-b border-gray-200 bg-gray-50">
                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                                        Assignment
                                    </th>
                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                                        Class
                                    </th>
                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                                        Class Time
                                    </th>
                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                                        Submitted At
                                    </th>
                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                                        Status
                                    </th>
                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase text-gray-500">
                                        Marks
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {stdmarks.map((item, index) => (
                                    <tr
                                        key={item._id || index}
                                        className="border-b border-gray-100 last:border-0"
                                    >
                                        <td className="px-5 py-4 text-sm font-medium text-gray-900">
                                            {item.assignment?.title || '-'}
                                        </td>
                                        <td className="px-5 py-4 text-sm text-gray-700">
                                            {item.class?.name ||
                                                item.class?._id ||
                                                '-'}
                                        </td>
                                        <td className="px-5 py-4 text-sm text-gray-700">
                                            {item.timetable?.startTime &&
                                                item.timetable?.endTime
                                                ? `${item.timetable.startTime} - ${item.timetable.endTime}`
                                                : '-'}
                                        </td>
                                        <td className="px-5 py-4 text-sm text-gray-600">
                                            {item.createdAt
                                                ? new Date(
                                                    item.createdAt
                                                ).toLocaleString()
                                                : '-'}
                                        </td>
                                        <td className="px-5 py-4 text-sm text-gray-700">
                                            {item.status || '-'}
                                        </td>
                                        <td className="px-5 py-4">
                                            <span className="inline-flex min-w-[50px] justify-center border border-indigo-200 bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-700">
                                                {item.marks ?? 0}
                                            </span>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            )}
        </div>
    )
}

export default StudentMarks