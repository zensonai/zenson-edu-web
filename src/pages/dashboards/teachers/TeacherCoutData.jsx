import React, { useEffect, useState } from 'react'
import {
    FaBookOpen,
    FaFileLines,
    FaMoneyBillWave,
    FaUsers,
} from 'react-icons/fa6'
import API from '../../../services/api'

const CoutData = () => {
    const token = localStorage.getItem('access_token')

    const [classes, setClasses] = useState([])
    const [mypayments, setMyPayments] = useState([])
    const [teacherAssignments, setTeacherAssignments] = useState([])

    useEffect(() => {
        const fetchteacherclasses = async () => {
            const res = await API.get('/class/teacher-classes', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (res.data.success === true) {
                setClasses(res.data.result || [])
            }
        }

        if (token) {
            fetchteacherclasses()
        }
    }, [token])

    useEffect(() => {
        const fetchmypayments = async () => {
            const res = await API.get('/payment/fetch-my-payments', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (res.data.success === true) {
                setMyPayments(res.data.result || [])
            }
        }

        if (token) {
            fetchmypayments()
        }
    }, [token])

    useEffect(() => {
        const fetchassignments = async () => {
            const res = await API.get(`/learn/teacher-assigments`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (res.data.success === true) {
                setTeacherAssignments(res.data.result)
            }
        }

        if (token) fetchassignments()
    }, [token])

    const classCount = classes.length

    const students = classes.flatMap((classItem) => {
        return classItem.students || []
    })

    const uniqueStudents = [
        ...new Map(
            students.map((student) => [
                student._id,
                student,
            ])
        ).values(),
    ]

    const studentCount = uniqueStudents.length

    const count_data = [
        {
            id: 1,
            name: 'My Students',
            icon: FaUsers,
            count_value: studentCount,
        },
        {
            id: 2,
            name: 'My Classes',
            icon: FaBookOpen,
            count_value: classCount,
        },
        {
            id: 3,
            name: 'My Assignments',
            icon: FaFileLines,
            count_value: teacherAssignments.length,
        },
        {
            id: 4,
            name: 'My Payments',
            icon: FaMoneyBillWave,
            count_value: mypayments.length,
        },
    ]

    return (
        <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 2xl:grid-cols-4">
            {count_data.map((item, index) => {
                const Icon = item.icon

                const styles = [
                    {
                        icon: 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-indigo-200',
                        glow: 'bg-indigo-100',
                        badge: 'bg-indigo-50 text-indigo-600',
                        line: 'bg-indigo-600',
                    },
                    {
                        icon: 'bg-lime-50 text-lime-600 group-hover:bg-lime-500 group-hover:text-white group-hover:shadow-lime-200',
                        glow: 'bg-lime-100',
                        badge: 'bg-lime-50 text-lime-700',
                        line: 'bg-lime-500',
                    },
                    {
                        icon: 'bg-orange-50 text-orange-600 group-hover:bg-orange-500 group-hover:text-white group-hover:shadow-orange-200',
                        glow: 'bg-orange-100',
                        badge: 'bg-orange-50 text-orange-600',
                        line: 'bg-orange-500',
                    },
                    {
                        icon: 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white group-hover:shadow-indigo-200',
                        glow: 'bg-indigo-100',
                        badge: 'bg-indigo-50 text-indigo-600',
                        line: 'bg-indigo-600',
                    },
                ][index]

                return (
                    <div
                        key={item.id}
                        className="group relative overflow-hidden rounded-[24px] border border-slate-200/80 bg-white p-6 shadow-[0_4px_20px_rgba(15,23,42,0.04)] transition-all duration-300 hover:-translate-y-1.5 hover:border-slate-300 hover:shadow-[0_20px_45px_rgba(15,23,42,0.10)]"
                    >
                        <div
                            className={`absolute -right-12 -top-12 h-32 w-32 rounded-full ${styles.glow} opacity-0 blur-3xl transition-all duration-500 group-hover:opacity-70`}
                        />

                        <div className="relative flex items-start justify-between">
                            <div
                                className={`flex h-14 w-14 items-center justify-center rounded-2xl shadow-sm ring-1 ring-slate-100 transition-all duration-300 group-hover:shadow-lg ${styles.icon}`}
                            >
                                <Icon className="text-xl" />
                            </div>

                            <div
                                className={`flex h-9 min-w-9 items-center justify-center rounded-full px-3 text-xs font-bold ${styles.badge}`}
                            >
                                0{item.id}
                            </div>
                        </div>

                        <div className="relative mt-7">
                            <p className="text-sm font-semibold text-slate-500">
                                {item.name}
                            </p>

                            <div className="mt-3 flex items-end justify-between">
                                <span className="text-4xl font-extrabold leading-none tracking-tight text-slate-900">
                                    {item.count_value}
                                </span>

                                <div className="mb-1 h-1.5 w-14 overflow-hidden rounded-full bg-slate-100">
                                    <div
                                        className={`h-full w-1/2 rounded-full transition-all duration-500 group-hover:w-full ${styles.line}`}
                                    />
                                </div>
                            </div>
                        </div>

                        <div
                            className={`absolute bottom-0 left-0 h-1 w-0 rounded-r-full transition-all duration-500 group-hover:w-full ${styles.line}`}
                        />
                    </div>
                )
            })}
        </div>
    )
}

export default CoutData