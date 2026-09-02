import React, { useEffect, useMemo, useState } from 'react'
import API from '../../../services/api'

const FetchResult = () => {
    const token = localStorage.getItem('access_token')
    const [marks, setMarks] = useState([])
    const [loading, setLoading] = useState(true)

    const [classFilter, setClassFilter] = useState('')
    const [studentFilter, setStudentFilter] = useState('')
    const [teacherFilter, setTeacherFilter] = useState('')

    useEffect(() => {
        const fetchmarks = async () => {
            try {
                const res = await API.get('/learn/fetch-marks', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (res.data.success === true) {
                    setMarks(res.data.result || [])
                }
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        if (token) {
            fetchmarks()
        } else {
            setLoading(false)
        }
    }, [token])

    const getStudentEmail = (student) => {
        if (!student) return 'Unknown Student'
        if (typeof student === 'string') return student
        return student.email || student.name || student._id || 'Unknown Student'
    }

    const getTeacherEmail = (teacher) => {
        if (!teacher) return 'Unknown Teacher'
        if (typeof teacher === 'string') return teacher
        return teacher.email || teacher.name || teacher._id || 'Unknown Teacher'
    }

    const getClassTime = (assignment) => {
        const timetable = assignment?.timetable || []

        if (!timetable.length) {
            return 'No Class Time'
        }

        return timetable
            .map((item) => `${item.startTime} - ${item.endTime}`)
            .join(', ')
    }

    const classOptions = useMemo(() => {
        const values = []

        marks.forEach((assignment) => {
            const classTime = getClassTime(assignment)

            if (classTime && !values.includes(classTime)) {
                values.push(classTime)
            }
        })

        return values
    }, [marks])

    const studentOptions = useMemo(() => {
        const values = []

        marks.forEach((assignment) => {
            assignment.submissions?.forEach((submission) => {
                const student = getStudentEmail(submission.student)

                if (
                    student !== 'Unknown Student' &&
                    !values.includes(student)
                ) {
                    values.push(student)
                }
            })
        })

        return values
    }, [marks])

    const teacherOptions = useMemo(() => {
        const values = []

        marks.forEach((assignment) => {
            const teacher = getTeacherEmail(assignment.teacher)

            if (
                teacher !== 'Unknown Teacher' &&
                !values.includes(teacher)
            ) {
                values.push(teacher)
            }
        })

        return values
    }, [marks])

    const filteredMarks = useMemo(() => {
        return marks
            .map((assignment) => {
                const classTime = getClassTime(assignment)
                const teacher = getTeacherEmail(assignment.teacher)

                if (classFilter && classTime !== classFilter) {
                    return null
                }

                if (teacherFilter && teacher !== teacherFilter) {
                    return null
                }

                const submissions = (assignment.submissions || []).filter(
                    (submission) => {
                        const student = getStudentEmail(submission.student)

                        if (studentFilter && student !== studentFilter) {
                            return false
                        }

                        return true
                    }
                )

                if (submissions.length === 0) {
                    return null
                }

                return {
                    ...assignment,
                    submissions,
                }
            })
            .filter((assignment) => assignment !== null)
    }, [marks, classFilter, studentFilter, teacherFilter])

    const clearFilters = () => {
        setClassFilter('')
        setStudentFilter('')
        setTeacherFilter('')
    }

    if (loading) {
        return (
            <div className="flex min-h-[300px] items-center justify-center">
                <div className="text-sm font-medium text-gray-500">
                    Loading results...
                </div>
            </div>
        )
    }

    return (
        <div className="w-full space-y-6">
            <div>
                <h1 className="text-2xl font-bold text-gray-900">
                    Assignment Results
                </h1>

                <p className="mt-1 text-sm text-gray-500">
                    View assignment marks and student results
                </p>
            </div>

            <div className="border border-gray-200 bg-white p-5">
                <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Class
                        </label>

                        <select
                            value={classFilter}
                            onChange={(e) => setClassFilter(e.target.value)}
                            className="w-full border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-indigo-500"
                        >
                            <option value="">All Classes</option>

                            {classOptions.map((classItem) => (
                                <option key={classItem} value={classItem}>
                                    {classItem}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Student
                        </label>

                        <select
                            value={studentFilter}
                            onChange={(e) => setStudentFilter(e.target.value)}
                            className="w-full border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-indigo-500"
                        >
                            <option value="">All Students</option>

                            {studentOptions.map((student) => (
                                <option key={student} value={student}>
                                    {student}
                                </option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Teacher
                        </label>

                        <select
                            value={teacherFilter}
                            onChange={(e) => setTeacherFilter(e.target.value)}
                            className="w-full border border-gray-300 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none focus:border-indigo-500"
                        >
                            <option value="">All Teachers</option>

                            {teacherOptions.map((teacher) => (
                                <option key={teacher} value={teacher}>
                                    {teacher}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {(classFilter || studentFilter || teacherFilter) && (
                    <div className="mt-4 flex justify-end">
                        <button
                            type="button"
                            onClick={clearFilters}
                            className="text-sm font-medium text-indigo-600 hover:text-indigo-800"
                        >
                            Clear Filters
                        </button>
                    </div>
                )}
            </div>

            {marks.length === 0 ? (
                <div className="flex min-h-[250px] items-center justify-center border border-gray-200 bg-white">
                    <p className="text-sm font-medium text-gray-500">
                        No results found
                    </p>
                </div>
            ) : filteredMarks.length === 0 ? (
                <div className="flex min-h-[250px] items-center justify-center border border-gray-200 bg-white">
                    <p className="text-sm font-medium text-gray-500">
                        No results match the selected filters
                    </p>
                </div>
            ) : (
                <div className="space-y-6">
                    {filteredMarks.map((assignment) => (
                        <div
                            key={assignment._id}
                            className="overflow-hidden border border-gray-200 bg-white"
                        >
                            <div className="border-b border-gray-200 px-5 py-4">
                                <h2 className="text-lg font-semibold text-gray-900">
                                    {assignment.title || 'Untitled Assignment'}
                                </h2>

                                <div className="mt-2 flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-500">
                                    <div>
                                        <span className="font-medium text-gray-700">
                                            Class:
                                        </span>{' '}
                                        {getClassTime(assignment)}
                                    </div>

                                    <div>
                                        <span className="font-medium text-gray-700">
                                            Teacher:
                                        </span>{' '}
                                        {getTeacherEmail(assignment.teacher)}
                                    </div>
                                </div>
                            </div>

                            <div className="hidden overflow-x-auto lg:block">
                                <table className="w-full min-w-[700px]">
                                    <thead>
                                        <tr className="border-b border-gray-200 bg-gray-50">
                                            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                Assignment
                                            </th>

                                            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                Class
                                            </th>

                                            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                Teacher
                                            </th>

                                            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                Student
                                            </th>

                                            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                Submitted At
                                            </th>

                                            <th className="px-5 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                Marks
                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody>
                                        {assignment.submissions.map((submission) => (
                                            <tr
                                                key={submission._id}
                                                className="border-b border-gray-100 last:border-b-0"
                                            >
                                                <td className="px-5 py-4">
                                                    <p className="text-sm font-medium text-gray-900">
                                                        {assignment.title || 'Untitled Assignment'}
                                                    </p>
                                                </td>

                                                <td className="px-5 py-4">
                                                    <p className="text-sm font-medium text-gray-700">
                                                        {getClassTime(assignment)}
                                                    </p>
                                                </td>

                                                <td className="px-5 py-4">
                                                    <p className="text-sm text-gray-700">
                                                        {getTeacherEmail(assignment.teacher)}
                                                    </p>
                                                </td>

                                                <td className="px-5 py-4">
                                                    <p className="text-sm text-gray-700">
                                                        {getStudentEmail(submission.student)}
                                                    </p>
                                                </td>

                                                <td className="px-5 py-4">
                                                    <p className="text-sm text-gray-600">
                                                        {submission.createdAt
                                                            ? new Date(submission.createdAt).toLocaleDateString()
                                                            : '-'}
                                                    </p>
                                                </td>

                                                <td className="px-5 py-4">
                                                    <span className="inline-flex items-center border border-indigo-200 bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-700">
                                                        {submission.marks ?? 0}
                                                    </span>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="divide-y divide-gray-100 lg:hidden">
                                {assignment.submissions.map((submission) => (
                                    <div
                                        key={submission._id}
                                        className="space-y-4 p-5"
                                    >
                                        <div>
                                            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                                Assignment
                                            </p>

                                            <p className="mt-1 text-sm font-semibold text-gray-900">
                                                {assignment.title || 'Untitled Assignment'}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                                Class
                                            </p>

                                            <p className="mt-1 text-sm font-medium text-gray-700">
                                                {getClassTime(assignment)}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                                Teacher
                                            </p>

                                            <p className="mt-1 break-all text-sm text-gray-700">
                                                {getTeacherEmail(assignment.teacher)}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                                Student
                                            </p>

                                            <p className="mt-1 break-all text-sm text-gray-700">
                                                {getStudentEmail(submission.student)}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                                Submitted At
                                            </p>

                                            <p className="mt-1 text-sm text-gray-600">
                                                {submission.createdAt
                                                    ? new Date(submission.createdAt).toLocaleDateString()
                                                    : '-'}
                                            </p>
                                        </div>

                                        <div>
                                            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                                Marks
                                            </p>

                                            <span className="mt-1 inline-flex items-center border border-indigo-200 bg-indigo-50 px-3 py-1 text-sm font-semibold text-indigo-700">
                                                {submission.marks ?? 0}
                                            </span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
    )
}

export default FetchResult