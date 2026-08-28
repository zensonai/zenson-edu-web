import React, { useState } from 'react'
import API from '../../../services/api'
import DefaultButton from '../../../component/Buttons/DefaultButton'
import Dropdown from '../../../component/Form/Dropdown'
import TextAreaInput from '../../../component/Form/TextAreaInput'
import Toast from '../../../component/Toast/Toast'

const UpdatePayment = ({ paymentID, payment }) => {
    const token = localStorage.getItem('access_token')
    const [paymentType, setPaymentType] = useState('')
    const [rejectReason, setRejectReason] = useState('')
    const [loading, setLoading] = useState(false)
    const [action, setAction] = useState('')
    const [toast, setToast] = useState(null)

    const paymentTypeOptions = [
        { value: 'Monthly', label: 'Monthly' },
        { value: 'Yearly', label: 'Yearly' },
    ]

    const handleApprove = async () => {
        const confirmed = window.confirm(
            'Are you sure you want to approve this payment?'
        )

        if (!confirmed) {
            return
        }

        if (
            payment?.payment_type === 'Tenant Subscription' &&
            !paymentType
        ) {
            setToast({
                success: false,
                message: 'Please select Monthly or Yearly',
            })
            return
        }

        setLoading(true)
        setAction('approve')

        try {
            const body =
                payment?.payment_type === 'Tenant Subscription'
                    ? { paymentType }
                    : { paymentType: 'Monthly' }

            const res = await API.post(
                `/payment/approve-payment/${paymentID}`,
                body,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            if (res.data.success === true) {
                setToast({
                    success: true,
                    message: res.data.message,
                })

                setTimeout(() => {
                    window.location.reload()
                }, 1500)
            }
        } catch (err) {
            setToast({
                success: false,
                message:
                    err.response?.data?.message ||
                    'Failed to approve payment',
            })
        } finally {
            setLoading(false)
            setAction('')
        }
    }

    const handleReject = async () => {
        const confirmed = window.confirm(
            'Are you sure you want to reject this payment?'
        )

        if (!confirmed) {
            return
        }

        if (!rejectReason.trim()) {
            setToast({
                success: false,
                message: 'Please enter a rejection reason',
            })
            return
        }

        setLoading(true)
        setAction('reject')

        try {
            const res = await API.post(
                `/payment/reject-payment/${paymentID}`,
                {
                    reject_reason: rejectReason,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            )

            if (res.data.success === true) {
                setToast({
                    success: true,
                    message: res.data.message,
                })

                setTimeout(() => {
                    window.location.reload()
                }, 1500)
            }
        } catch (err) {
            setToast({
                success: false,
                message:
                    err.response?.data?.message ||
                    'Failed to reject payment',
            })
        } finally {
            setLoading(false)
            setAction('')
        }
    }

    return (
        <div className="w-full">
            {toast && (
                <div className="fixed left-4 right-4 top-5 z-50 sm:left-auto sm:right-6 sm:top-8">
                    <Toast
                        success={toast.success}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}


            {(payment?.transaction_status === 'Pending' ||
                payment?.transaction_status === 'Under Review') && (
                    <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-gray-200">
                        <div className="border-b border-gray-100 px-5 py-4 sm:px-6">
                            <h2 className="text-base font-semibold text-gray-900">
                                Payment Review
                            </h2>
                            <p className="mt-1 text-sm text-gray-500">
                                Review the payment and choose an appropriate action.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 divide-y divide-gray-200 md:grid-cols-2 md:divide-x md:divide-y-0">
                            <div className="p-5 sm:p-6">
                                <div className="mb-5">
                                    <span className="inline-flex rounded-full bg-emerald-50 px-3 py-1 text-xs font-semibold text-emerald-700 ring-1 ring-emerald-200">
                                        Approve Payment
                                    </span>

                                    <h3 className="mt-3 text-lg font-semibold text-gray-900">
                                        Confirm Payment
                                    </h3>

                                    <p className="mt-1 text-sm leading-6 text-gray-500">
                                        Approve this payment after verifying the
                                        submitted payment details and proof.
                                    </p>
                                </div>

                                {payment?.payment_type === 'Tenant Subscription' && (
                                    <div className="mb-5">
                                        <Dropdown
                                            label="Subscription Type"
                                            name="paymentType"
                                            value={paymentType}
                                            onChange={(e) =>
                                                setPaymentType(e.target.value)
                                            }
                                            options={paymentTypeOptions}
                                            required
                                        />
                                    </div>
                                )}

                                <DefaultButton
                                    type="button"
                                    label={
                                        loading && action === 'approve'
                                            ? 'Approving...'
                                            : 'Approve Payment'
                                    }
                                    disabled={loading}
                                    onClick={handleApprove}
                                />
                            </div>

                            <div className="p-5 sm:p-6">
                                <div className="mb-5">
                                    <span className="inline-flex rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-700 ring-1 ring-red-200">
                                        Reject Payment
                                    </span>

                                    <h3 className="mt-3 text-lg font-semibold text-gray-900">
                                        Reject Payment
                                    </h3>

                                    <p className="mt-1 text-sm leading-6 text-gray-500">
                                        Provide a clear reason if the submitted
                                        payment cannot be approved.
                                    </p>
                                </div>

                                <div className="mb-5">
                                    <TextAreaInput
                                        label="Rejection Reason"
                                        name="rejectReason"
                                        rows={5}
                                        value={rejectReason}
                                        placeholder="Enter the reason for rejecting this payment"
                                        onChange={(e) =>
                                            setRejectReason(e.target.value)
                                        }
                                    />
                                </div>

                                <DefaultButton
                                    type="button"
                                    label={
                                        loading && action === 'reject'
                                            ? 'Rejecting...'
                                            : 'Reject Payment'
                                    }
                                    disabled={loading}
                                    onClick={handleReject}
                                />
                            </div>
                        </div>
                    </div>
                )}
        </div>
    )
}

export default UpdatePayment