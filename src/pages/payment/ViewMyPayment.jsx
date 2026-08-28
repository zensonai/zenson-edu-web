import React, { useEffect, useState } from 'react'
import API from '../../services/api'

const ViewMyPayment = () => {
    const token = localStorage.getItem('access_token')
    const [mypayments, setMyPayments] = useState([])
    const [statusFilter, setStatusFilter] = useState('All')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchmypayments = async () => {
            try {
                const res = await API.get('/payment/fetch-my-payments', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (res.data.success === true) {
                    setMyPayments(res.data.result || [])
                }
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        if (token) {
            fetchmypayments()
        } else {
            setLoading(false)
        }
    }, [token])

    const filteredPayments =
        statusFilter === 'All'
            ? mypayments
            : mypayments.filter(
                payment =>
                    payment.transaction_status === statusFilter
            )

    const getStatusStyle = status => {
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

    const formatAmount = amount => {
        return new Intl.NumberFormat('en-LK', {
            style: 'currency',
            currency: 'LKR',
            minimumFractionDigits: 2,
        }).format(amount || 0)
    }

    const formatDate = date => {
        if (!date) return '-'

        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        })
    }

    return (
        <div className="min-h-screen w-full bg-white px-3 py-5 sm:px-5 sm:py-6 lg:px-8">
            <div className="w-full">
                <div className="mb-5 flex flex-col gap-4 sm:mb-6 sm:flex-row sm:items-end sm:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                            My Payments
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            View your payment history and transaction status.
                        </p>
                    </div>

                    <div className="w-full sm:w-56">
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Filter by Status
                        </label>

                        <select
                            value={statusFilter}
                            onChange={e => setStatusFilter(e.target.value)}
                            className="w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm text-gray-700 outline-none transition focus:border-gray-400 focus:ring-2 focus:ring-gray-100"
                        >
                            <option value="All">All Payments</option>
                            <option value="Pending">Pending</option>
                            <option value="Under Review">Under Review</option>
                            <option value="Approved">Approved</option>
                            <option value="Rejected">Rejected</option>
                        </select>
                    </div>
                </div>

                <div className="mb-5 grid grid-cols-2 gap-3 sm:grid-cols-4 sm:gap-4">
                    <div className="rounded-xl bg-gray-50 p-3 ring-1 ring-gray-100 sm:p-4">
                        <p className="text-xs font-medium text-gray-500">
                            Total
                        </p>
                        <p className="mt-1 text-xl font-bold text-gray-900 sm:text-2xl">
                            {mypayments.length}
                        </p>
                    </div>

                    <div className="rounded-xl bg-gray-50 p-3 ring-1 ring-gray-100 sm:p-4">
                        <p className="text-xs font-medium text-gray-500">
                            Pending
                        </p>
                        <p className="mt-1 text-xl font-bold text-amber-600 sm:text-2xl">
                            {
                                mypayments.filter(
                                    payment =>
                                        payment.transaction_status === 'Pending'
                                ).length
                            }
                        </p>
                    </div>

                    <div className="rounded-xl bg-gray-50 p-3 ring-1 ring-gray-100 sm:p-4">
                        <p className="text-xs font-medium text-gray-500">
                            Approved
                        </p>
                        <p className="mt-1 text-xl font-bold text-emerald-600 sm:text-2xl">
                            {
                                mypayments.filter(
                                    payment =>
                                        payment.transaction_status === 'Approved'
                                ).length
                            }
                        </p>
                    </div>

                    <div className="rounded-xl bg-gray-50 p-3 ring-1 ring-gray-100 sm:p-4">
                        <p className="text-xs font-medium text-gray-500">
                            Rejected
                        </p>
                        <p className="mt-1 text-xl font-bold text-red-600 sm:text-2xl">
                            {
                                mypayments.filter(
                                    payment =>
                                        payment.transaction_status === 'Rejected'
                                ).length
                            }
                        </p>
                    </div>
                </div>

                <div className="overflow-hidden rounded-2xl bg-white ring-1 ring-gray-200">
                    <div className="border-b border-gray-100 px-4 py-4 sm:px-6">
                        <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
                            <div>
                                <h2 className="text-base font-semibold text-gray-900">
                                    Payment History
                                </h2>

                                <p className="mt-1 text-xs text-gray-400 sm:text-sm">
                                    {filteredPayments.length} payment
                                    {filteredPayments.length !== 1 ? 's' : ''} found
                                </p>
                            </div>

                            {statusFilter !== 'All' && (
                                <span
                                    className={`w-fit rounded-full px-3 py-1 text-xs font-semibold ${getStatusStyle(
                                        statusFilter
                                    )}`}
                                >
                                    {statusFilter}
                                </span>
                            )}
                        </div>
                    </div>

                    {loading ? (
                        <div className="px-4 py-12 text-center text-sm text-gray-500 sm:px-6">
                            Loading payments...
                        </div>
                    ) : filteredPayments.length === 0 ? (
                        <div className="px-4 py-12 text-center sm:px-6">
                            <p className="text-sm font-medium text-gray-700">
                                No payments found
                            </p>

                            <p className="mt-1 text-sm text-gray-400">
                                No payments match the selected status.
                            </p>
                        </div>
                    ) : (
                        <>
                            <div className="hidden overflow-x-auto md:block">
                                <table className="w-full">
                                    <thead>
                                        <tr className="border-b border-gray-100 bg-gray-50">
                                            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                Reference
                                            </th>

                                            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                Payment Type
                                            </th>

                                            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                Amount
                                            </th>

                                            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                Status
                                            </th>

                                            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                                Date
                                            </th>
                                            <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">

                                            </th>
                                        </tr>
                                    </thead>

                                    <tbody className="divide-y divide-gray-100">
                                        {filteredPayments.map(payment => (
                                            <tr
                                                key={payment._id}
                                                className="transition hover:bg-gray-50"
                                            >
                                                <td className="px-5 py-4">
                                                    <div>
                                                        <p className="font-medium text-gray-900">
                                                            {payment.payment_reference ||
                                                                'No Reference'}
                                                        </p>

                                                        <p className="mt-1 max-w-[250px] truncate text-xs text-gray-400">
                                                            {payment.desc_payment}
                                                        </p>
                                                    </div>
                                                </td>

                                                <td className="px-5 py-4">
                                                    <span className="text-sm text-gray-700">
                                                        {payment.payment_type}
                                                    </span>
                                                </td>

                                                <td className="px-5 py-4">
                                                    <span className="font-semibold text-gray-900">
                                                        {formatAmount(
                                                            payment.amount
                                                        )}
                                                    </span>
                                                </td>

                                                <td className="px-5 py-4">
                                                    <span
                                                        className={`inline-flex rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusStyle(
                                                            payment.transaction_status
                                                        )}`}
                                                    >
                                                        {payment.transaction_status}
                                                    </span>
                                                </td>

                                                <td className="px-5 py-4">
                                                    <span className="text-sm text-gray-600">
                                                        {formatDate(
                                                            payment.createdAt
                                                        )}
                                                    </span>
                                                </td>
                                                <td className="px-5 py-4">
                                                    {payment.transaction_status === 'Rejected' && (
                                                        <a href={`/dashboard/payments/resubmit-payment/${payment._id}`}>
                                                            <button
                                                                type="button"
                                                                className="mt-4 w-full rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-800"
                                                            >
                                                                Resubmit Payment
                                                            </button>
                                                        </a>
                                                    )}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            <div className="divide-y divide-gray-100 md:hidden">
                                {filteredPayments.map(payment => (
                                    <div
                                        key={payment._id}
                                        className="p-4"
                                    >
                                        <div className="flex items-start justify-between gap-3">
                                            <div className="min-w-0">
                                                <p className="truncate text-sm font-semibold text-gray-900">
                                                    {payment.payment_reference ||
                                                        'No Reference'}
                                                </p>

                                                <p className="mt-1 truncate text-xs text-gray-400">
                                                    {payment.desc_payment}
                                                </p>
                                            </div>

                                            <span
                                                className={`shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusStyle(
                                                    payment.transaction_status
                                                )}`}
                                            >
                                                {payment.transaction_status}
                                            </span>
                                        </div>

                                        <div className="mt-4 grid grid-cols-2 gap-3">
                                            <div>
                                                <p className="text-xs text-gray-400">
                                                    Payment Type
                                                </p>

                                                <p className="mt-1 text-sm font-medium text-gray-700">
                                                    {payment.payment_type}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-xs text-gray-400">
                                                    Amount
                                                </p>

                                                <p className="mt-1 text-sm font-semibold text-gray-900">
                                                    {formatAmount(
                                                        payment.amount
                                                    )}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-xs text-gray-400">
                                                    Date
                                                </p>

                                                <p className="mt-1 text-sm text-gray-700">
                                                    {formatDate(
                                                        payment.createdAt
                                                    )}
                                                </p>
                                            </div>

                                            <div>
                                                <p className="text-xs text-gray-400">
                                                    Reference
                                                </p>

                                                <p className="mt-1 truncate text-sm text-gray-700">
                                                    {payment.payment_reference ||
                                                        '-'}
                                                </p>
                                            </div>

                                            <div className="">
                                                {payment.transaction_status === 'Rejected' && (
                                                    <a href={`/dashboard/payments/resubmit-payment/${payment._id}`}>
                                                        <button
                                                            type="button"
                                                            className="mt-4 w-full rounded-lg bg-gray-900 px-4 py-2.5 text-sm font-semibold text-white hover:bg-gray-800"
                                                        >
                                                            Resubmit Payment
                                                        </button>
                                                    </a>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </>
                    )}

                    {!loading && filteredPayments.length > 0 && (
                        <div className="border-t border-gray-100 px-4 py-4 sm:px-5">
                            <p className="text-sm text-gray-500">
                                Showing{' '}
                                <span className="font-medium text-gray-700">
                                    {filteredPayments.length}
                                </span>{' '}
                                payment
                                {filteredPayments.length !== 1 ? 's' : ''}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default ViewMyPayment