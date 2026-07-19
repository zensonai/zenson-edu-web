import React, { useState } from 'react'
import useForm from '../../../hooks/useForm'
import API from '../../../services/api'
import DefaultInput from '../../../component/Form/DefaultInput'
import TextAreaInput from '../../../component/Form/TextAreaInput'
import CheckBox from '../../../component/Form/CheckBox'
import DefaultButton from '../../../component/Buttons/DefaultButton'
import Toast from '../../../component/Toast/Toast'

const CreatePlan = () => {
    const token = localStorage.getItem('access_token')
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false)

    const { values, handleChange } = useForm({
        plan_name: '',
        description: '',
        monthly_price: '',
        yearly_price: '',
        max_students: '',
        max_teachers: '',
        ai_features: false,
        analytics: false,
        online_exam: false,
    })

    const headleCreatePlan = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const payload = {
                ...values,
                monthly_price: Number(values.monthly_price),
                yearly_price: Number(values.yearly_price),
                max_students: Number(values.max_students),
                max_teachers: Number(values.max_teachers),
            };
            const res = await API.post('/admin/create-plan', payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (res.data.success === true) {
                setToast({
                    success: true,
                    message: res.data.message,
                })
                setTimeout(() => window.location.reload(), 3000)
            }
        }
        catch (err) {
            setToast({
                success: false,
                message: err.response?.data?.message || "Something went wrong",
            })
        }
        finally {
            setLoading(false)
        }
    }

    return (
        <div className="w-full min-h-screen p-4 md:p-6">
            {toast && (
                <div className="fixed top-8 right-8 z-50">
                    <Toast
                        success={toast.success}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}
            <div className="max-w-7xl mx-auto bg-white border border-gray-100 shadow-sm">

                <div className="px-5 md:px-8 py-6 border-b border-gray-100">
                    <h1 className="text-2xl font-bold text-gray-800">
                        Create New Plan
                    </h1>

                    <p className="text-sm text-gray-500 mt-2">
                        Create subscription plans for institutes and manage features.
                    </p>
                </div>


                <form
                    onSubmit={headleCreatePlan}
                    className="p-5 md:p-8"
                >

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        <div className="md:col-span-2">
                            <DefaultInput
                                label="Enter Plan Name"
                                value={values.plan_name}
                                name="plan_name"
                                placeholder="Professional Plan"
                                required
                                onChange={handleChange}
                            />
                        </div>


                        <div className="md:col-span-2">
                            <TextAreaInput
                                label="Enter Plan Description"
                                value={values.description}
                                name="description"
                                placeholder="Describe plan features..."
                                required
                                onChange={handleChange}
                            />
                        </div>


                        <div>
                            <DefaultInput
                                label="Monthly Price"
                                type="number"
                                value={values.monthly_price}
                                name="monthly_price"
                                placeholder="2500"
                                required
                                onChange={handleChange}
                            />
                        </div>


                        <div>
                            <DefaultInput
                                label="Yearly Price"
                                type="number"
                                value={values.yearly_price}
                                name="yearly_price"
                                placeholder="25000"
                                required
                                onChange={handleChange}
                            />
                        </div>


                        <div>
                            <DefaultInput
                                label="Maximum Teachers"
                                type="number"
                                value={values.max_teachers}
                                name="max_teachers"
                                placeholder="10"
                                required
                                onChange={handleChange}
                            />
                        </div>


                        <div>
                            <DefaultInput
                                label="Maximum Students"
                                type="number"
                                value={values.max_students}
                                name="max_students"
                                placeholder="500"
                                required
                                onChange={handleChange}
                            />
                        </div>

                    </div>


                    <div className="mt-6">

                        <h2 className="text-sm font-semibold text-gray-700 mb-4">
                            Plan Features
                        </h2>


                        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">

                            <div className="border border-gray-200 p-4 hover:border-indigo-300 transition">
                                <CheckBox
                                    label="AI Features"
                                    name="ai_features"
                                    checked={values.ai_features}
                                    onChange={handleChange}
                                />
                            </div>


                            <div className="border border-gray-200 p-4 hover:border-indigo-300 transition">
                                <CheckBox
                                    label="Analytics"
                                    name="analytics"
                                    checked={values.analytics}
                                    onChange={handleChange}
                                />
                            </div>


                            <div className="border border-gray-200 p-4 hover:border-indigo-300 transition">
                                <CheckBox
                                    label="Online Exam"
                                    name="online_exam"
                                    checked={values.online_exam}
                                    onChange={handleChange}
                                />
                            </div>

                        </div>

                    </div>


                    <div className="mt-8">
                        <DefaultButton
                            type="submit"
                            label={loading ? "Creating Plan..." : "Create New Plan"}
                        />
                    </div>
                </form>
            </div>
        </div>
    )
}

export default CreatePlan