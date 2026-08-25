import React, { useState } from 'react'
import useForm from '../../../hooks/useForm'
import API from '../../../services/api'
import DefaultInput from '../../../component/Form/DefaultInput'
import DefaultButton from '../../../component/Buttons/DefaultButton'
import Toast from '../../../component/Toast/Toast'

const AssignTeacher = () => {
    const token = localStorage.getItem('access_token')
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false)
    const [teacher, setTeacher] = useState()

    const { values, handleChange } = useForm({
        email: '',
    });

    const headleAssignTeacher = async (e) => {
        e.preventDefault();
        setLoading(true)

        try {
            const res = await API.post('/tenant/assign-teacher', values, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if (res.data.success === true) {
                setToast({
                    success: true,
                    message: res.data.message,
                });
                setTimeout(window.location.reload(), 3000);
            }
        }
        catch (err) {
            setToast({
                success: false,
                message: err.response?.data?.message || "Something went wrong",
            });
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className="bg-gray-50 px-4 py-6 sm:px-6 lg:px-8">
            {toast && (
                <div className="fixed top-8 right-8 z-50">
                    <Toast
                        success={toast.success}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}

            <div className="mx-auto w-full max-w-2xl">
                <div className="mb-6">
                    <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                        Assign Teacher
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Assign a teacher by entering their registered email address.
                    </p>
                </div>

                <div className="rounded-2xl bg-white p-5 shadow-sm ring-1 ring-gray-100 sm:p-8">
                    <form onSubmit={headleAssignTeacher} method="post">
                        <div className="space-y-6">
                            <DefaultInput
                                label={"Enter Teacher Email Address"}
                                type='email'
                                value={values.email}
                                name={'email'}
                                placeholder={"teacher@example.com"}
                                onChange={handleChange}
                            />

                            <div className="flex w-full justify-end">
                                <div className="w-full sm:w-auto">
                                    <DefaultButton
                                        type='submit'
                                        label={loading ? 'Assiniing Teacher' : 'Assing Teacher'}
                                    />
                                </div>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default AssignTeacher