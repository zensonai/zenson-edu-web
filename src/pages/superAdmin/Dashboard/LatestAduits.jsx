import React, { useEffect, useState } from 'react'
import API from '../../../services/api'

const LatestAduits = () => {

    const [auditlog, setAuditlogs] = useState([])
    const token = localStorage.getItem("access_token")

    const borderColors = [
        "border-blue-500",
        "border-lime-500",
        "border-indigo-500",
        "border-yellow-500",
        "border-orange-500",
        "border-red-500"
    ]

    useEffect(() => {
        const fetchallauditlogs = async () => {
            const res = await API.get('/admin/fetch-auditlogs', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (res.data.success === true) {
                setAuditlogs((res.data.result || []).slice(0, 6))
            }
        }

        if (token) {
            fetchallauditlogs()
        }
    }, [token])

    return (
        <div className="shadow bg-white/60 backdrop-blur-xl border border-white/40 rounded-xl p-5">

            <div className="flex justify-between">
                <h2 className="text-lg font-semibold text-gray-700 mb-4">
                    Latest Audits
                </h2>
                <a href="/dashboard/security/audit-logs">
                    <p className="text-blue-500 duration-500 hover:underline">View More</p>
                </a>
            </div>

            <div className="grid xl:grid-cols-1 gap-4">
                {
                    auditlog.map((data, index) => {
                        return (
                            <div
                                className={`flex items-center justify-between pb-3 border-l-2 ${borderColors[index]} p-3 rounded-lg bg-indigo-50/40`}
                                key={index}
                            >
                                <div>
                                    <p className="text-sm font-medium text-gray-700">
                                        {data.action}
                                    </p>

                                    <p className="text-xs text-gray-400 mt-1">
                                        {new Date(data.createdAt).toLocaleString()}
                                    </p>
                                </div>

                                <span className="text-xs text-gray-500">
                                    #{index + 1}
                                </span>
                            </div>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default LatestAduits