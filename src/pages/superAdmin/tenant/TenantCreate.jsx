import React, { useEffect, useState } from 'react'
import API from '../../../services/api'
import Toast from '../../../component/Toast/Toast'
import DefaultInput from '../../../component/Form/DefaultInput'
import useForm from '../../../hooks/useForm'
import TextAreaInput from '../../../component/Form/TextAreaInput'
import Dropdown from '../../../component/Form/Dropdown'
import DefaultButton from '../../../component/Buttons/DefaultButton'

const TenantCreate = () => {
    const token = localStorage.getItem("access_token")
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false)
    const [tenantadmins, setTenantadmins] = useState([])

    const { values, handleChange } = useForm({
        tenant_name: '',
        tenant_admin: '',
        desc: '',
    })

    useEffect(() => {
        const fetechtenantAdmins = async () => {
            const res = await API.get('/tenant/tenant-admins', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if (res.data.success === true) {
                setTenantadmins(res.data.result)
            }
        }

        if (token) fetechtenantAdmins()
    }, [token])

    const headleCreateTenant = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await API.post('/tenant/create-tenant', values, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if (res.data.success === true) {
                setToast({
                    success: true,
                    message: res.data.message,
                })

                setTimeout(() => {
                    window.location.reload()
                }, 3000)
            }
        }
        catch (err) {
            setToast({
                success: false,
                message: err.response?.data?.message || "Something went wrong",
            })
        }
        finally {
            setLoading(false)
        }
    }


    return (
        <div className="max-w-7xl mx-auto">
            {toast && (
                <div className="fixed top-8 right-8 z-50">
                    <Toast
                        success={toast.success}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}

            <div className="bg-white border border-gray-200 rounded-2xl shadow-lg overflow-hidden">
                <div className="px-8 py-6 border-b border-gray-100 bg-gradient-to-r from-indigo-600 via-blue-600 to-cyan-500">
                    <h2 className="text-2xl font-bold text-white">
                        Create New Tenant
                    </h2>
                    <p className="text-sm text-indigo-100 mt-2">
                        Create a new institute and assign a tenant administrator.
                    </p>
                </div>

                <form onSubmit={headleCreateTenant} method="post" className="p-8 space-y-7">
                    <div className="grid md:grid-cols-2 gap-6">
                        <DefaultInput
                            label="Enter Tenant Name"
                            value={values.tenant_name}
                            name="tenant_name"
                            onChange={handleChange}
                            required
                            placeholder="Tenant Name"
                        />

                        <Dropdown
                            label="Select Tenant Admin"
                            name="tenant_admin"
                            value={values.tenant_admin}
                            onChange={handleChange}
                            required
                            options={tenantadmins.map((admin) => ({
                                value: admin._id,
                                label: admin.email,
                            }))}
                        />
                    </div>

                    <TextAreaInput
                        label="Tenant Description"
                        value={values.desc}
                        name="desc"
                        required
                        placeholder="Enter a short description about this tenant..."
                        onChange={handleChange}
                    />

                    <div className="flex justify-end pt-4 border-t border-gray-100">
                        <div className="w-full md:w-auto">
                            <DefaultButton
                                type="submit"
                                label={loading ? "Creating Tenant..." : "Create Tenant"}
                            />
                        </div>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default TenantCreate