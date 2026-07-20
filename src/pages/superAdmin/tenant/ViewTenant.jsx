import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { FaBuilding, FaUserShield, FaUsers, FaCalendarAlt, FaClock, FaCheckCircle } from 'react-icons/fa'
import API from '../../../services/api'
import UpdateTenant from './UpdateTenant'

const ViewTenant = () => {
    const { id } = useParams()
    const token = localStorage.getItem('access_token')

    const [tenant, setTenant] = useState(null)

    useEffect(() => {
        const fetchTenant = async () => {
            try {
                const res = await API.get(`/tenant/fetch-tenant/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (res.data.success) {
                    setTenant(res.data.result)
                }

            } catch (err) {
                console.log(err)
            }
        }

        if (token) fetchTenant()

    }, [id, token])


    if (!tenant) {
        return (
            <div className="flex justify-center items-center h-60">
                <p className="text-gray-500 text-sm">
                    Loading...
                </p>
            </div>
        )
    }


    return (
        <div className="w-full">

            <div className="bg-white rounded-xl shadow-sm p-4 mb-2 flex items-center justify-between">

                <div className="flex items-center gap-3">

                    <div className="w-12 h-12 rounded-full bg-indigo-600 flex items-center justify-center text-white text-lg font-bold">
                        {tenant.tenant_name?.charAt(0).toUpperCase()}
                    </div>

                    <div>
                        <h1 className="text-lg font-semibold text-gray-900">
                            {tenant.tenant_name}
                        </h1>

                        <p className="text-xs text-gray-500">
                            {tenant.desc}
                        </p>
                    </div>

                </div>


                <span className={`flex items-center gap-1 px-2.5 py-1 rounded-full text-xs font-medium ${tenant.tenant_stats
                        ? 'bg-green-100 text-green-700'
                        : 'bg-red-100 text-red-700'
                    }`}>
                    <FaCheckCircle size={11} />
                    {tenant.tenant_stats ? 'Active' : 'Disabled'}
                </span>
            </div>



            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2 mb-2">
                <div className="bg-white rounded-xl shadow-sm p-3 flex items-center gap-3">

                    <div className="w-9 h-9 rounded-lg bg-indigo-100 flex items-center justify-center">
                        <FaUsers className="text-indigo-600" />
                    </div>

                    <div>
                        <p className="text-xs text-gray-500">
                            Students
                        </p>

                        <p className="text-lg font-bold text-gray-900">
                            {tenant.students?.length || 0}
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-3 flex items-center gap-3">

                    <div className="w-9 h-9 rounded-lg bg-purple-100 flex items-center justify-center">
                        <FaBuilding className="text-purple-600" />
                    </div>

                    <div>
                        <p className="text-xs text-gray-500">
                            Status
                        </p>

                        <p className="text-lg font-bold text-gray-900">
                            {tenant.tenant_stats ? 'Active' : 'Disabled'}
                        </p>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-3 flex items-center gap-3">

                    <div className="w-9 h-9 rounded-lg bg-orange-100 flex items-center justify-center">
                        <FaCalendarAlt className="text-orange-600" />
                    </div>

                    <div>
                        <p className="text-xs text-gray-500">
                            Created
                        </p>

                        <p className="text-sm font-semibold text-gray-900">
                            {new Date(tenant.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-2">
                <div className="bg-white rounded-xl shadow-sm p-4">
                    <div className="flex items-center gap-2 mb-3">
                        <FaBuilding className="text-indigo-600" />

                        <h2 className="text-sm font-semibold text-gray-900">
                            Tenant Information
                        </h2>

                    </div>

                    <div className="space-y-2">
                        <div>
                            <p className="text-xs text-gray-500">
                                Name
                            </p>

                            <p className="text-sm font-medium text-gray-900">
                                {tenant.tenant_name}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-gray-500">
                                Description
                            </p>

                            <p className="text-sm text-gray-900">
                                {tenant.desc}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-gray-500">
                                Tenant ID
                            </p>

                            <p className="text-xs break-all text-gray-900">
                                {tenant._id}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="bg-white rounded-xl shadow-sm p-4">

                    <div className="flex items-center gap-2 mb-3">

                        <FaUserShield className="text-indigo-600" />

                        <h2 className="text-sm font-semibold text-gray-900">
                            Tenant Admin
                        </h2>

                    </div>

                    <div className="space-y-2">

                        <div>
                            <p className="text-xs text-gray-500">
                                Email
                            </p>

                            <p className="text-sm font-medium text-gray-900">
                                {tenant.tenant_admin?.email}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs text-gray-500">
                                Account
                            </p>

                            <span className={`inline-flex px-2 py-1 rounded-full text-xs ${tenant.tenant_admin?.account_stats
                                    ? 'bg-green-100 text-green-700'
                                    : 'bg-red-100 text-red-700'
                                }`}>
                                {tenant.tenant_admin?.account_stats ? 'Active' : 'Disabled'}
                            </span>

                        </div>


                        <div>
                            <p className="text-xs text-gray-500">
                                Last Login
                            </p>

                            <p className="text-sm text-gray-900">
                                {tenant.tenant_admin?.last_login
                                    ? new Date(tenant.tenant_admin.last_login).toLocaleString()
                                    : 'Never'}
                            </p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4 mt-2">

                <div className="flex items-center gap-2 mb-3">

                    <FaUsers className="text-indigo-600" />

                    <h2 className="text-sm font-semibold text-gray-900">
                        Students
                    </h2>

                </div>
                {
                    tenant.students?.length > 0 ? (

                        <div className="space-y-2">
                            {
                                tenant.students.map((student, index) => (
                                    <div
                                        key={student._id || index}
                                        className="flex items-center justify-between bg-gray-50 rounded-lg px-3 py-2"
                                    >
                                        <div>
                                            <p className="text-sm font-medium text-gray-900">
                                                {student.name || student.email}
                                            </p>

                                            <p className="text-xs text-gray-500">
                                                {student.email}
                                            </p>
                                        </div>
                                        <span className="text-xs text-gray-500">
                                            Student
                                        </span>
                                    </div>
                                ))
                            }
                        </div>

                    ) : (
                        <p className="text-sm text-gray-500">
                            No students assigned
                        </p>
                    )
                }
            </div>

            <div className="bg-white rounded-xl shadow-sm p-4 mt-2">

                <div className="flex items-center gap-2 mb-2">

                    <FaClock className="text-indigo-600" />

                    <h2 className="text-sm font-semibold text-gray-900">
                        Activity
                    </h2>

                </div>


                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">

                    <div>
                        <p className="text-xs text-gray-500">
                            Created At
                        </p>

                        <p className="text-sm font-medium text-gray-900">
                            {new Date(tenant.createdAt).toLocaleString()}
                        </p>
                    </div>

                    <div>
                        <p className="text-xs text-gray-500">
                            Updated At
                        </p>
                        <p className="text-sm font-medium text-gray-900">
                            {new Date(tenant.updatedAt).toLocaleString()}
                        </p>
                    </div>
                </div>
            </div>

            <div className="">
                <UpdateTenant 
                    tenantData={tenant}
                    token={token}
                />
            </div>
        </div>
    )
}

export default ViewTenant