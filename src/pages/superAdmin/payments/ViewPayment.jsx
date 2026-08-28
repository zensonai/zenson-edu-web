import React, { useEffect, useState } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import API from '../../../services/api'
import UpdatePayment from './UpdatePayment'

const ViewPayment = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    const token = localStorage.getItem('access_token')
    const [payment, setPayment] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchpayment = async () => {
            try {
                const res = await API.get(`/payment/fetch-one-payments/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (res.data.success === true) {
                    setPayment(res.data.result)
                }
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        if (token && id) {
            fetchpayment()
        } else {
            setLoading(false)
        }
    }, [token, id])

    const formatAmount = (amount) => {
        return new Intl.NumberFormat('en-LK', {
            style: 'currency',
            currency: 'LKR',
            minimumFractionDigits: 2,
        }).format(amount || 0)
    }

    const formatDate = (date) => {
        if (!date) return '-'

        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        })
    }

    const formatDateTime = (date) => {
        if (!date) return '-'

        return new Date(date).toLocaleString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
        })
    }

    const getStatusStyle = (status) => {
        switch (status) {
            case 'Pending':
                return 'bg-amber-50 text-amber-700 ring-1 ring-amber-200'
            case 'Under Review':
                return 'bg-blue-50 text-blue-700 ring-1 ring-blue-200'
            case 'Approved':
                return 'bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200'
            case 'Rejected':
                return 'bg-red-50 text-red-700 ring-1 ring-red-200'
            default:
                return 'bg-gray-50 text-gray-700 ring-1 ring-gray-200'
        }
    }

    if (loading) {
        return (
            <div className="min-h-screen w-full bg-white px-4 py-6 sm:px-6 lg:px-8">
                <div className="flex min-h-[400px] items-center justify-center">
                    <p className="text-sm text-gray-500">
                        Loading payment...
                    </p>
                </div>
            </div>
        )
    }

    if (!payment) {
        return (
            <div className="min-h-screen w-full bg-white px-4 py-6 sm:px-6 lg:px-8">
                <div className="flex min-h-[400px] flex-col items-center justify-center text-center">
                    <h1 className="text-xl font-semibold text-gray-900">
                        Payment Not Found
                    </h1>

                    <p className="mt-2 text-sm text-gray-500">
                        The requested payment could not be found.
                    </p>

                    <button
                        type="button"
                        onClick={() => navigate(-1)}
                        className="mt-5 rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-gray-800"
                    >
                        Go Back
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="min-h-screen w-full bg-white px-3 py-5 sm:px-5 sm:py-6 lg:px-8">
            <div className="w-full">

                <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                    <div>
                        <button
                            type="button"
                            onClick={() => navigate(-1)}
                            className="mb-3 text-sm font-medium text-gray-500 transition hover:text-gray-900"
                        >
                            ← Back to Payments
                        </button>

                        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                            Payment Details
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            View complete payment transaction information.
                        </p>
                    </div>

                    <div>
                        <span
                            className={`inline-flex rounded-full px-3 py-1.5 text-sm font-semibold ${getStatusStyle(
                                payment.transaction_status
                            )}`}
                        >
                            {payment.transaction_status}
                        </span>
                    </div>
                </div>

                <div className="grid grid-cols-1 gap-5 lg:grid-cols-3">

                    <div className="space-y-5 lg:col-span-2">

                        <div className="rounded-2xl bg-white p-5 ring-1 ring-gray-100 sm:p-6">
                            <div className="mb-5">
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Payment Information
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Main details of this payment.
                                </p>
                            </div>

                            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">

                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                        Payment Reference
                                    </p>

                                    <p className="mt-1 break-all text-sm font-semibold text-gray-900">
                                        {payment.payment_reference || '-'}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                        Amount
                                    </p>

                                    <p className="mt-1 text-lg font-bold text-gray-900">
                                        {formatAmount(payment.amount)}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                        Payment Type
                                    </p>

                                    <p className="mt-1 text-sm font-medium text-gray-800">
                                        {payment.payment_type || '-'}
                                    </p>
                                </div>

                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                        Transaction Status
                                    </p>

                                    <div className="mt-1">
                                        <span
                                            className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusStyle(
                                                payment.transaction_status
                                            )}`}
                                        >
                                            {payment.transaction_status}
                                        </span>
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                        Description
                                    </p>

                                    <p className="mt-2 whitespace-pre-wrap break-words rounded-lg bg-gray-50 p-3 text-sm leading-6 text-gray-700">
                                        {payment.desc_payment || '-'}
                                    </p>
                                </div>

                            </div>
                        </div>

                        <div className="rounded-2xl bg-white p-5 ring-1 ring-gray-100 sm:p-6">
                            <div className="mb-5">
                                <h2 className="text-lg font-semibold text-gray-900">
                                    Payment Proof
                                </h2>

                                <p className="mt-1 text-sm text-gray-500">
                                    Uploaded payment verification document.
                                </p>
                            </div>

                            {payment.payment_proof ? (
                                <div className="">
                                    <img
                                        src={`${import.meta.env.VITE_APP_API_FILES}/uploads/payment_proof/${payment.payment_proof}`}
                                        alt="Payment proof"
                                        className="h-120 w-120"
                                        onLoad={() => console.log('Payment proof loaded')}
                                        onError={(e) => {
                                            console.log('Payment proof failed:', e.currentTarget.src)
                                        }}
                                    />
                                </div>
                            ) : (
                                <div className="rounded-xl bg-gray-50 px-4 py-10 text-center">
                                    <p className="text-sm text-gray-500">
                                        No payment proof uploaded.
                                    </p>
                                </div>
                            )}
                        </div>

                    </div>

                    <div className="space-y-5">

                        <div className="rounded-2xl bg-white p-5 ring-1 ring-gray-100 sm:p-6">
                            <h2 className="text-lg font-semibold text-gray-900">
                                User Information
                            </h2>

                            <div className="mt-5 space-y-4">

                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                        User
                                    </p>

                                    <p className="mt-1 break-all text-sm font-medium text-gray-800">
                                        {payment.user?.email ||
                                            payment.user?.first_name ||
                                            'User'}
                                    </p>
                                </div>

                                {payment.user?.first_name && (
                                    <div>
                                        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                            Name
                                        </p>

                                        <p className="mt-1 text-sm text-gray-700">
                                            {payment.user.first_name}{' '}
                                            {payment.user.last_name || ''}
                                        </p>
                                    </div>
                                )}

                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                        Tenant
                                    </p>

                                    <p className="mt-1 text-sm font-medium text-gray-800">
                                        {payment.tenant?.tenant_name || '-'}
                                    </p>
                                </div>

                            </div>
                        </div>

                        <div className="rounded-2xl bg-white p-5 ring-1 ring-gray-100 sm:p-6">
                            <h2 className="text-lg font-semibold text-gray-900">
                                Transaction Timeline
                            </h2>

                            <div className="mt-5 space-y-5">

                                <div>
                                    <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                        Created
                                    </p>

                                    <p className="mt-1 text-sm text-gray-700">
                                        {formatDateTime(payment.createdAt)}
                                    </p>
                                </div>

                                {payment.verified_at && (
                                    <div>
                                        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                            Verified At
                                        </p>

                                        <p className="mt-1 text-sm text-gray-700">
                                            {formatDateTime(payment.verified_at)}
                                        </p>
                                    </div>
                                )}

                                {payment.verified_by && (
                                    <div>
                                        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                            Verified By
                                        </p>

                                        <p className="mt-1 break-all text-sm text-gray-700">
                                            {payment.verified_by?.email ||
                                                payment.verified_by?.first_name ||
                                                'Administrator'}
                                        </p>
                                    </div>
                                )}

                                {payment.rejection_reason && (
                                    <div>
                                        <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                            Rejection Reason
                                        </p>

                                        <p className="mt-2 rounded-lg bg-red-50 p-3 text-sm leading-5 text-red-700">
                                            {payment.rejection_reason}
                                        </p>
                                    </div>
                                )}

                            </div>
                        </div>

                        <div className="rounded-2xl bg-gray-50 p-5 ring-1 ring-gray-100 sm:p-6">
                            <p className="text-xs font-medium uppercase tracking-wide text-gray-400">
                                Payment ID
                            </p>

                            <p className="mt-1 break-all text-xs text-gray-600">
                                {payment._id}
                            </p>
                        </div>
                    </div>
                </div>

                <div className="mt-16">
                    <UpdatePayment 
                        paymentID={id}
                        payment={payment}
                    />
                </div>
            </div>
        </div>
    )
}

export default ViewPayment