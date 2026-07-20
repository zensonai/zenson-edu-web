import React, { useEffect, useState } from 'react'
import useForm from '../../../hooks/useForm'
import API from '../../../services/api'
import DefaultInput from '../../../component/Form/DefaultInput'
import TextAreaInput from '../../../component/Form/TextAreaInput'
import Dropdown from '../../../component/Form/Dropdown'
import DefaultButton from '../../../component/Buttons/DefaultButton'
import Toast from '../../../component/Toast/Toast'


const UpdateTenant = ({ tenantData, token }) => {
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false)
    const [tenantadmins, setTenantadmins] = useState([])

    const { values, handleChange, setValues } = useForm({
        tenant_admin: "",
        desc: "",
    });

    useEffect(() => {
        if (tenantData) {
            setValues({
                tenant_admin:
                    tenantData.tenant_admin?._id ||
                    tenantData.tenant_admin ||
                    "",
                desc: tenantData.desc || "",
            });
        }
    }, [tenantData]);

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

    const headleUpdateTenant = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const res = await API.patch(`/tenant/update-tenant/${tenantData._id}`, values, {
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
        <div className="mt-4">
            {toast && (
                <div className="fixed top-6 right-6 z-50">
                    <Toast
                        success={toast.success}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}

            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">

                <div className="px-8 py-6 bg-gradient-to-r from-blue-600 to-indigo-600">
                    <h2 className="text-2xl font-bold text-white">
                        Update Tenant
                    </h2>
                    <p className="text-blue-100 mt-1 text-sm">
                        Update the tenant administrator and description.
                    </p>
                </div>

                <form
                    onSubmit={headleUpdateTenant}
                    className="p-8 space-y-6"
                >
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <div className="md:col-span-2">
                            <Dropdown
                                label="Tenant Administrator"
                                name="tenant_admin"
                                value={values.tenant_admin}
                                onChange={handleChange}
                                options={tenantadmins.map((admin) => ({
                                    value: admin._id,
                                    label: admin.email,
                                }))}
                            />
                        </div>

                        <div className="md:col-span-2">
                            <TextAreaInput
                                label="Tenant Description"
                                name="desc"
                                value={values.desc}
                                onChange={handleChange}
                            />
                        </div>

                    </div>

                    <div className="flex justify-end gap-3">
                        <DefaultButton 
                            type='submit'
                            label={loading ? 'Updating...' : 'Update Tenant'}
                        />

                    </div>
                </form>

            </div>
        </div>
    )
}

export default UpdateTenant