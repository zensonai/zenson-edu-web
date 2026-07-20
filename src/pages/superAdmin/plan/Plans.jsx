import React, { useEffect, useState } from 'react'
import API from '../../../services/api'
import { FaEye, FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { exportToCSV } from '../../../utils/dataexport'
import DefaultButton from '../../../component/Buttons/DefaultButton'

const Plans = () => {
    const token = localStorage.getItem('access_token')

    const [plans, setPlans] = useState([])
    const [search, setSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(1)

    const plansPerPage = 15

    const handleExport = () => {
        exportToCSV(
            filteredPlans,
            [
                {
                    header: "#",
                    value: (_, index) => index + 1
                },
                {
                    header: "Plan",
                    value: "plan_name"
                },
                {
                    header: "Description",
                    value: "description"
                },
                {
                    header: "Monthly Price",
                    value: "monthly_price"
                },
                {
                    header: "Max Students",
                    value: "max_students"
                },
                {
                    header: "Status",
                    value: (item) => item.status ? "Active" : "Disabled"
                }
            ],
            "plans.csv"
        );
    };

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

    const filteredPlans = plans.filter((data) =>
        data.plan_name?.toLowerCase().includes(search.toLowerCase())
    )

    const totalPages = Math.ceil(filteredPlans.length / plansPerPage)

    const startIndex = (currentPage - 1) * plansPerPage

    const currentPlans = filteredPlans.slice(
        startIndex,
        startIndex + plansPerPage
    )

    useEffect(() => {
        setCurrentPage(1)
    }, [search])

    return (
        <div className="w-full">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

                <div className="px-5 sm:px-6 py-5 border-b border-gray-100">
                    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">

                        <div>
                            <h1 className="text-xl font-semibold text-gray-800">
                                Plans Management
                            </h1>

                            <p className="text-sm text-gray-500 mt-1">
                                Manage institute subscription plans
                            </p>
                        </div>

                        <div className="md:flex items-center gap-3 w-full sm:w-auto">

                            <div className="md:mb-0 mb-4">
                                <DefaultButton
                                    label="Export CSV"
                                    onClick={handleExport}
                                />
                            </div>

                            <div className="relative w-full sm:w-80">

                                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search by plan name..."
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                                />

                            </div>

                        </div>

                    </div>
                </div>

                <div className="hidden md:block overflow-x-auto">

                    <table className="w-full">

                        <thead>
                            <tr className="bg-gray-50 text-left">

                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                    #
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                    Plan
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                    Monthly
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                    Students
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-gray-600">
                                    Status
                                </th>

                                <th className="px-6 py-4 text-sm font-semibold text-gray-600 text-center">
                                    Action
                                </th>

                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">

                            {
                                currentPlans.map((data, index) => (
                                    <tr
                                        key={index}
                                        className="hover:bg-gray-50 transition duration-200"
                                    >

                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {startIndex + index + 1}
                                        </td>

                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">

                                                <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold">
                                                    {data.plan_name?.charAt(0).toUpperCase()}
                                                </div>

                                                <div>
                                                    <p className="text-sm font-medium text-gray-800">
                                                        {data.plan_name}
                                                    </p>

                                                    <p className="text-xs text-gray-500 truncate max-w-xs">
                                                        {data.description}
                                                    </p>
                                                </div>

                                            </div>
                                        </td>

                                        <td className="px-6 py-4 text-sm font-medium text-gray-700">
                                            Rs. {data.monthly_price}
                                        </td>

                                        <td className="px-6 py-4 text-sm text-gray-700">
                                            {data.max_students}
                                        </td>

                                        <td className="px-6 py-4">
                                            <span className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${data.status ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                                {data.status ? 'Active' : 'Disabled'}
                                            </span>
                                        </td>

                                        <td className="px-6 py-4 text-center">
                                            <a
                                                href={`/dashboard/plan/${data._id}`}
                                                className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-gray-100 text-gray-600 hover:bg-indigo-600 hover:text-white transition"
                                            >
                                                <FaEye size={15} />
                                            </a>
                                        </td>

                                    </tr>
                                ))
                            }

                        </tbody>

                    </table>

                </div>

                <div className="md:hidden divide-y divide-gray-100">

                    {
                        currentPlans.map((data, index) => (
                            <div
                                key={index}
                                className="p-5 flex items-center justify-between hover:bg-gray-50 transition"
                            >

                                <div className="flex items-center gap-3 min-w-0">

                                    <div className="w-10 h-10 shrink-0 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold">
                                        {data.plan_name?.charAt(0).toUpperCase()}
                                    </div>

                                    <div className="min-w-0">

                                        <p className="text-sm font-medium text-gray-800 truncate">
                                            {data.plan_name}
                                        </p>

                                        <p className="text-xs text-gray-500 mt-1">
                                            Rs. {data.monthly_price} / Month
                                        </p>

                                        <span className={`inline-flex mt-2 px-3 py-1 rounded-full text-xs font-medium ${data.status ? 'bg-green-50 text-green-600' : 'bg-red-50 text-red-600'}`}>
                                            {data.status ? 'Active' : 'Disabled'}
                                        </span>

                                    </div>

                                </div>

                                <a
                                    href={`/dashboard/plan/${data._id}`}
                                    className="w-9 h-9 flex-shrink-0 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-indigo-600 hover:text-white transition"
                                >
                                    <FaEye size={15} />
                                </a>

                            </div>
                        ))
                    }

                </div>

                <div className="px-5 sm:px-6 py-5 border-t border-gray-100 flex flex-col sm:flex-row items-center justify-between gap-4">

                    <p className="text-sm text-gray-500">
                        Showing {filteredPlans.length === 0 ? 0 : startIndex + 1} - {Math.min(startIndex + plansPerPage, filteredPlans.length)} of {filteredPlans.length} plans
                    </p>

                    <div className="flex items-center gap-3">

                        <button
                            disabled={currentPage === 1}
                            onClick={() => setCurrentPage(currentPage - 1)}
                            className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-100"
                        >
                            <FaChevronLeft size={14} />
                        </button>

                        <span className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm">
                            {currentPage} / {totalPages || 1}
                        </span>

                        <button
                            disabled={currentPage === totalPages || totalPages === 0}
                            onClick={() => setCurrentPage(currentPage + 1)}
                            className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-100"
                        >
                            <FaChevronRight size={14} />
                        </button>

                    </div>

                </div>

            </div>
        </div>
    )
}

export default Plans