import React, { useEffect, useState } from 'react'
import useForm from '../../../hooks/useForm'
import API from '../../../services/api'
import DefaultButton from '../../../component/Buttons/DefaultButton'
import Toast from '../../../component/Toast/Toast'

const UpdateClass = ({
    token,
    classes
}) => {
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false)
    const [teachers, setTeachers] = useState([])
    const [students, setStudents] = useState([])

    const { values, handleChange, setValues } = useForm({
        teacher: '',
        students: [],
        time: '',
        continue_class: false,
        day: '',
        startTime: '',
        endTime: '',
        status: ''
    })

    useEffect(() => {
        if (classes) {
            setValues({
                teacher: classes.teacher?._id || '',
                students: classes.students?.map(student => student._id) || [],
                time: classes.time
                    ? new Date(classes.time).toISOString().slice(0, 16)
                    : '',
                continue_class: classes.continue_class || false,
                day: classes.timetable?.day || '',
                startTime: classes.timetable?.startTime || '',
                endTime: classes.timetable?.endTime || '',
                status: classes.status || ''
            })
        }
    }, [classes, setValues])

    useEffect(() => {
        const fetchData = async () => {
            try {
                const [teacherRes, studentRes] = await Promise.all([
                    API.get('/teacher', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    }),
                    API.get('/student', {
                        headers: {
                            Authorization: `Bearer ${token}`
                        }
                    })
                ])

                if (teacherRes.data.success === true) {
                    setTeachers(teacherRes.data.result || [])
                }

                if (studentRes.data.success === true) {
                    setStudents(studentRes.data.result || [])
                }
            } catch (err) {
                setToast({
                    success: false,
                    message:
                        err.response?.data?.message ||
                        'Failed to load teachers and students'
                })
            }
        }

        if (token) {
            fetchData()
        }
    }, [token])

    const addStudent = (studentId) => {
        if (!studentId) return

        if (values.students.includes(studentId)) {
            return
        }

        setValues(prev => ({
            ...prev,
            students: [...prev.students, studentId]
        }))
    }

    const removeStudent = (studentId) => {
        setValues(prev => ({
            ...prev,
            students: prev.students.filter(id => id !== studentId)
        }))
    }

    const handleUpdateClass = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await API.patch(
                `/class/${classes._id}`,
                values,
                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }
            )

            if (res.data.success === true) {
                setToast({
                    success: true,
                    message: res.data.message
                })

                setTimeout(() => {
                    window.location.reload()
                }, 3000)
            }
        } catch (err) {
            setToast({
                success: false,
                message:
                    err.response?.data?.message ||
                    'Something went wrong'
            })
        } finally {
            setLoading(false)
        }
    }

    const selectedStudents = students.filter(student =>
        values.students.includes(
            student.user?._id || student.user
        )
    )

    return (
        <div className="bg-white rounded-xl border border-gray-200 p-5 sm:p-6">

            {toast && (
                <div className="fixed top-8 right-8 z-50">
                    <Toast
                        success={toast.success}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}

            <div className="mb-6 border-b border-gray-200 pb-4">
                <h1 className="text-2xl font-bold text-gray-900">
                    Update Class
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    Update class information and schedule.
                </p>
            </div>

            <form onSubmit={handleUpdateClass}>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5">

                    <div className="mb-5">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Teacher
                        </label>

                        <select
                            name="teacher"
                            value={values.teacher}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                            required
                        >
                            <option value="">
                                Select Teacher
                            </option>

                            {teachers.map(teacher => (
                                <option
                                    key={teacher._id}
                                    value={teacher.user?._id || teacher.user}
                                >
                                    {teacher.user?.email || '-'}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div className="mb-5">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Add Student
                        </label>

                        <select
                            value=""
                            onChange={(e) => addStudent(e.target.value)}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                        >
                            <option value="">
                                Select Student
                            </option>

                            {students
                                .filter(student =>
                                    !values.students.includes(
                                        student.user?._id || student.user
                                    )
                                )
                                .map(student => (
                                    <option
                                        key={student._id}
                                        value={student.user?._id || student.user}
                                    >
                                        {student.user?.email || '-'}
                                    </option>
                                ))}
                        </select>
                    </div>

                </div>

                <div className="mb-6">

                    <label className="block text-sm font-medium text-gray-700 mb-2">
                        Selected Students
                    </label>

                    <div className="min-h-[60px] rounded-lg border border-gray-200 p-3">

                        {selectedStudents.length === 0 ? (
                            <p className="text-sm text-gray-400">
                                No students selected
                            </p>
                        ) : (
                            <div className="flex flex-wrap gap-2">

                                {selectedStudents.map(student => {

                                    const studentId =
                                        student.user?._id ||
                                        student.user

                                    return (
                                        <div
                                            key={student._id}
                                            className="flex items-center gap-2 rounded-lg bg-indigo-50 border border-indigo-100 px-3 py-2"
                                        >
                                            <span className="text-sm text-indigo-700 break-all">
                                                {student.user?.email || '-'}
                                            </span>

                                            <button
                                                type="button"
                                                onClick={() =>
                                                    removeStudent(studentId)
                                                }
                                                className="w-5 h-5 flex items-center justify-center rounded-full bg-indigo-600 text-white text-xs hover:bg-red-500 transition"
                                            >
                                                ×
                                            </button>
                                        </div>
                                    )
                                })}

                            </div>
                        )}

                    </div>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5">

                    <div className="mb-5">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Class Date & Time
                        </label>

                        <input
                            type="datetime-local"
                            name="time"
                            value={values.time}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                            required
                        />
                    </div>

                    <div className="mb-5">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Day
                        </label>

                        <select
                            name="day"
                            value={values.day}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                            required
                        >
                            <option value="">
                                Select Day
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

                    <div className="mb-5">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Start Time
                        </label>

                        <input
                            type="time"
                            name="startTime"
                            value={values.startTime}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                            required
                        />
                    </div>

                    <div className="mb-5">
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            End Time
                        </label>

                        <input
                            type="time"
                            name="endTime"
                            value={values.endTime}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                            required
                        />
                    </div>

                    <div className="mb-5 flex items-center gap-3">

                        <input
                            type="checkbox"
                            name="continue_class"
                            checked={values.continue_class}
                            onChange={(e) =>
                                setValues(prev => ({
                                    ...prev,
                                    continue_class: e.target.checked
                                }))
                            }
                            className="w-4 h-4"
                        />

                        <label className="text-sm font-medium text-gray-700">
                            Repeat this class every week
                        </label>

                    </div>

                    <div className="mb-5">

                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Status
                        </label>

                        <select
                            name="status"
                            value={values.status}
                            onChange={handleChange}
                            className="w-full rounded-lg border border-gray-300 px-4 py-2.5 text-sm outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                        >
                            <option value="">
                                Select Status
                            </option>

                            <option value="active">
                                Active
                            </option>

                            <option value="inactive">
                                Inactive
                            </option>
                        </select>

                    </div>

                </div>

                <div className="flex justify-end border-t border-gray-200 pt-5">

                    <DefaultButton
                        type="submit"
                        label={loading ? 'Updating...' : 'Update Class'}
                    />

                </div>

            </form>

        </div>
    )
}

export default UpdateClass