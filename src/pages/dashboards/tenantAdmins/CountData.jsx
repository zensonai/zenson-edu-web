import React, { useEffect, useState } from 'react'
import { FaUserGraduate, FaChalkboardTeacher, FaClipboardList, FaSchool } from 'react-icons/fa'
import API from '../../../services/api'

const CountData = () => {
    const token = localStorage.getItem('access_token')
    const [students, setStudents] = useState([])
    const [teachers, setTeachers] = useState([])
    const [assigments, setAssignments] = useState([])
    const [classes, setClasses] = useState([])

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

    useEffect(() => {
        const fetchClasses = async () => {
            const res = await API.get('/class', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (res.data.success === true) {
                setClasses(res.data.result || [])
            }
        }

        if (token) fetchClasses()
    }, [token])

    useEffect(() => {
        const fetchassignments = async () => {
            const res = await API.get('/learn/tenant-assigments', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if (res.data.success === true) {
                setAssignments(res.data.result)
            }
        }

        if (token) fetchassignments()
    }, [token])

    const countdata = [
        {
            id: 1,
            name: 'Students',
            icon: FaUserGraduate,
            count_value: students.length,
        },
        {
            id: 2,
            name: 'Teachers',
            icon: FaChalkboardTeacher,
            count_value: teachers.length,
        },
        {
            id: 3,
            name: 'Assignments',
            icon: FaClipboardList,
            count_value: assigments.length,
        },
        {
            id: 4,
            name: 'Classes',
            icon: FaSchool,
            count_value: classes.length,
        },
    ]

    return (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {countdata.map((item, index) => {
                const Icon = item.icon
                const styles = [
                    {
                        bg: 'bg-indigo-50',
                        icon: 'bg-indigo-600 text-white',
                        accent: 'bg-indigo-600',
                    },
                    {
                        bg: 'bg-orange-50',
                        icon: 'bg-orange-500 text-white',
                        accent: 'bg-orange-500',
                    },
                    {
                        bg: 'bg-lime-50',
                        icon: 'bg-lime-500 text-white',
                        accent: 'bg-lime-500',
                    },
                    {
                        bg: 'bg-indigo-50',
                        icon: 'bg-indigo-600 text-white',
                        accent: 'bg-indigo-600',
                    },
                ][index]

                return (
                    <div
                        key={item.id}
                        className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
                    >
                        <div className={`absolute left-0 top-0 h-full w-1 ${styles.accent}`} />

                        <div className="flex items-start justify-between">
                            <div>
                                <p className="text-sm font-medium text-gray-500">
                                    {item.name}
                                </p>

                                <p className="mt-3 text-3xl font-bold tracking-tight text-gray-900">
                                    {item.count_value}
                                </p>

                                <p className="mt-1 text-xs text-gray-400">
                                    Total {item.name.toLowerCase()}
                                </p>
                            </div>

                            <div
                                className={`flex h-14 w-14 items-center justify-center rounded-xl ${styles.icon} shadow-sm transition-transform duration-300 group-hover:scale-110`}
                            >
                                <Icon className="text-xl" />
                            </div>
                        </div>

                        <div className={`mt-5 h-1 w-12 rounded-full ${styles.accent}`} />
                    </div>
                )
            })}
        </div>
    )
}

export default CountData