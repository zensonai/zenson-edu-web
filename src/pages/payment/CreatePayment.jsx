import React, { useState } from 'react'
import useForm from '../../hooks/useForm'
import API from '../../services/api'
import Toast from '../../component/Toast/Toast'
import DefaultInput from '../../component/Form/DefaultInput'
import Dropdown from '../../component/Form/Dropdown'
import FileInput from '../../component/Form/FileInput'
import TextAreaInput from '../../component/Form/TextAreaInput'
import DefaultButton from '../../component/Buttons/DefaultButton'

const CreatePayment = () => {
    const token = localStorage.getItem('access_token')
    const [toast, setToast] = useState(false)
    const [loading, setLoading] = useState(false)

    const { values, handleChange } = useForm({
        desc_payment: '',
        amount: '',
        payment_type: '',
        payment_reference: '',
        payment_proof: null,
        subscription_type: ''
    })

    const paymentTypeOptions = [
        { value: 'Tenant Subscription', label: 'Tenant Subscription' },
        { value: 'Course Fee', label: 'Course Fee' },
        { value: 'Exam Fee', label: 'Exam Fee' },
        { value: 'Registration Fee', label: 'Registration Fee' },
        { value: 'Other', label: 'Other' },
    ]

    const subscriptionTypeOptions = [
        { value: 'Monthly', label: 'Monthly' },
        { value: 'Yearly', label: 'Yearly' },
    ]

    const handleFileChange = (e) => {
        const file = e.target.files[0]

        if (file) {
            handleChange({
                target: {
                    name: 'payment_proof',
                    value: file
                }
            })
        }
    }

    const headleCreatePayment = async (e) => {
        e.preventDefault()
        setLoading(true)

        try {
            const formData = new FormData()

            formData.append('desc_payment', values.desc_payment)
            formData.append('amount', values.amount)
            formData.append('payment_type', values.payment_type)
            formData.append('payment_reference', values.payment_reference)

            if (values.payment_type === 'Tenant Subscription') {
                formData.append('subscription_type', values.subscription_type)
            }

            if (values.payment_proof) {
                formData.append('payment_proof', values.payment_proof)
            }

            const res = await API.post('/payment/create-payment', formData, {
                headers: {
                    Authorization: `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data',
                },
            })

            if (res.data.success === true) {
                setToast({
                    success: true,
                    message: res.data.message,
                })

                setTimeout(() => window.location.reload(), 3000)
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
        <div className="bg-gray-50 px-4 py-5 sm:px-6 sm:py-8">
            {toast && (
                <div className="fixed left-4 right-4 top-5 z-50 sm:left-auto sm:right-6 sm:top-8">
                    <Toast
                        success={toast.success}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}

            <div className="w-full">
                <div className="mb-5 sm:mb-7">
                    <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                        Create Payment
                    </h1>
                    <p className="mt-2 text-sm text-gray-500">
                        Submit your payment details and payment proof.
                    </p>
                </div>

                <div className="rounded-2xl bg-white p-4 shadow-sm ring-1 ring-gray-100 sm:p-6 lg:p-8">
                    <form onSubmit={headleCreatePayment} method="post">
                        <div className="grid grid-cols-1 gap-x-6 gap-y-0 md:grid-cols-2">
                            <div className="md:col-span-2">
                                <TextAreaInput
                                    label="Enter Payment Description"
                                    name="desc_payment"
                                    rows={4}
                                    value={values.desc_payment}
                                    placeholder="Enter payment description"
                                    required
                                    onChange={handleChange}
                                />
                            </div>

                            <DefaultInput
                                label="Enter Amount"
                                type="number"
                                value={values.amount}
                                name="amount"
                                placeholder="Enter payment amount"
                                required
                                onChange={handleChange}
                            />

                            <Dropdown
                                label="Select Payment Type"
                                name="payment_type"
                                value={values.payment_type}
                                required
                                onChange={handleChange}
                                options={paymentTypeOptions}
                            />

                            {values.payment_type === 'Tenant Subscription' && (
                                <Dropdown
                                    label="Select Subscription Type"
                                    name="subscription_type"
                                    value={values.subscription_type}
                                    required
                                    onChange={handleChange}
                                    options={subscriptionTypeOptions}
                                />
                            )}

                            <DefaultInput
                                label="Enter Payment Reference"
                                value={values.payment_reference}
                                name="payment_reference"
                                placeholder="Payment reference"
                                required
                                onChange={handleChange}
                            />

                            <div className="md:col-span-2">
                                <FileInput
                                    label="Upload Payment Proof"
                                    name="payment_proof"
                                    required
                                    accept="image/*"
                                    onChange={handleFileChange}
                                />
                            </div>

                            <div className="mt-2 w-full md:col-span-2 sm:w-auto">
                                <DefaultButton
                                    type="submit"
                                    label={
                                        loading
                                            ? 'Creating Payment...'
                                            : 'Create Payment'
                                    }
                                    disabled={loading}
                                />
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default CreatePayment