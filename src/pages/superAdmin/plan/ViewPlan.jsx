import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../../../services/api'
import UpdatePlan from './UpdatePlan'

const ViewPlan = () => {
    const { id } = useParams()
    const [plan, setPlan] = useState()
    const token = localStorage.getItem("access_token")

    useEffect(() => {
        const fetchplan = async () => {
            const res = await API.get(`/admin/fetch-plan/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (res.data.success === true) {
                setPlan(res.data.result)
            }
        }

        if (token) fetchplan()
    }, [token, id])

    return (
        <div className="p-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">

                <div className="lg:col-span-2 bg-white border border-gray-200 rounded-xl overflow-hidden">

                    <div className="bg-gradient-to-r from-indigo-600 to-blue-600 p-5 text-white">
                        <div>
                            <h1 className="text-2xl font-bold">
                                {plan?.plan_name}
                            </h1>

                            <p className="mt-2 text-sm text-indigo-100 leading-6">
                                {plan?.description}
                            </p>
                        </div>

                        <div className={`inline-block mt-4 px-3 py-1 rounded-full text-sm font-semibold ${plan?.status ? "bg-green-500" : "bg-red-500"}`}>
                            {plan?.status ? "Active" : "Inactive"}
                        </div>
                    </div>

                    <div className="p-5">

                        <h2 className="text-lg font-semibold mb-4">
                            Plan Limits
                        </h2>

                        <div className="grid grid-cols-3 gap-3">

                            <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4 text-center">
                                <p className="text-xs text-indigo-600">
                                    Students
                                </p>

                                <h2 className="text-2xl font-bold text-indigo-700 mt-1">
                                    {plan?.max_students}
                                </h2>
                            </div>

                            <div className="bg-green-50 border border-green-100 rounded-lg p-4 text-center">
                                <p className="text-xs text-green-600">
                                    Teachers
                                </p>

                                <h2 className="text-2xl font-bold text-green-700 mt-1">
                                    {plan?.max_teachers}
                                </h2>
                            </div>

                            <div className="bg-orange-50 border border-orange-100 rounded-lg p-4 text-center">
                                <p className="text-xs text-orange-600">
                                    Parents
                                </p>

                                <h2 className="text-2xl font-bold text-orange-700 mt-1">
                                    {plan?.max_parents}
                                </h2>
                            </div>

                        </div>

                        <div className="mt-6">

                            <h2 className="text-lg font-semibold mb-4">
                                Features
                            </h2>

                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                                <div className={`border rounded-lg p-4 ${plan?.analytics ? "bg-green-50 border-green-200" : "bg-gray-50 border-gray-200"}`}>
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-semibold text-sm">
                                            Analytics
                                        </h3>

                                        <span className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${plan?.analytics ? "bg-green-500 text-white" : "bg-gray-300 text-white"}`}>
                                            {plan?.analytics ? "✓" : "✕"}
                                        </span>
                                    </div>

                                    <p className="text-xs text-gray-500 mt-2">
                                        Reports & insights
                                    </p>
                                </div>

                                <div className={`border rounded-lg p-4 ${plan?.online_exam ? "bg-indigo-50 border-indigo-200" : "bg-gray-50 border-gray-200"}`}>
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-semibold text-sm">
                                            Online Exams
                                        </h3>

                                        <span className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${plan?.online_exam ? "bg-indigo-500 text-white" : "bg-gray-300 text-white"}`}>
                                            {plan?.online_exam ? "✓" : "✕"}
                                        </span>
                                    </div>

                                    <p className="text-xs text-gray-500 mt-2">
                                        Quiz & exam system
                                    </p>
                                </div>

                                <div className={`border rounded-lg p-4 ${plan?.ai_features ? "bg-purple-50 border-purple-200" : "bg-gray-50 border-gray-200"}`}>
                                    <div className="flex items-center justify-between">
                                        <h3 className="font-semibold text-sm">
                                            AI Features
                                        </h3>

                                        <span className={`w-8 h-8 flex items-center justify-center rounded-full font-bold ${plan?.ai_features ? "bg-purple-500 text-white" : "bg-gray-300 text-white"}`}>
                                            {plan?.ai_features ? "✓" : "✕"}
                                        </span>
                                    </div>

                                    <p className="text-xs text-gray-500 mt-2">
                                        AI assistant
                                    </p>
                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                <div className="space-y-4">

                    <div className="bg-white border border-gray-200 rounded-xl p-5">

                        <h2 className="text-lg font-semibold mb-4">
                            Pricing
                        </h2>

                        <div className="space-y-3">

                            <div className="bg-indigo-50 border border-indigo-100 rounded-lg p-4">
                                <p className="text-xs text-gray-500">
                                    Monthly
                                </p>

                                <h2 className="text-2xl font-bold text-indigo-700 mt-1">
                                    Rs. {plan?.monthly_price?.toLocaleString()}
                                </h2>
                            </div>

                            <div className="bg-green-50 border border-green-100 rounded-lg p-4">
                                <p className="text-xs text-gray-500">
                                    Yearly
                                </p>

                                <h2 className="text-2xl font-bold text-green-700 mt-1">
                                    Rs. {plan?.yearly_price?.toLocaleString()}
                                </h2>
                            </div>

                        </div>

                    </div>

                    <div className="bg-white border border-gray-200 rounded-xl p-5">

                        <h2 className="text-lg font-semibold mb-4">
                            Information
                        </h2>

                        <div className="space-y-4 text-sm">

                            <div>
                                <p className="text-gray-500">
                                    Plan ID
                                </p>

                                <p className="font-medium break-all">
                                    {plan?._id}
                                </p>
                            </div>

                            <div>
                                <p className="text-gray-500">
                                    Created At
                                </p>

                                <p className="font-medium">
                                    {plan?.createdAt ? new Date(plan.createdAt).toLocaleString() : "-"}
                                </p>
                            </div>

                            <div>
                                <p className="text-gray-500">
                                    Updated At
                                </p>

                                <p className="font-medium">
                                    {plan?.updatedAt ? new Date(plan.updatedAt).toLocaleString() : "-"}
                                </p>
                            </div>

                        </div>

                    </div>

                </div>
            </div>

            <div className="">
                <UpdatePlan
                    plandata={plan}
                    token={token}
                />
            </div>
        </div>
    )
}

export default ViewPlan