import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaFileCirclePlus, FaChalkboardUser, FaCalendarDays, FaFilePdf } from 'react-icons/fa6'
import { useAuth } from '../../../context/AuthContext'
import useForm from '../../../hooks/useForm'
import API from '../../../services/api'
import DefaultInput from '../../../component/Form/DefaultInput'
import DateInput from '../../../component/Form/DateInput'
import DefaultButton from '../../../component/Buttons/DefaultButton'
import Toast from '../../../component/Toast/Toast'
import TextAreaInput from '../../../component/Form/TextAreaInput'
import FileInput from '../../../component/Form/FileInput'

const CreateAssignment = () => {
    const token = localStorage.getItem('access_token')
    const [toast, setToast] = useState(false)
    const [loading, setLoading] = useState(false)
    const [classes, setClasses] = useState([])
    const [file, setFile] = useState(null)
    const { auth } = useAuth()

    const navigate = useNavigate()

    const { values, handleChange } = useForm({
        user: auth.id,
        class: '',
        title: '',
        description: '',
        due_date: '',
    })

    useEffect(() => {
        const fetchTeacherClasses = async () => {
            try {
                const res = await API.get('/class/teacher-timetable', {
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
            fetchTeacherClasses()
        }
    }, [token])

    const handleFileChange = (e) => {
        setFile(e.target.files[0] || null)
    }

    const handleCreateAssignment = async (e) => {
        e.preventDefault()

        if (!file) {
            setToast({
                success: false,
                message: 'Please select an assignment PDF',
            })
            return
        }

        setLoading(true)

        try {
            const formData = new FormData()

            formData.append('user', values.user)
            formData.append('class', values.class)
            formData.append('title', values.title)
            formData.append('description', values.description)
            formData.append('due_date', values.due_date)
            formData.append('assigment_docs', file)

            const res = await API.post('/learn', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            })

            if (res.data.success === true) {
                setToast({
                    success: true,
                    message: res.data.message,
                })

                setTimeout(() => {
                    navigate('/dashboard/assignments')
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
                        <FaFileCirclePlus className="text-xl" />
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                            Create New Assignment
                        </h1>

                        <p className="mt-1 text-sm leading-6 text-gray-500">
                            Create an assignment with a class, title, description, due date and PDF document.
                        </p>
                    </div>

                </div>
            </div>

            <form onSubmit={handleCreateAssignment} method="post">
                <div className="space-y-8">

                    <div className="rounded-xl border border-gray-200 p-5 sm:p-6">

                        <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-5">

                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                                <FaChalkboardUser />
                            </div>

                            <div>
                                <h2 className="text-base font-bold text-gray-900">
                                    Assignment Information
                                </h2>

                                <p className="mt-0.5 text-xs text-gray-500">
                                    Select the class and provide assignment details.
                                </p>
                            </div>

                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                            <div>
                                <label className="mb-2 block text-sm font-medium text-gray-700">
                                    Class
                                </label>

                                <select
                                    name="class"
                                    value={values.class}
                                    onChange={handleChange}
                                    required
                                    className="w-full rounded-xl border border-gray-200 bg-white px-4 py-3 text-sm text-gray-700 outline-none focus:border-indigo-500 focus:ring-2 focus:ring-indigo-100"
                                >
                                    <option value="">
                                        Select class
                                    </option>

                                    {classes.map((classItem, index) => (
                                        <option
                                            key={classItem.class?._id}
                                            value={classItem.class?._id}
                                        >
                                            Class {index + 1} - {classItem.startTime?.replace(':', '.')}
                                        </option>
                                    ))}
                                </select>
                            </div>

                            <DefaultInput
                                label="Assignment Title"
                                name="title"
                                type="text"
                                value={values.title}
                                onChange={handleChange}
                                placeholder={"Assignment Title"}
                                required
                            />

                            <div className="md:col-span-2">
                                <TextAreaInput
                                    label="Description"
                                    name="description"
                                    value={values.description}
                                    onChange={handleChange}
                                    placeholder="Enter assignment description..."
                                    required
                                />
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
                                    Assignment Schedule
                                </h2>

                                <p className="mt-0.5 text-xs text-gray-500">
                                    Set the deadline for this assignment.
                                </p>
                            </div>

                        </div>

                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2">

                            <DateInput
                                label="Due Date"
                                name="due_date"
                                value={values.due_date}
                                onChange={handleChange}
                                required
                            />

                        </div>
                    </div>

                    <div className="rounded-xl border border-gray-200 p-5 sm:p-6">

                        <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-5">

                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-600">
                                <FaFilePdf />
                            </div>

                            <div>
                                <h2 className="text-base font-bold text-gray-900">
                                    Assignment Document
                                </h2>

                                <p className="mt-0.5 text-xs text-gray-500">
                                    Upload the assignment document as a PDF file.
                                </p>
                            </div>

                        </div>

                        <div>
                            <FileInput
                                label="Assignment PDF"
                                name="assigment_docs"
                                accept=".pdf,application/pdf"
                                onChange={handleFileChange}
                                required
                            />

                            {file && (
                                <div className="mt-3 flex items-center gap-2 text-sm text-gray-600">
                                    <FaFilePdf className="text-red-500" />
                                    <span>{file.name}</span>
                                </div>
                            )}
                        </div>

                    </div>

                    <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:items-center sm:justify-end">

                        <DefaultButton
                            type="submit"
                            label={loading ? 'Creating...' : 'Create Assignment'}
                        />

                    </div>

                </div>
            </form>
        </div>
    )
}

export default CreateAssignment