import React, { useEffect, useState } from 'react'
import useForm from '../../../hooks/useForm'
import API from '../../../services/api'
import DefaultButton from '../../../component/Buttons/DefaultButton'
import CheckBox from '../../../component/Form/CheckBox'
import DefaultInput from '../../../component/Form/DefaultInput'
import TextAreaInput from '../../../component/Form/TextAreaInput'
import Toast from '../../../component/Toast/Toast'

const UpdatePlan = ({ plandata, token }) => {
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false)

    const { values, handleChange, setValues } = useForm({
        description: '',
        monthly_price: '',
        yearly_price: '',
        max_students: '',
        max_teachers: '',
        ai_features: false,
        analytics: false,
        online_exam: false,
    })

    useEffect(() => {
        if (plandata) {
            setValues({
                description: plandata.description || '',
                monthly_price: plandata.monthly_price || '',
                yearly_price: plandata.yearly_price || '',
                max_students: plandata.max_students || '',
                max_teachers: plandata.max_teachers || '',
                ai_features: plandata.ai_features || false,
                analytics: plandata.analytics || false,
                online_exam: plandata.online_exam || false,
            })
        }
    }, [plandata, setValues])

    const headleUpdatePlan = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const payload = {
                ...values,
                monthly_price: Number(values.monthly_price),
                yearly_price: Number(values.yearly_price),
                max_students: Number(values.max_students),
                max_teachers: Number(values.max_teachers),
            }
            const res = await API.patch(`/admin/update-plan/${plandata._id}`, payload, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (res.data.success) {
                setToast({
                    success: true,
                    message: res.data.message,
                })

                setTimeout(() => {
                    window.location.reload()
                }, 3000)
            }
        } catch (err) {
            console.log(err.response?.data?.message)
            setToast({
                success: false,
                message: err.response?.data?.message || "Something went wrong",
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="mt-8 bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
            {toast && (
                <div className="fixed top-8 right-8 z-50">
                    <Toast
                        success={toast.success}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}
            <div className="mb-8 border-b border-gray-100 pb-5">
                <h2 className="text-2xl font-bold text-gray-900">
                    Update Plan
                </h2>

                <p className="text-sm text-gray-500 mt-2">
                    Update pricing, limits and available features for this subscription plan.
                </p>
            </div>

            <form onSubmit={headleUpdatePlan} className="space-y-8">

                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">

                    <h3 className="text-lg font-semibold text-gray-800 mb-5">
                        Basic Information
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">

                        <DefaultInput
                            label="Monthly Price"
                            type="number"
                            name="monthly_price"
                            value={values.monthly_price}
                            onChange={handleChange}
                            placeholder="Enter monthly price"
                            required
                        />

                        <DefaultInput
                            label="Yearly Price"
                            type="number"
                            name="yearly_price"
                            value={values.yearly_price}
                            onChange={handleChange}
                            placeholder="Enter yearly price"
                            required
                        />

                        <DefaultInput
                            label="Maximum Students"
                            type="number"
                            name="max_students"
                            value={values.max_students}
                            onChange={handleChange}
                            placeholder="Enter maximum students"
                            required
                        />

                        <DefaultInput
                            label="Maximum Teachers"
                            type="number"
                            name="max_teachers"
                            value={values.max_teachers}
                            onChange={handleChange}
                            placeholder="Enter maximum teachers"
                            required
                        />

                    </div>

                    <div className="mt-5">
                        <TextAreaInput
                            label="Description"
                            name="description"
                            value={values.description}
                            onChange={handleChange}
                            placeholder="Enter plan description"
                            rows={5}
                            required
                        />
                    </div>

                </div>

                <div className="bg-gray-50 border border-gray-200 rounded-xl p-6">

                    <h3 className="text-lg font-semibold text-gray-800 mb-5">
                        Plan Features
                    </h3>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

                        <label className="border border-gray-200 rounded-xl bg-white p-5 hover:border-indigo-400 transition cursor-pointer">
                            <CheckBox
                                label="AI Features"
                                name="ai_features"
                                checked={values.ai_features}
                                onChange={handleChange}
                            />
                        </label>

                        <label className="border border-gray-200 rounded-xl bg-white p-5 hover:border-green-400 transition cursor-pointer">
                            <CheckBox
                                label="Analytics"
                                name="analytics"
                                checked={values.analytics}
                                onChange={handleChange}
                            />
                        </label>

                        <label className="border border-gray-200 rounded-xl bg-white p-5 hover:border-orange-400 transition cursor-pointer">
                            <CheckBox
                                label="Online Exam"
                                name="online_exam"
                                checked={values.online_exam}
                                onChange={handleChange}
                            />
                        </label>

                    </div>

                </div>

                <div className="flex justify-end pt-2">
                    <DefaultButton
                        type="submit"
                        label={loading ? "Updating Plan..." : "Update Plan"}
                    />
                </div>

            </form>

        </div>
    )
}

export default UpdatePlan