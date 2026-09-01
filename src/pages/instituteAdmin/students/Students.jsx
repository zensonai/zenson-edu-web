import React, { useEffect, useState } from 'react'
import API from '../../../services/api'
import { FaEye, FaSearch, FaChevronLeft, FaChevronRight } from 'react-icons/fa'
import { exportToCSV } from '../../../utils/dataexport'
import DefaultButton from '../../../component/Buttons/DefaultButton'

const Students = () => {
    const token = localStorage.getItem('access_token')

    const [students, setStudents] = useState([])
    const [search, setSearch] = useState("")
    const [currentPage, setCurrentPage] = useState(1)

    const studentsPerPage = 15

    const handleExport = () => {
        exportToCSV(
            filteredStudents,
            [
                {
                    header: "#",
                    value: (_, index) => index + 1
                },
                {
                    header: "Student ID",
                    value: "student_id"
                },
                {
                    header: "Admission Number",
                    value: "admission_no"
                },
                {
                    header: "Email",
                    value: "user.email"
                },
                {
                    header: "Status",
                    value: "status"
                }
            ],
            "students.csv"
        )
    }

    useEffect(() => {
        const fetchStudents = async () => {
            const res = await API.get('/student', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if (res.data.success === true) {
                setStudents(res.data.result || [])
            }
        }

        if (token) fetchStudents()
    }, [token])

    const filteredStudents = students.filter((data) =>
        data.student_id?.toLowerCase().includes(search.toLowerCase()) ||
        data.admission_no?.toLowerCase().includes(search.toLowerCase()) ||
        data.user?.email?.toLowerCase().includes(search.toLowerCase())
    )

    const totalPages = Math.ceil(filteredStudents.length / studentsPerPage)

    const startIndex = (currentPage - 1) * studentsPerPage

    const currentStudents = filteredStudents.slice(
        startIndex,
        startIndex + studentsPerPage
    )

    useEffect(() => {
        setCurrentPage(1)
    }, [search])

    return (
        <div className="w-full min-w-0">

            <div className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">

                <div className="px-4 sm:px-6 lg:px-8 py-5 border-b border-gray-100">

                    <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">

                        <div className="min-w-0">
                            <h1 className="text-xl sm:text-2xl font-semibold text-gray-800">
                                Students Management
                            </h1>

                            <p className="text-sm text-gray-500 mt-1">
                                Manage students and their admission information
                            </p>
                        </div>

                        <div className="flex flex-col sm:flex-row gap-3 w-full lg:w-auto">

                            <div className="w-full sm:w-auto">
                                <DefaultButton
                                    label="Export CSV"
                                    onClick={handleExport}
                                />
                            </div>

                            <div className="relative w-full sm:w-72 lg:w-80">

                                <FaSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />

                                <input
                                    type="text"
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                    placeholder="Search student..."
                                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 focus:ring-2 focus:ring-indigo-500 outline-none text-sm"
                                />

                            </div>

                        </div>

                    </div>

                </div>

                <div className="hidden md:block w-full overflow-x-auto">

                    <table className="w-full min-w-[800px]">

                        <thead>
                            <tr className="bg-gray-50 text-left">

                                <th className="px-5 lg:px-6 py-4 text-sm font-semibold text-gray-600">
                                    #
                                </th>

                                <th className="px-5 lg:px-6 py-4 text-sm font-semibold text-gray-600">
                                    Student
                                </th>

                                <th className="px-5 lg:px-6 py-4 text-sm font-semibold text-gray-600">
                                    Student ID
                                </th>

                                <th className="px-5 lg:px-6 py-4 text-sm font-semibold text-gray-600">
                                    Admission No.
                                </th>

                                <th className="px-5 lg:px-6 py-4 text-sm font-semibold text-gray-600">
                                    Status
                                </th>

                                <th className="px-5 lg:px-6 py-4 text-sm font-semibold text-gray-600 text-center">
                                    Action
                                </th>

                            </tr>
                        </thead>

                        <tbody className="divide-y divide-gray-100">

                            {
                                currentStudents.map((data, index) => {
                                    return (
                                        <tr
                                            key={data._id || index}
                                            className="hover:bg-gray-50 transition duration-200"
                                        >

                                            <td className="px-5 lg:px-6 py-4 text-sm text-gray-700">
                                                {startIndex + index + 1}
                                            </td>

                                            <td className="px-5 lg:px-6 py-4">
                                                <div className="flex items-center gap-3 min-w-[220px]">

                                                    <div className="w-10 h-10 shrink-0 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold">
                                                        {data.user?.email?.charAt(0).toUpperCase()}
                                                    </div>

                                                    <div className="min-w-0">
                                                        <p className="text-sm font-medium text-gray-800 truncate">
                                                            {data.user?.email}
                                                        </p>

                                                        <p className="text-xs text-gray-500">
                                                            Student Account
                                                        </p>
                                                    </div>

                                                </div>
                                            </td>

                                            <td className="px-5 lg:px-6 py-4 text-sm font-medium text-gray-700 whitespace-nowrap">
                                                {data.student_id}
                                            </td>

                                            <td className="px-5 lg:px-6 py-4 text-sm text-gray-700 whitespace-nowrap">
                                                {data.admission_no}
                                            </td>

                                            <td className="px-5 lg:px-6 py-4">

                                                <span
                                                    className={`inline-flex px-3 py-1 rounded-full text-xs font-medium whitespace-nowrap ${data.status === 'active'
                                                        ? 'bg-green-50 text-green-600'
                                                        : 'bg-gray-100 text-gray-600'
                                                        }`}
                                                >
                                                    {data.status}
                                                </span>

                                            </td>

                                            <td className="px-5 lg:px-6 py-4 text-center">

                                                <a
                                                    href={`/dashboard/student/view/${data._id}`}
                                                    className="inline-flex items-center justify-center w-9 h-9 rounded-lg bg-gray-100 text-gray-600 hover:bg-indigo-600 hover:text-white transition"
                                                >
                                                    <FaEye size={15} />
                                                </a>

                                            </td>

                                        </tr>
                                    )
                                })
                            }

                        </tbody>

                    </table>

                </div>

                <div className="md:hidden">

                    {
                        currentStudents.map((data, index) => {
                            return (
                                <div
                                    key={data._id || index}
                                    className="p-4 sm:p-5 border-b border-gray-100"
                                >

                                    <div className="flex items-start gap-3">

                                        <div className="w-11 h-11 shrink-0 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-semibold">
                                            {data.user?.email?.charAt(0).toUpperCase()}
                                        </div>

                                        <div className="flex-1 min-w-0">

                                            <div className="flex items-start justify-between gap-3">

                                                <div className="min-w-0">

                                                    <p className="text-sm font-semibold text-gray-800 break-all">
                                                        {data.user?.email}
                                                    </p>

                                                    <p className="text-xs text-gray-500 mt-1">
                                                        Student Account
                                                    </p>

                                                </div>

                                                <a
                                                    href={`/dashboard/student/view/${data._id}`}
                                                    className="w-9 h-9 shrink-0 flex items-center justify-center rounded-lg bg-gray-100 text-gray-600 hover:bg-indigo-600 hover:text-white transition"
                                                >
                                                    <FaEye size={15} />
                                                </a>

                                            </div>

                                            <div className="grid grid-cols-2 gap-3 mt-4">

                                                <div className="min-w-0">
                                                    <p className="text-[11px] uppercase tracking-wide text-gray-400">
                                                        Student ID
                                                    </p>

                                                    <p className="text-sm font-medium text-gray-700 mt-1 break-all">
                                                        {data.student_id}
                                                    </p>
                                                </div>

                                                <div className="min-w-0">
                                                    <p className="text-[11px] uppercase tracking-wide text-gray-400">
                                                        Admission
                                                    </p>

                                                    <p className="text-sm font-medium text-gray-700 mt-1 break-all">
                                                        {data.admission_no}
                                                    </p>
                                                </div>

                                            </div>

                                            <div className="mt-4">

                                                <span
                                                    className={`inline-flex px-3 py-1 rounded-full text-xs font-medium ${data.status === 'active'
                                                        ? 'bg-green-50 text-green-600'
                                                        : 'bg-gray-100 text-gray-600'
                                                        }`}
                                                >
                                                    {data.status}
                                                </span>

                                            </div>

                                        </div>

                                    </div>

                                </div>
                            )
                        })
                    }

                </div>

                <div className="px-4 sm:px-6 py-5 border-t border-gray-100">

                    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                        <p className="text-sm text-gray-500 text-center sm:text-left">
                            Showing {filteredStudents.length === 0 ? 0 : startIndex + 1} - {Math.min(startIndex + studentsPerPage, filteredStudents.length)} of {filteredStudents.length} students
                        </p>

                        <div className="flex items-center justify-center gap-3">

                            <button
                                disabled={currentPage === 1}
                                onClick={() => setCurrentPage(currentPage - 1)}
                                className="w-9 h-9 flex items-center justify-center rounded-lg border border-gray-200 disabled:opacity-40 hover:bg-gray-100"
                            >
                                <FaChevronLeft size={14} />
                            </button>

                            <span className="px-4 py-2 rounded-lg bg-indigo-600 text-white text-sm whitespace-nowrap">
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

        </div>
    )
}

export default Students