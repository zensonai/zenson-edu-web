import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { FaChalkboardUser, FaUserPlus } from 'react-icons/fa6'

import useForm from '../../../hooks/useForm'
import API from '../../../services/api'
import DefaultInput from '../../../component/Form/DefaultInput'
import TextAreaInput from '../../../component/Form/TextAreaInput'
import DateInput from '../../../component/Form/DateInput'
import DefaultButton from '../../../component/Buttons/DefaultButton'
import Toast from '../../../component/Toast/Toast'

const CreateTeacher = () => {
    const token = localStorage.getItem('access_token')
    const [toast, setToast] = useState(false)
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const { values, handleChange } = useForm({
        email: '',
        fname: '',
        mname: '',
        lname: '',
        mobile: '',
        address: '',
        dob: '',
        nic: '',
        bio: '',
    })

    const handleCreateTeacher = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await API.post('/teacher', values, {
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
                    navigate('/dashboard/teachers')
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
                        <FaUserPlus className="text-xl" />
                    </div>

                    <div>
                        <h1 className="text-2xl font-bold tracking-tight text-gray-900 sm:text-3xl">
                            Create New Teacher
                        </h1>

                        <p className="mt-1 text-sm leading-6 text-gray-500">
                            Add personal and contact information to create a new teacher profile.
                        </p>
                    </div>
                </div>
            </div>

            <form onSubmit={handleCreateTeacher} method="post">
                <div className="space-y-8">

                    <div className="rounded-xl border border-gray-200 p-5 sm:p-6">
                        <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-5">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                                <FaUserPlus />
                            </div>

                            <div>
                                <h2 className="text-base font-bold text-gray-900">
                                    Personal Information
                                </h2>

                                <p className="mt-0.5 text-xs text-gray-500">
                                    Enter the teacher's basic personal details.
                                </p>
                            </div>
                        </div>

                        <div className="grid grid-cols-1 gap-x-5 md:grid-cols-2 xl:grid-cols-3">
                            <DefaultInput
                                label="First Name"
                                name="fname"
                                value={values.fname}
                                onChange={handleChange}
                                placeholder="Enter first name"
                                required
                            />

                            <DefaultInput
                                label="Middle Name"
                                name="mname"
                                value={values.mname}
                                onChange={handleChange}
                                placeholder="Enter middle name"
                            />

                            <DefaultInput
                                label="Last Name"
                                name="lname"
                                value={values.lname}
                                onChange={handleChange}
                                placeholder="Enter last name"
                                required
                            />

                            <DefaultInput
                                label="Email Address"
                                name="email"
                                type="email"
                                value={values.email}
                                onChange={handleChange}
                                placeholder="Enter email address"
                                required
                            />

                            <DefaultInput
                                label="Mobile Number"
                                name="mobile"
                                value={values.mobile}
                                onChange={handleChange}
                                placeholder="Enter mobile number"
                                required
                            />

                            <DefaultInput
                                label="NIC Number"
                                name="nic"
                                value={values.nic}
                                onChange={handleChange}
                                placeholder="Enter NIC number"
                            />

                            <DateInput
                                label="Date of Birth"
                                name="dob"
                                value={values.dob}
                                onChange={handleChange}
                            />
                        </div>

                        <div className="grid grid-cols-1 gap-x-5 lg:grid-cols-2">
                            <TextAreaInput
                                label="Teacher's Address"
                                name="address"
                                value={values.address}
                                onChange={handleChange}
                                placeholder="Enter teacher's address"
                            />

                            <TextAreaInput
                                label="Teacher Bio"
                                name="bio"
                                value={values.bio}
                                onChange={handleChange}
                                placeholder="Enter a short bio about the teacher"
                            />
                        </div>
                    </div>

                    <div className="rounded-xl border border-gray-200 p-5 sm:p-6">
                        <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-5">
                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                                <FaChalkboardUser />
                            </div>

                            <div>
                                <h2 className="text-base font-bold text-gray-900">
                                    Teacher Information
                                </h2>

                                <p className="mt-0.5 text-xs text-gray-500">
                                    Review the teacher account information before creating.
                                </p>
                            </div>
                        </div>

                        <div className="rounded-lg bg-indigo-50 p-4">
                            <div className="flex items-center gap-3">
                                <FaChalkboardUser className="text-indigo-600" />

                                <div>
                                    <p className="text-sm font-semibold text-indigo-900">
                                        Teacher Account
                                    </p>

                                    <p className="text-xs text-indigo-600">
                                        A teacher account will be created using the provided email address.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:items-center sm:justify-end">
                        <DefaultButton
                            type="submit"
                            label={loading ? 'Creating...' : 'Create Teacher'}
                        />
                    </div>

                </div>
            </form>
        </div>
    )
}

export default CreateTeacher