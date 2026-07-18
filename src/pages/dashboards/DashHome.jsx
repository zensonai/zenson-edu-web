import React from 'react'
import { useAuth } from '../../context/AuthContext'
import SuperAdminDash from './SuperAdminDash'

const DashHome = () => {
    const { auth } = useAuth()

    if (auth.role === "super_admin") {
        return (
            <SuperAdminDash />
        )
    }
    else if (auth.role === "institute_admin") {
        return (
            <div>Institute Admin Dash</div>
        )
    }
    else if (auth.role === "teacher") {
        return (
            <div>Teacher Dash</div>
        )
    }
    else if (auth.role === "student") {
        return (
            <div>Student Dash</div>
        )
    }
    else if (auth.role === "parent") {
        return (
            <div>Parent Dash</div>
        )
    }
}

export default DashHome