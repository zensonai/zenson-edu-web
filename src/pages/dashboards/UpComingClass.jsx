import React, { useEffect, useState } from 'react'
import API from '../../services/api'
import { FaBookOpen, FaChalkboardTeacher, FaUsers } from 'react-icons/fa'
import { useAuth } from '../../context/AuthContext'

const UpComingClass = () => {
    const token = localStorage.getItem('access_token')
    const { auth } = useAuth()
    const [classes, setClasses] = useState([])

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
                setClasses(res.data.result || [])
            }
        }

        if (token && auth?.role) {
            fetchmyclass()
        }
    }, [token, auth?.role])

    return (
        <div className="w-full">
            <div className="overflow-hidden rounded-2xl border border-slate-200 bg-white">
                {classes.slice(0, 3).map((data, index) => {
                    return (
                        <div
                            key={index}
                            className="border-b border-slate-100 p-4 last:border-b-0 sm:p-5"
                        >
                            <div className="grid grid-cols-[44px_minmax(0,1fr)] gap-4">
                                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                                    <FaBookOpen className="text-base" />
                                </div>

                                <div className="min-w-0">
                                    {auth?.role === 'teacher' ? (
                                        <>
                                            <h2 className="truncate text-base text-slate-800">
                                                {data.teacher?.email || data.user?.email || 'Teacher'}
                                            </h2>

                                            <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                                                <FaUsers className="shrink-0 text-lime-600" />
                                                <span>
                                                    {data.students?.length || 0} Students
                                                </span>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <h2 className="text-base font-bold text-slate-800">
                                                {data.name}
                                            </h2>

                                            <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                                                <FaChalkboardTeacher className="shrink-0 text-indigo-500" />
                                                <span className="truncate">
                                                    {data.teacher?.email || 'Teacher'}
                                                </span>
                                            </div>

                                            <div className="mt-2 flex items-center gap-2 text-sm text-slate-500">
                                                <FaUsers className="shrink-0 text-lime-600" />
                                                <span>
                                                    {data.students?.length || 0} Students
                                                </span>
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        </div>
                    )
                })}

                <div className="p-4 text-center text-sm">
                    <a
                        href={auth?.role === 'teacher'
                            ? '/dashboard/teacher/my-classes'
                            : '/dashboard/student/my-classes'}
                        className="font-bold text-indigo-500"
                    >
                        View Classes
                    </a>
                </div>
            </div>
        </div>
    )
}

export default UpComingClass