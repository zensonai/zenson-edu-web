import React, { useEffect, useState } from 'react'
import useForm from '../../../hooks/useForm'
import API from '../../../services/api'
import DefaultInput from '../../../component/Form/DefaultInput'
import DateInput from '../../../component/Form/DateInput'
import TextAreaInput from '../../../component/Form/TextAreaInput'
import DefaultButton from '../../../component/Buttons/DefaultButton'
import Toast from '../../../component/Toast/Toast'

const UpdateTeacher = ({
    token,
    teacher
}) => {
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false)

    const { values, handleChange, setValues } = useForm({
        fname: '',
        mname: '',
        lname: '',
        mobile: '',
        address: '',
        dob: '',
        nic: '',
        bio: ''
    })

    useEffect(() => {
        if (teacher?.profile) {
            setValues({
                fname: teacher.profile.fname || '',
                mname: teacher.profile.mname || '',
                lname: teacher.profile.lname || '',
                mobile: teacher.profile.mobile || '',
                address: teacher.profile.address || '',
                dob: teacher.profile.dob
                    ? teacher.profile.dob.split('T')[0]
                    : '',
                nic: teacher.profile.nic || '',
                bio: teacher.profile.bio || ''
            })
        }
    }, [teacher, setValues])

    const handleUpdateTeacher = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await API.patch(
                `/teacher/${teacher._id}`,
                values,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            if (res.data.success === true) {
                setToast({
                    success: true,
                    message: res.data.message,
                })

                setTimeout(() => {
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

            <div className="mb-4 border-b border-gray-200 pb-2">
                <h1 className="text-2xl font-bold">
                    Update Teacher
                </h1>

                <p className="text-gray-500">
                    Update teacher data
                </p>
            </div>

            <form onSubmit={handleUpdateTeacher}>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-5">

                    <DefaultInput
                        label="NIC Number"
                        name="nic"
                        value={values.nic}
                        onChange={handleChange}
                        placeholder="Enter NIC number"
                    />

                    <DefaultInput
                        label="First Name"
                        name="fname"
                        value={values.fname}
                        onChange={handleChange}
                        placeholder="Enter first name"
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
                    />

                    <DefaultInput
                        label="Mobile Number"
                        name="mobile"
                        value={values.mobile}
                        onChange={handleChange}
                        placeholder="Enter mobile number"
                    />

                    <DateInput
                        label="Date of Birth"
                        name="dob"
                        value={values.dob}
                        onChange={handleChange}
                    />

                </div>

                <TextAreaInput
                    label="Address"
                    name="address"
                    value={values.address}
                    onChange={handleChange}
                    placeholder="Enter teacher's address"
                />

                <TextAreaInput
                    label="Bio"
                    name="bio"
                    value={values.bio}
                    onChange={handleChange}
                    placeholder="Enter teacher's bio"
                />

                <div className="flex justify-end pt-4">

                    <DefaultButton
                        type="submit"
                        label={loading ? 'Updating...' : 'Update Teacher'}
                    />

                </div>

            </form>

        </div>
    )
}

export default UpdateTeacher