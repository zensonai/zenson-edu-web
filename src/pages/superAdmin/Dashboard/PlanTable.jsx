import React, { useEffect, useState } from 'react'
import API from '../../../services/api'

const PlanTable = () => {
    const token = localStorage.getItem('access_token')
    const [plans, setPlans] = useState([])

    useEffect(() => {
        const fetchplans = async () => {
            const res = await API.get('/admin/fetch-plans', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (res.data.success === true) {
                setPlans(res.data.result || [])
            }
        }

        if (token) {
            fetchplans()
        }
    }, [token])

    return (
        <div className="bg-white p-5 rounded-lg shadow h-[545px]">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-lg font-semibold text-gray-800">
                        Subscription Plans
                    </h1>

                    <p className="text-sm text-gray-500">
                        Overview of available subscription plans
                    </p>
                </div>

                <span className="text-xs text-indigo-500 bg-indigo-50 px-3 py-1 rounded-full">
                    {plans.length} Plans
                </span>
            </div>

            <div className="mt-5 space-y-3">
                {
                    plans.slice(0, 5).map((data, index) => {
                        return (
                            <div
                                className="flex justify-between items-center border-b border-gray-100 pb-3 last:border-none"
                                key={index}
                            >
                                <div className="flex items-center gap-3">
                                    <div className="bg-indigo-100 text-indigo-600 w-10 h-10 flex items-center justify-center rounded-lg font-semibold">
                                        {data.plan_name?.charAt(0).toUpperCase()}
                                    </div>

                                    <div>
                                        <h2 className="text-sm font-semibold text-gray-800">
                                            {data.plan_name}
                                        </h2>

                                        <p className="text-xs text-gray-500 max-w-[220px]">
                                            {
                                                data.description?.length > 50
                                                    ? `${data.description.substring(0, 50)}...`
                                                    : data.description
                                            }
                                        </p>
                                    </div>
                                </div>

                                <div className="text-right">
                                    <p className="text-sm font-semibold text-gray-800">
                                        ${data.monthly_price}.00
                                    </p>

                                    <p className="text-xs text-gray-500">
                                        ${data.yearly_price}.00 / year
                                    </p>
                                </div>
                            </div>
                        )
                    })
                }
            </div>

            <div className="mt-5">
                <a href="/dashboard/plans">
                    <button className="w-full border border-indigo-500 text-indigo-600 rounded-lg py-2 text-sm font-medium hover:bg-indigo-50 transition">
                        View More Plans
                    </button>
                </a>
            </div>
        </div>
    )
}

export default PlanTable