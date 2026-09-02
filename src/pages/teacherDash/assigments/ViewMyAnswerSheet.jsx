import React, { useEffect, useState } from 'react'
import {
    FaArrowUpRightFromSquare,
    FaDownload,
    FaFilePdf,
    FaTrash,
} from 'react-icons/fa6'
import API from '../../../services/api'
import Toast from '../../../component/Toast/Toast'
import DefaultButton from '../../../component/Buttons/DefaultButton'

const ViewMyAnswerSheet = ({
    token,
    assignment
}) => {
    const [answersheet, setAnswersheet] = useState(null)
    const [loading, setLoading] = useState(true)
    const [removing, setRemoving] = useState(false)
    const [toast, setToast] = useState(null)

    const fetchMyAnswerSheet = async () => {
        if (!token || !assignment?._id) return

        setLoading(true)

        try {
            const res = await API.get(
                `/learn/my-answer-sheet/${assignment._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            if (res.data.success === true) {
                setAnswersheet(res.data.result)
            }
        } catch (err) {
            setToast({
                success: false,
                message: err.response?.data?.message || 'Failed to fetch answer sheet',
            })
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchMyAnswerSheet()
    }, [token, assignment?._id])

    const handleRemoveAnswerSheet = async () => {
        if (!answersheet?._id) return

        const confirmed = window.confirm(
            'Are you sure you want to remove your submitted answer sheet?'
        )

        if (!confirmed) return

        setRemoving(true)

        try {
            const res = await API.delete(
                `/learn/answer-sheet-update/${assignment._id}`,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            if (res.data.success === true) {
                setAnswersheet(null)

                setToast({
                    success: true,
                    message: res.data.message,
                })
            }
        } catch (err) {
            setToast({
                success: false,
                message: err.response?.data?.message || 'Failed to remove answer sheet',
            })
        } finally {
            setRemoving(false)
        }
    }

    const answerSheetUrl = answersheet?.answer_sheet
        ? `${import.meta.env.VITE_APP_API_FILES}/uploads/answer-sheets/${answersheet.answer_sheet}`
        : ''

    if (loading) {
        return (
            <div className="w-full bg-white p-6">
                <div className="animate-pulse">
                    <div className="mb-4 h-6 w-48 rounded bg-gray-200"></div>
                    <div className="h-20 w-full rounded bg-gray-100"></div>
                </div>
            </div>
        )
    }

    if (!answersheet) {
        return (
            <div className="w-full bg-white p-6">
                <div className="flex flex-col items-center justify-center border border-dashed border-gray-300 px-6 py-12 text-center">
                    <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-gray-100 text-gray-400">
                        <FaFilePdf className="text-2xl" />
                    </div>

                    <h3 className="text-base font-bold text-gray-900">
                        No Answer Sheet Submitted
                    </h3>

                    <p className="mt-1 max-w-md text-sm text-gray-500">
                        You have not submitted your answer sheet for this assignment yet.
                    </p>
                </div>
            </div>
        )
    }

    return (
        <div className="w-full bg-white px-4 py-6 sm:px-6 lg:px-8">

            {toast && (
                <div className="fixed right-8 top-8 z-50">
                    <Toast
                        success={toast.success}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}

            <div className="mb-6 flex items-start gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <FaFilePdf className="text-xl" />
                </div>

                <div className="min-w-0">
                    <h2 className="text-xl font-bold text-gray-900">
                        My Answer Sheet
                    </h2>

                    <p className="mt-1 text-sm text-gray-500">
                        Your submitted answer sheet for{' '}
                        <span className="font-medium text-gray-700">
                            {assignment?.title || 'this assignment'}
                        </span>
                    </p>
                </div>

            </div>

            <div className="border border-gray-200">

                <div className="flex flex-col gap-4 p-5 sm:flex-row sm:items-center sm:justify-between">

                    <div className="flex min-w-0 items-center gap-4">

                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-500">
                            <FaFilePdf className="text-xl" />
                        </div>

                        <div className="min-w-0">
                            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                Submitted File
                            </p>

                            <p className="mt-1 truncate text-sm font-semibold text-gray-800">
                                {answersheet.answer_sheet}
                            </p>

                            <p className="mt-1 text-xs text-green-600">
                                Answer Sheet Submitted
                            </p>
                        </div>

                    </div>

                    <div className="flex flex-wrap gap-2">

                        <a
                            href={answerSheetUrl}
                            target="_blank"
                            rel="noreferrer"
                            className="inline-flex items-center justify-center gap-2 border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                        >
                            <FaArrowUpRightFromSquare />
                            View
                        </a>

                        <a
                            href={answerSheetUrl}
                            download={answersheet.answer_sheet}
                            className="inline-flex items-center justify-center gap-2 border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                        >
                            <FaDownload />
                            Download
                        </a>

                        <DefaultButton
                            type="button"
                            label={removing ? 'Removing...' : 'Remove'}
                            onClick={handleRemoveAnswerSheet}
                            disabled={removing}
                        />

                    </div>

                </div>

            </div>

        </div>
    )
}

export default ViewMyAnswerSheet