import React from 'react'
import { useAuth } from '../../context/AuthContext'
import SuperAdminDash from './SuperAdminDash'
import AllUserDash from './AllUserDash'

const DashHome = () => {
    const { auth } = useAuth()

    if (auth.role === 'super_admin') {
        return <SuperAdminDash />
    }

    return <AllUserDash />
}

export default DashHome