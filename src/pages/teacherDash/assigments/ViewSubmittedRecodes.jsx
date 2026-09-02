import React, { useEffect, useState } from 'react'
import {
    FaCheck,
    FaClock,
    FaDownload,
    FaEye,
    FaFilePdf,
    FaUsers,
    FaXmark,
} from 'react-icons/fa6'
import API from '../../../services/api'
import Toast from '../../../component/Toast/Toast'

const ViewSubmittedRecodes = ({
    token,
    assignment
}) => {
    const [records, setRecords] = useState([])
    const [assignmentData, setAssignmentData] = useState(null)
    const [loading, setLoading] = useState(true)
    const [toast, setToast] = useState(null)

    const fetchSubmittedRecords = async () => {
        if (!token || !assignment?._id) return

        setLoading(true)

        try {
            const res = await API.get(
                `/learn/submited-recodes/${assignment._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            if (res.data.success === true) {
                setRecords(res.data.result?.students || [])
                setAssignmentData(res.data.result?.assignment || null)
            }
        } catch (err) {
            setToast({
                success: false,
                message: err.response?.data?.message || 'Failed to fetch submitted records',
            })
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchSubmittedRecords()
    }, [token, assignment?._id])

    const submittedCount = records.filter(
        (student) => student.submitted
    ).length

    const notSubmittedCount = records.length - submittedCount

    const getStudentName = (student) => {
        const name = `${student.first_name || ''} ${student.last_name || ''}`.trim()

        return name || student.email
    }

    const getAnswerSheetUrl = (filename) => {
        return `${import.meta.env.VITE_APP_API_FILES}/uploads/answer-sheets/${filename}`
    }

    if (loading) {
        return (
            <div className="w-full bg-white px-4 py-5 sm:px-6 sm:py-6 lg:px-8">
                <div className="animate-pulse space-y-5">

                    <div className="flex items-center gap-4">
                        <div className="h-12 w-12 rounded-xl bg-gray-200"></div>

                        <div className="flex-1">
                            <div className="h-6 w-48 max-w-full rounded bg-gray-200"></div>
                            <div className="mt-2 h-4 w-64 max-w-full rounded bg-gray-100"></div>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-3">
                        <div className="h-24 rounded-xl bg-gray-100"></div>
                        <div className="h-24 rounded-xl bg-gray-100"></div>
                        <div className="h-24 rounded-xl bg-gray-100"></div>
                    </div>

                    <div className="space-y-3">
                        <div className="h-28 rounded-xl bg-gray-100"></div>
                        <div className="h-28 rounded-xl bg-gray-100"></div>
                        <div className="h-28 rounded-xl bg-gray-100"></div>
                    </div>

                </div>
            </div>
        )
    }

    return (
        <div className="w-full min-w-0 bg-white px-4 py-5 sm:px-6 sm:py-6 lg:px-8">

            {toast && (
                <div className="fixed right-3 top-3 z-50 sm:right-6 sm:top-6">
                    <Toast
                        success={toast.success}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}

            <div className="mb-6 flex min-w-0 items-start gap-3 sm:mb-8 sm:gap-4">

                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600 sm:h-12 sm:w-12">
                    <FaUsers className="text-lg sm:text-xl" />
                </div>

                <div className="min-w-0 flex-1">
                    <h2 className="truncate text-xl font-bold tracking-tight text-gray-900 sm:text-2xl">
                        Submitted Records
                    </h2>

                    <p className="mt-1 truncate text-xs text-gray-500 sm:text-sm">
                        {assignmentData?.title || assignment?.title || 'Assignment'}
                    </p>
                </div>

            </div>

            <div className="mb-5 grid grid-cols-1 gap-3 sm:mb-6 sm:grid-cols-3 sm:gap-4">

                <div className="min-w-0 border border-gray-200 bg-white p-4 sm:p-5">
                    <div className="flex items-center justify-between gap-3">

                        <div className="min-w-0">
                            <p className="truncate text-xs font-medium text-gray-500 sm:text-sm">
                                Total Students
                            </p>

                            <p className="mt-1 text-2xl font-bold text-gray-900 sm:mt-2">
                                {records.length}
                            </p>
                        </div>

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                            <FaUsers />
                        </div>

                    </div>
                </div>

                <div className="min-w-0 border border-gray-200 bg-white p-4 sm:p-5">
                    <div className="flex items-center justify-between gap-3">

                        <div className="min-w-0">
                            <p className="truncate text-xs font-medium text-gray-500 sm:text-sm">
                                Submitted
                            </p>

                            <p className="mt-1 text-2xl font-bold text-green-600 sm:mt-2">
                                {submittedCount}
                            </p>
                        </div>

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-green-50 text-green-600">
                            <FaCheck />
                        </div>

                    </div>
                </div>

                <div className="min-w-0 border border-gray-200 bg-white p-4 sm:p-5">
                    <div className="flex items-center justify-between gap-3">

                        <div className="min-w-0">
                            <p className="truncate text-xs font-medium text-gray-500 sm:text-sm">
                                Not Submitted
                            </p>

                            <p className="mt-1 text-2xl font-bold text-red-600 sm:mt-2">
                                {notSubmittedCount}
                            </p>
                        </div>

                        <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-red-50 text-red-600">
                            <FaXmark />
                        </div>

                    </div>
                </div>

            </div>

            <div className="min-w-0 border border-gray-200 bg-white">

                <div className="border-b border-gray-200 px-4 py-4 sm:px-5">
                    <h3 className="text-base font-bold text-gray-900">
                        Student Submissions
                    </h3>

                    <p className="mt-1 text-xs leading-5 text-gray-500">
                        View which students have submitted their answer sheets.
                    </p>
                </div>

                {records.length === 0 ? (
                    <div className="flex flex-col items-center justify-center px-5 py-12 text-center sm:py-16">

                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gray-100 text-gray-400">
                            <FaUsers className="text-2xl" />
                        </div>

                        <h3 className="text-base font-bold text-gray-900">
                            No Students Found
                        </h3>

                        <p className="mt-1 max-w-sm text-sm leading-6 text-gray-500">
                            There are no students assigned to this class.
                        </p>

                    </div>
                ) : (
                    <>
                        <div className="hidden overflow-x-auto md:block">
                            <table className="w-full min-w-[800px]">

                                <thead>
                                    <tr className="border-b border-gray-200 bg-gray-50 text-left">

                                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            Student
                                        </th>

                                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            Email
                                        </th>

                                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            Status
                                        </th>

                                        <th className="px-5 py-4 text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            Submitted At
                                        </th>

                                        <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                                            Action
                                        </th>

                                    </tr>
                                </thead>

                                <tbody>
                                    {records.map((student) => (
                                        <tr
                                            key={student._id}
                                            className="border-b border-gray-100 last:border-b-0 hover:bg-gray-50"
                                        >

                                            <td className="px-5 py-4">
                                                <div className="flex items-center gap-3">

                                                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-sm font-bold text-indigo-600">
                                                        {getStudentName(student)
                                                            .charAt(0)
                                                            .toUpperCase()}
                                                    </div>

                                                    <p className="max-w-[180px] truncate text-sm font-semibold text-gray-800">
                                                        {getStudentName(student)}
                                                    </p>

                                                </div>
                                            </td>

                                            <td className="px-5 py-4">
                                                <p className="max-w-[220px] truncate text-sm text-gray-600">
                                                    {student.email}
                                                </p>
                                            </td>

                                            <td className="px-5 py-4">
                                                {student.submitted ? (
                                                    <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-green-50 px-3 py-1.5 text-xs font-semibold text-green-700">
                                                        <FaCheck />
                                                        Submitted
                                                    </span>
                                                ) : (
                                                    <span className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-red-50 px-3 py-1.5 text-xs font-semibold text-red-700">
                                                        <FaXmark />
                                                        Not Submitted
                                                    </span>
                                                )}
                                            </td>

                                            <td className="px-5 py-4">
                                                {student.submitted && student.submission?.createdAt ? (
                                                    <div className="flex items-center gap-2 whitespace-nowrap text-sm text-gray-600">
                                                        <FaClock className="shrink-0 text-gray-400" />

                                                        {new Date(
                                                            student.submission.createdAt
                                                        ).toLocaleString()}
                                                    </div>
                                                ) : (
                                                    <span className="text-sm text-gray-400">
                                                        —
                                                    </span>
                                                )}
                                            </td>

                                            <td className="px-5 py-4">
                                                {student.submitted && student.submission?.answer_sheet ? (
                                                    <div className="flex justify-end gap-2">

                                                        <a
                                                            href={getAnswerSheetUrl(
                                                                student.submission.answer_sheet
                                                            )}
                                                            target="_blank"
                                                            rel="noreferrer"
                                                            className="inline-flex items-center gap-2 border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-50"
                                                        >
                                                            <FaEye />
                                                            View
                                                        </a>

                                                        <a
                                                            href={getAnswerSheetUrl(
                                                                student.submission.answer_sheet
                                                            )}
                                                            download={student.submission.answer_sheet}
                                                            className="inline-flex items-center gap-2 border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-50"
                                                        >
                                                            <FaDownload />
                                                            Download
                                                        </a>

                                                    </div>
                                                ) : (
                                                    <div className="flex justify-end">
                                                        <span className="text-xs font-medium text-gray-400">
                                                            No Answer Sheet
                                                        </span>
                                                    </div>
                                                )}
                                            </td>

                                        </tr>
                                    ))}
                                </tbody>

                            </table>
                        </div>

                        <div className="block divide-y divide-gray-100 md:hidden">
                            {records.map((student) => (
                                <div
                                    key={student._id}
                                    className="p-4 sm:p-5"
                                >

                                    <div className="flex min-w-0 items-start gap-3">

                                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-indigo-50 text-sm font-bold text-indigo-600">
                                            {getStudentName(student)
                                                .charAt(0)
                                                .toUpperCase()}
                                        </div>

                                        <div className="min-w-0 flex-1">

                                            <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">

                                                <div className="min-w-0">
                                                    <p className="truncate text-sm font-bold text-gray-900">
                                                        {getStudentName(student)}
                                                    </p>

                                                    <p className="mt-1 truncate text-xs text-gray-500">
                                                        {student.email}
                                                    </p>
                                                </div>

                                                <div className="shrink-0">
                                                    {student.submitted ? (
                                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-green-50 px-2.5 py-1 text-[11px] font-semibold text-green-700">
                                                            <FaCheck />
                                                            Submitted
                                                        </span>
                                                    ) : (
                                                        <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-2.5 py-1 text-[11px] font-semibold text-red-700">
                                                            <FaXmark />
                                                            Not Submitted
                                                        </span>
                                                    )}
                                                </div>

                                            </div>

                                        </div>

                                    </div>

                                    <div className="mt-4 grid grid-cols-1 gap-3 border-t border-gray-100 pt-4 sm:grid-cols-2">

                                        <div className="min-w-0">
                                            <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                                                Submitted At
                                            </p>

                                            {student.submitted && student.submission?.createdAt ? (
                                                <div className="mt-1 flex min-w-0 items-start gap-2 text-xs text-gray-600">
                                                    <FaClock className="mt-0.5 shrink-0 text-gray-400" />

                                                    <span className="break-words">
                                                        {new Date(
                                                            student.submission.createdAt
                                                        ).toLocaleString()}
                                                    </span>
                                                </div>
                                            ) : (
                                                <p className="mt-1 text-xs text-gray-400">
                                                    Not submitted
                                                </p>
                                            )}
                                        </div>

                                        <div className="min-w-0">
                                            <p className="text-[11px] font-medium uppercase tracking-wide text-gray-400">
                                                Answer Sheet
                                            </p>

                                            {student.submitted && student.submission?.answer_sheet ? (
                                                <p className="mt-1 flex items-center gap-2 truncate text-xs font-medium text-gray-700">
                                                    <FaFilePdf className="shrink-0 text-red-500" />

                                                    <span className="truncate">
                                                        {student.submission.answer_sheet}
                                                    </span>
                                                </p>
                                            ) : (
                                                <p className="mt-1 text-xs text-gray-400">
                                                    No answer sheet
                                                </p>
                                            )}
                                        </div>

                                    </div>

                                    {student.submitted && student.submission?.answer_sheet && (
                                        <div className="mt-4 grid grid-cols-2 gap-2">

                                            <a
                                                href={getAnswerSheetUrl(
                                                    student.submission.answer_sheet
                                                )}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="flex min-h-10 items-center justify-center gap-2 border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-50"
                                            >
                                                <FaEye />
                                                View
                                            </a>

                                            <a
                                                href={getAnswerSheetUrl(
                                                    student.submission.answer_sheet
                                                )}
                                                download={student.submission.answer_sheet}
                                                className="flex min-h-10 items-center justify-center gap-2 border border-gray-200 bg-white px-3 py-2 text-xs font-semibold text-gray-700 transition hover:bg-gray-50"
                                            >
                                                <FaDownload />
                                                Download
                                            </a>

                                        </div>
                                    )}

                                </div>
                            ))}
                        </div>
                    </>
                )}

            </div>

        </div>
    )
}

export default ViewSubmittedRecodes