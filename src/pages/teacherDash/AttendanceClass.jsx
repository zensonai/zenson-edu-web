import React from 'react'
import { useParams } from 'react-router-dom'

const AttendanceClass = () => {
    const { id } = useParams()
    return (
        <div>AttendanceClass {id}</div>
    )
}

export default AttendanceClass