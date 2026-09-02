import React, { useState } from 'react'
import { FaFilePdf, FaCloudArrowUp, FaFileCircleCheck } from 'react-icons/fa6'
import API from '../../../services/api'
import FileInput from '../../../component/Form/FileInput'
import DefaultButton from '../../../component/Buttons/DefaultButton'
import Toast from '../../../component/Toast/Toast'

const SubmitAssignment = ({
    token,
    assignment
}) => {
    const [file, setFile] = useState(null)
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(null)

    const handleFileChange = (e) => {
        setFile(e.target.files[0] || null)
    }

    const handleSubmitAssignment = async (e) => {
        e.preventDefault()

        if (!file) {
            setToast({
                success: false,
                message: 'Please select your answer PDF',
            })
            return
        }

        setLoading(true)

        try {
            const formData = new FormData()

            formData.append('answersheet_docs', file)

            const res = await API.post(
                `/learn/submit-assignment/${assignment?._id}`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        'Content-Type': 'multipart/form-data',
                    },
                }
            )

            if (res.data.success === true) {
                setToast({
                    success: true,
                    message: res.data.message,
                })

                window.location.reload()
            }
        } catch (err) {
            setToast({
                success: false,
                message: err.response?.data?.message || 'Something went wrong',
            })
        } finally {
            setLoading(false)
        }
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

            <div className="mb-8 flex items-start gap-4">

                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-indigo-50 text-indigo-600">
                    <FaCloudArrowUp className="text-xl" />
                </div>

                <div>
                    <h2 className="text-2xl font-bold tracking-tight text-gray-900">
                        Submit Assignment
                    </h2>

                    <p className="mt-1 text-sm leading-6 text-gray-500">
                        Upload your completed assignment as a PDF document.
                    </p>
                </div>

            </div>

            <form onSubmit={handleSubmitAssignment} method="post">

                <div className="space-y-6">

                    <div className="rounded-xl border border-gray-200 p-5 sm:p-6">

                        <div className="mb-6 flex items-center gap-3 border-b border-gray-100 pb-5">

                            <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                                <FaFileCircleCheck />
                            </div>

                            <div>
                                <h3 className="text-base font-bold text-gray-900">
                                    Assignment Submission
                                </h3>

                                <p className="mt-0.5 text-xs text-gray-500">
                                    {assignment?.title || 'Assignment'}
                                </p>
                            </div>

                        </div>

                        <div>
                            <FileInput
                                label="Answer Sheet PDF"
                                name="answersheet_docs"
                                accept=".pdf,application/pdf"
                                onChange={handleFileChange}
                                required
                            />

                            {file && (
                                <div className="mt-4 flex items-center gap-3 rounded-xl border border-gray-200 bg-gray-50 px-4 py-3">
                                    <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-red-50 text-red-500">
                                        <FaFilePdf />
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-xs text-gray-400">
                                            Selected File
                                        </p>

                                        <p className="truncate text-sm font-medium text-gray-700">
                                            {file.name}
                                        </p>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>

                    <div className="flex flex-col-reverse gap-3 border-t border-gray-200 pt-6 sm:flex-row sm:items-center sm:justify-end">

                        <DefaultButton
                            type="submit"
                            label={loading ? 'Submitting...' : 'Submit Assignment'}
                        />

                    </div>

                </div>

            </form>

        </div>
    )
}

export default SubmitAssignment