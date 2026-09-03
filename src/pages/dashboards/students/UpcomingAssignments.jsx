import React, { useEffect, useState } from 'react'
import API from '../../../services/api'
import { FaPaperclip } from 'react-icons/fa'

const UpcomingAssignments = () => {
    const token = localStorage.getItem('access_token')

    const [myAssignments, setMyAssignment] = useState([])

    useEffect(() => {
        const fetchmyassignments = async () => {
            const res = await API.get('/learn/student-assigments', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if (res.data.success === true) {
                setMyAssignment(res.data.result)
            }
        }
        if (token) fetchmyassignments()
    }, [token])

    const latestAssignments = [...myAssignments]
        .filter((data) => data.status?.toLowerCase() !== 'submitted')
        .sort((a, b) => {
            return new Date(b.createdAt || b.created_at) - new Date(a.createdAt || a.created_at)
        })
        .slice(0, 5)

    return (
        <div className="w-full">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                {latestAssignments.map((data, index) => {
                    return (
                        <div
                            className="border-b border-slate-100 p-4 last:border-b-0 sm:p-5"
                            key={index}
                        >
                            <div className="grid grid-cols-[44px_minmax(0,1fr)] gap-4">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                    <FaPaperclip className="text-base" />
                                </div>

                                <div className="min-w-0">
                                    <h1 className="text-sm font-bold text-slate-800 sm:text-base">
                                        {data.title}
                                    </h1>

                                    <p className="mt-1 text-sm leading-6 text-slate-500">
                                        {data.description?.length > 100
                                            ? `${data.description.slice(0, 100)}...`
                                            : data.description}
                                    </p>

                                    <div className="mt-3 flex flex-wrap items-center gap-2">
                                        <span className="text-xs font-semibold text-slate-400">
                                            Due:
                                        </span>

                                        <span className="rounded-md bg-orange-50 px-2.5 py-1 text-xs font-semibold text-orange-600">
                                            {new Date(data.due_date).toLocaleDateString()}
                                        </span>

                                        <span className="rounded-md bg-lime-50 px-2.5 py-1 text-xs font-semibold text-lime-700">
                                            {data.status || 'Not Submitted'}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )
                })}
                <div className="p-4 text-center">
                    <a
                        href="/dashboard/student/assignments"
                        className="text-sm font-semibold text-indigo-600"
                    >
                        View more Assignments
                    </a>
                </div>
            </div>


        </div>
    )
}

export default UpcomingAssignments