import React, { useEffect, useState } from 'react'
import API from '../../../services/api'

const TeacherResult = () => {
    const token = localStorage.getItem('access_token')

    const [teacherMarks, setTeacherMarks] = useState([])
    const [filters, setFilters] = useState({
        student: '',
        classTime: '',
    })

    useEffect(() => {
        const fetchTeacherMarks = async () => {
            const res = await API.get('/learn/teacher-fetch-marks', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (res.data.success) {
                setTeacherMarks(res.data.result || [])
            }
        }

        if (token) {
            fetchTeacherMarks()
        }
    }, [token])

    const getStartTime = (assignment) => {
        return assignment?.timetable?.startTime || '-'
    }

    const getEndTime = (assignment) => {
        return assignment?.timetable?.endTime || '-'
    }

    const getClassTime = (assignment) => {
        return `${getStartTime(assignment)} - ${getEndTime(assignment)}`
    }

    const getStudentEmail = (submission) => {
        return submission?.student?.email || '-'
    }

    const studentOptions = [
        ...new Set(
            teacherMarks
                .flatMap((assignment) => assignment.submissions || [])
                .map((submission) => getStudentEmail(submission))
                .filter((student) => student !== '-')
        ),
    ]

    const classTimeOptions = [
        ...new Set(
            teacherMarks
                .map((assignment) => getClassTime(assignment))
                .filter((time) => time !== '- - -')
        ),
    ]

    const filteredMarks = teacherMarks
        .map((assignment) => {
            const submissions = (assignment.submissions || []).filter(
                (submission) => {
                    return (
                        (!filters.student ||
                            getStudentEmail(submission) ===
                            filters.student) &&
                        (!filters.classTime ||
                            getClassTime(assignment) ===
                            filters.classTime)
                    )
                }
            )

            return {
                ...assignment,
                submissions,
            }
        })
        .filter((assignment) => assignment.submissions.length > 0)

    return (
        <div className="w-full space-y-6">
            <div>
                <h1 className="text-xl font-bold text-gray-900 sm:text-2xl">
                    Assignment Results
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    View assignment results
                </p>
            </div>

            <div className="border border-gray-200 bg-white p-4 sm:p-5">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                    <select
                        value={filters.student}
                        onChange={(e) => {
                            setFilters((prev) => ({
                                ...prev,
                                student: e.target.value,
                            }))
                        }}
                        className="w-full border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500"
                    >
                        <option value="">All Students</option>

                        {studentOptions.map((student) => (
                            <option key={student} value={student}>
                                {student}
                            </option>
                        ))}
                    </select>

                    <select
                        value={filters.classTime}
                        onChange={(e) => {
                            setFilters((prev) => ({
                                ...prev,
                                classTime: e.target.value,
                            }))
                        }}
                        className="w-full border border-gray-200 bg-white px-4 py-3 text-sm outline-none focus:border-indigo-500"
                    >
                        <option value="">All Class Times</option>

                        {classTimeOptions.map((classTime) => (
                            <option key={classTime} value={classTime}>
                                {classTime}
                            </option>
                        ))}
                    </select>
                </div>

                {(filters.student || filters.classTime) && (
                    <button
                        type="button"
                        onClick={() => {
                            setFilters({
                                student: '',
                                classTime: '',
                            })
                        }}
                        className="mt-4 border border-gray-200 px-4 py-2 text-sm text-gray-600 hover:bg-gray-50"
                    >
                        Clear Filters
                    </button>
                )}
            </div>

            {filteredMarks.length === 0 ? (
                <div className="border border-gray-200 bg-white p-10 text-center">
                    <p className="text-sm text-gray-500">
                        No results found
                    </p>
                </div>
            ) : (
                <div className="space-y-5">
                    {filteredMarks.map((assignment, assignmentIndex) => (
                        <div
                            key={assignment._id || assignmentIndex}
                            className="overflow-hidden border border-gray-200 bg-white"
                        >
                            <div className="border-b border-gray-200 p-4 sm:p-5">
                                <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
                                    <div>
                                        <h2 className="text-lg font-semibold text-gray-900">
                                            {assignment.title ||
                                                'Untitled Assignment'}
                                        </h2>

                                        <p className="mt-2 text-sm text-gray-500">
                                            {getClassTime(assignment)}
                                        </p>
                                    </div>

                                    <span className="text-sm text-gray-500">
                                        {assignment.submissions?.length || 0}{' '}
                                        Students
                                    </span>
                                </div>
                            </div>

                            <div className="overflow-x-auto">
                                <table className="w-full min-w-[650px]">
                                    <thead>
                                        <tr className="border-b border-gray-200 bg-gray-50">
                                            <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                                                Student
                                            </th>

                                            <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                                                Class Time
                                            </th>

                                            <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                                                Submitted At
                                            </th>

                                            <th className="px-5 py-3 text-left text-xs font-semibold uppercase text-gray-500">
                                                Marks
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {assignment.submissions.map(
                                            (submission, index) => (
                                                <tr
                                                    key={
                                                        submission._id || index
                                                    }
                                                    className="border-b border-gray-100 last:border-0"
                                                >
                                                    <td className="px-5 py-4 text-sm text-gray-700">
                                                        {getStudentEmail(
                                                            submission
                                                        )}
                                                    </td>

                                                    <td className="px-5 py-4 text-sm text-gray-700">
                                                        {getClassTime(
                                                            assignment
                                                        )}
                                                    </td>

                                                    <td className="px-5 py-4 text-sm text-gray-600">
                                                        {submission.createdAt
                                                            ? new Date(
                                                                submission.createdAt
                                                            ).toLocaleString()
                                                            : '-'}
                                                    </td>

                                                    <td className="px-5 py-4">
                                                        <span className="inline-flex min-w-[45px] justify-center border border-indigo-200 bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-700">
                                                            {submission.marks ??
                                                                0}
                                                        </span>
                                                    </td>
                                                </tr>
                                            )
                                        )}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default TeacherResult