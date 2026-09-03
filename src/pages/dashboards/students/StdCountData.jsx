import React, { useEffect, useState } from 'react'
import {
    FaBookOpen,
    FaFileLines,
    FaMoneyBillWave,
    FaChartLine,
} from 'react-icons/fa6'
import API from '../../../services/api'

const StdCountData = () => {
    const token = localStorage.getItem('access_token')

    const [myclasses, setMyClasses] = useState([])
    const [myAssignments, setMyAssignment] = useState([])
    const [mypayments, setMyPayments] = useState([])
    const [myresult, setMyResult] = useState([])

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
        const fetchmyclass = async () => {
            const res = await API.get('/class/student-classes', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if (res.data.success === true) {
                setMyClasses(res.data.result || [])
            }
        }
        if (token) fetchmyclass()
    }, [token])

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

    const count_data = [
        {
            id: 1,
            name: 'My Classes',
            icon: FaBookOpen,
            count_value: myclasses.length,
            color: 'indigo',
        },
        {
            id: 2,
            name: 'My Assignments',
            icon: FaFileLines,
            count_value: myAssignments.length,
            color: 'lime',
        },
        {
            id: 3,
            name: 'My Payments',
            icon: FaMoneyBillWave,
            count_value: mypayments.length,
            color: 'orange',
        },
        {
            id: 4,
            name: 'My Results',
            icon: FaChartLine,
            count_value: myresult.length,
            color: 'indigo',
        },
    ]

    return (
        <div className="grid w-full grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {count_data.map((item) => {
                const Icon = item.icon

                const iconStyle =
                    item.color === 'lime'
                        ? 'bg-lime-50 text-lime-600 group-hover:bg-lime-500 group-hover:text-white'
                        : item.color === 'orange'
                            ? 'bg-orange-50 text-orange-600 group-hover:bg-orange-500 group-hover:text-white'
                            : 'bg-indigo-50 text-indigo-600 group-hover:bg-indigo-600 group-hover:text-white'

                const lineStyle =
                    item.color === 'lime'
                        ? 'bg-lime-500'
                        : item.color === 'orange'
                            ? 'bg-orange-500'
                            : 'bg-indigo-600'

                return (
                    <div
                        key={item.id}
                        className="group relative overflow-hidden rounded-[24px] border border-slate-200 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                    >
                        <div className="flex items-start justify-between">
                            <div
                                className={`flex h-14 w-14 items-center justify-center rounded-2xl shadow-sm transition-all duration-300 group-hover:shadow-lg ${iconStyle}`}
                            >
                                <Icon className="text-xl" />
                            </div>

                            <span className="rounded-full bg-slate-50 px-3 py-1 text-xs font-bold text-slate-400">
                                0{item.id}
                            </span>
                        </div>

                        <div className="mt-7">
                            <p className="text-sm font-semibold text-slate-500">
                                {item.name}
                            </p>

                            <div className="mt-3 flex items-end justify-between">
                                <span className="text-4xl font-extrabold tracking-tight text-slate-900">
                                    {item.count_value}
                                </span>

                                <div className="mb-1 h-1.5 w-14 overflow-hidden rounded-full bg-slate-100">
                                    <div
                                        className={`h-full w-1/2 rounded-full transition-all duration-500 group-hover:w-full ${lineStyle}`}
                                    />
                                </div>
                            </div>
                        </div>

                        <div
                            className={`absolute bottom-0 left-0 h-1 w-0 rounded-r-full transition-all duration-500 group-hover:w-full ${lineStyle}`}
                        />
                    </div>
                )
            })}
        </div>
    )
}

export default StdCountData