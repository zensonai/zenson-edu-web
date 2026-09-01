import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaChalkboardUser, FaUsers, FaCalendarDays, FaClock } from 'react-icons/fa6'
import useForm from '../../../hooks/useForm'
import API from '../../../services/api'
import DefaultInput from '../../../component/Form/DefaultInput'
import DateInput from '../../../component/Form/DateInput'
import DefaultButton from '../../../component/Buttons/DefaultButton'
import Toast from '../../../component/Toast/Toast'

const CreateClass = () => {
    const token = localStorage.getItem('access_token')
    const [toast, setToast] = useState(false)
    const [loading, setLoading] = useState(false)
    const [teachers, setTeachers] = useState([])
    const [students, setStudents] = useState([])

    const navigate = useNavigate()

    const { values, handleChange } = useForm({
        teacher: '',
        students: [],
        time: '',
        continue_class: false,
        day: '',
        startTime: '',
        endTime: '',
    })

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

        if (token) {
            fetchTeachers()
            fetchStudents()
        }
    }, [token])

    const handleStudentChange = (e) => {
        const selectedStudents = Array.from(
            e.target.selectedOptions,
            option => option.value
        )

        handleChange({
            target: {
                name: 'students',
                value: selectedStudents,
            },
        })
    }

    const handleContinueChange = (e) => {
        handleChange({
            target: {
                name: 'continue_class',
                value: e.target.checked,
            },
        })
    }

    const handleCreateClass = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await API.post('/class', values, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (res.data.success === true) {
                setToast({
                    success: true,
                    message: res.data.message,
                })

                setTimeout(() => {
                    navigate('/dashboard/classes')
                    window.location.reload()
                }, 3000)
            }
        } catch (err) {
            setToast({
                success: false,
                message: err.response?.data?.message || 'Something went wrong',
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full px-4 py-6 sm:px-6 lg:px-8 bg-white">
            {toast && (
                <div className="fixed top-8 right-8 z-50">
                    <Toast
                        success={toast.success}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}

            <div className="mb-8 flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
                <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                        <FaChalkboardUser className="text-xl" />
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                            Create New Class
                        </h1>

                        <p className="mt-1 text-sm leading-6 text-gray-500">
                            Create a class with a teacher, students and timetable information.
                        </p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleCreateClass} method="post">
                <div className="space-y-8">

                    <div className="rounded-xl border border-gray-200 p-5 sm:p-6">
                        <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-5">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                                <FaChalkboardUser />
                            </div>

                            <div>
                                <h2 className="text-base font-bold text-gray-900">
                                    Class Information
                                </h2>

                                <p className="mt-0.5 text-xs text-gray-500">
                                    Select the teacher and students for this class.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Teacher
                                </label>

                                <select
                                    name="teacher"
                                    value={values.teacher}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                >
                                    <option value="">
                                        Select teacher
                                    </option>

                                    {teachers.map((teacher) => (
                                        <option
                                            key={teacher._id}
                                            value={teacher.user?._id || teacher.user}
                                        >
                                            {teacher.profile
                                                ? [
                                                    teacher.profile.fname,
                                                    teacher.profile.mname,
                                                    teacher.profile.lname
                                                ].filter(Boolean).join(' ')
                                                : teacher.user?.email}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Students
                                </label>

                                <select
                                    multiple
                                    name="students"
                                    value={values.students}
                                    onChange={handleStudentChange}
                                    required
                                    className="w-full min-h-[120px] rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                >
                                    {students.map((student) => (
                                        <option
                                            key={student._id}
                                            value={student.user?._id || student.user}
                                        >
                                            {student.profile
                                                ? [
                                                    student.profile.fname,
                                                    student.profile.mname,
                                                    student.profile.lname
                                                ].filter(Boolean).join(' ')
                                                : student.user?.email}
                                        </option>
                                    ))}
                                </select>

                                <p className="mt-1 text-xs text-gray-400">
                                    Hold Ctrl or Command to select multiple students.
                                </p>
                            </div>

                        </div>
                    </div>

                    <div className="rounded-xl border border-gray-200 p-5 sm:p-6">
                        <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-5">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-violet-50 text-violet-600">
                                <FaCalendarDays />
                            </div>

                            <div>
                                <h2 className="text-base font-bold text-gray-900">
                                    Class Schedule
                                </h2>

                                <p className="mt-0.5 text-xs text-gray-500">
                                    Set the class date and timetable.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-x-5 md:grid-cols-2 xl:grid-cols-3">

                            <DateInput
                                label="Class Date"
                                name="time"
                                value={values.time}
                                onChange={handleChange}
                                required
                            />

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Day
                                </label>

                                <select
                                    name="day"
                                    value={values.day}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                >
                                    <option value="">
                                        Select day
                                    </option>
                                    <option value="monday">Monday</option>
                                    <option value="tuesday">Tuesday</option>
                                    <option value="wednesday">Wednesday</option>
                                    <option value="thursday">Thursday</option>
                                    <option value="friday">Friday</option>
                                    <option value="saturday">Saturday</option>
                                    <option value="sunday">Sunday</option>
                                </select>
                            </div>

                            <DefaultInput
                                label="Start Time"
                                name="startTime"
                                type="time"
                                value={values.startTime}
                                onChange={handleChange}
                                required
                            />

                            <DefaultInput
                                label="End Time"
                                name="endTime"
                                type="time"
                                value={values.endTime}
                                onChange={handleChange}
                                required
                            />

                        </div>
                    </div>

                    <div className="rounded-xl border border-gray-200 p-5 sm:p-6">
                        <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-5">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-green-50 text-green-600">
                                <FaClock />
                            </div>

                            <div>
                                <h2 className="text-base font-bold text-gray-900">
                                    Recurring Class
                                </h2>

                                <p className="mt-0.5 text-xs text-gray-500">
                                    Choose whether this class repeats every week.
                                </p>
                            </div>
                        </div>

                        <label className="flex cursor-pointer items-center gap-4 rounded-xl bg-green-50 p-4">
                            <input
                                type="checkbox"
                                checked={values.continue_class}
                                onChange={handleContinueChange}
                                className="h-5 w-5 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500"
                            />

                            <div>
                                <p className="text-sm font-semibold text-gray-900">
                                    Repeat this class every week
                                </p>

                                <p className="mt-1 text-xs text-gray-500">
                                    The class will continue every week at the same day and time.
                                </p>
                            </div>
                        </label>
                    </div>

                    <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:items-center sm:justify-end">
                        <DefaultButton
                            type="submit"
                            label={loading ? 'Creating...' : 'Create Class'}
                        />
                    </div>

                </div>
            </form>
        </div>
    )
}

export default CreateClass