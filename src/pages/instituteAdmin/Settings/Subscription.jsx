import React, { useEffect, useState } from 'react'
import API from '../../../services/api'
import { Check, X } from 'lucide-react'
import { jwtDecode } from "jwt-decode";

const Subscription = () => {
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
        <div className="min-h-screen px-4 py-8 sm:px-6 lg:px-8">
            <div className="mx-auto max-w-7xl">

                <div className="mb-10 text-center">
                    <h1 className="text-3xl font-bold text-slate-900 sm:text-4xl">
                        Subscription Plans
                    </h1>

                    <p className="mt-2 text-sm text-slate-500">
                        Choose the right plan for your school
                    </p>
                </div>

                <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {
                        plans.map((data, index) => {
                            return (
                                <div
                                    key={index}
                                    className={`flex flex-col rounded-3xl border bg-white p-6 transition duration-300 hover:-translate-y-1 hover:shadow-xl ${index === 1
                                        ? 'border-indigo-600 ring-2 ring-indigo-100'
                                        : 'border-slate-200'
                                        }`}
                                >
                                    {
                                        index === 1 &&
                                        <span className="mb-4 w-fit rounded-full bg-indigo-600 px-3 py-1 text-xs font-semibold text-white">
                                            POPULAR
                                        </span>
                                    }

                                    <h2 className="text-2xl font-bold text-slate-900">
                                        {data.plan_name}
                                    </h2>

                                    <p className="mt-2 line-clamp-1 text-sm text-slate-500">
                                        {data.description}
                                    </p>

                                    <div className="mt-6">
                                        <div className="flex items-end">
                                            <span className="text-4xl font-extrabold text-indigo-600">
                                                Rs. {Number(data.monthly_price).toLocaleString()}
                                            </span>

                                            <span className="mb-1 ml-2 text-sm text-slate-500">
                                                /month
                                            </span>
                                        </div>

                                        <p className="mt-2 text-sm text-slate-500">
                                            Rs. {Number(data.yearly_price).toLocaleString()} yearly
                                        </p>
                                    </div>

                                    <div className="my-6 border-t"></div>

                                    <div className="space-y-3">
                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-500">Students</span>
                                            <b>{data.max_students}</b>
                                        </div>

                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-500">Teachers</span>
                                            <b>{data.max_teachers}</b>
                                        </div>

                                        <div className="flex justify-between text-sm">
                                            <span className="text-slate-500">Parents</span>
                                            <b>{data.max_parents}</b>
                                        </div>
                                    </div>

                                    <div className="my-6 border-t"></div>

                                    <div className="space-y-4">
                                        {
                                            [
                                                ['AI Features', data.ai_features],
                                                ['Analytics Dashboard', data.analytics],
                                                ['Online Examination', data.online_exam],
                                            ].map((item, i) => {
                                                return (
                                                    <div key={i} className="flex items-center gap-3">
                                                        {
                                                            item[1]
                                                                ? <Check className="h-5 w-5 rounded-full bg-indigo-600 p-1 text-white" />
                                                                : <X className="h-5 w-5 rounded-full bg-slate-300 p-1 text-white" />
                                                        }

                                                        <span className="text-sm text-slate-700">
                                                            {item[0]}
                                                        </span>
                                                    </div>
                                                )
                                            })
                                        }
                                    </div>

                                    <button
                                        className={`mt-8 w-full rounded-xl py-3 font-semibold transition active:scale-95 ${index === 1
                                            ? 'bg-indigo-600 text-white hover:bg-indigo-700'
                                            : 'bg-slate-900 text-white hover:bg-slate-800'
                                            }`}
                                    >
                                        Buy Plan
                                    </button>

                                </div>
                            )
                        })
                    }
                </div>

            </div>
        </div>
    )
}

export default Subscription