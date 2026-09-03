import React, { useEffect, useState } from 'react'
import API from '../../services/api'
import DefaultButton from '../../component/Buttons/DefaultButton'
import { useAuth } from '../../context/AuthContext'

const MyClasses = () => {
    const token = localStorage.getItem('access_token')
    const [classes, setClasses] = useState([])

    useEffect(() => {
        const fetchteacherclasses = async () => {
            try {
                const res = await API.get('/class/teacher-classes', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (res.data.success === true) {
                    setClasses(res.data.result || [])
                }
            } catch (error) {
                setClasses([])
            }
        }

        if (token) {
            fetchteacherclasses()
        }
    }, [token])

    return (
        <div className="p-4 sm:p-6">

            <div>
                <h1 className="text-2xl font-bold text-gray-900">
                    My Classes
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Classes assigned to you
                </p>
            </div>

            <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">

                {
                    classes.map((data, index) => {

                        const teacher = data.teacher
                        const students = data.students || []

                        return (
                            <div
                                key={data._id || index}
                                className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm"
                            >

                                <div className="flex items-start justify-between gap-3">

                                    <div>
                                        <h2 className="text-lg font-bold text-gray-900">
                                            Class
                                        </h2>

                                        <p className="mt-1 text-sm text-gray-500">
                                            {data.time
                                                ? new Date(data.time).toLocaleDateString()
                                                : '-'}
                                        </p>
                                    </div>

                                    <span className="rounded-full bg-green-100 px-3 py-1 text-xs font-medium text-green-700">
                                        {data.status || 'active'}
                                    </span>

                                </div>

                                <div className="mt-5 space-y-3">

                                    <div>
                                        <p className="text-xs text-gray-400">
                                            Teacher
                                        </p>

                                        <p className="text-sm font-medium text-gray-800">
                                            {teacher?.email || '-'}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-400">
                                            Students
                                        </p>

                                        <p className="text-sm font-medium text-gray-800">
                                            {students.length}
                                        </p>
                                    </div>

                                    <div>
                                        <p className="text-xs text-gray-400">
                                            Class Type
                                        </p>

                                        <p className="text-sm font-medium text-gray-800">
                                            {data.continue_class
                                                ? 'Weekly'
                                                : 'One Time'}
                                        </p>
                                    </div>

                                </div>

                                <div className="mt-5">
                                    <a
                                        href={`/dashboard/view-my-class/${data._id}`}
                                    >
                                        <DefaultButton 
                                            label='View Class'
                                        />
                                    </a>
                                </div>

                            </div>
                        )
                    })
                }

            </div>

        </div>
    )
}

export default MyClasses