import React, { useEffect, useState } from 'react'
import API from '../../../services/api'

const Payments = () => {
    const token = localStorage.getItem("access_token")
    const [payments, setPayments] = useState([])
    const [statusFilter, setStatusFilter] = useState('All')
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        const fetchpayments = async () => {
            try {
                const res = await API.get('/payment/fetch-all-payments', {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                })

                if (res.data.success === true) {
                    setPayments(res.data.result || [])
                }
            } catch (error) {
                console.error(error)
            } finally {
                setLoading(false)
            }
        }

        if (token) {
            fetchpayments()
        } else {
            setLoading(false)
        }
    }, [token])

    const filteredPayments = statusFilter === 'All'
        ? payments
        : payments.filter(
            payment => payment.transaction_status === statusFilter
        )

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

    const formatDate = (date) => {
        if (!date) return '-'

        return new Date(date).toLocaleDateString('en-US', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        })
    }

    const formatAmount = (amount) => {
        return new Intl.NumberFormat('en-LK', {
            style: 'currency',
            currency: 'LKR',
            minimumFractionDigits: 2,
        }).format(amount || 0)
    }

    return (
        <div className="min-h-screen w-full bg-white px-3 py-5 sm:px-5 sm:py-6 lg:px-8">
            <div className="w-full">

                <div className="mb-6 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 sm:text-3xl">
                            Payments
                        </h1>

                        <p className="mt-1 text-sm text-gray-500">
                            Manage and review all payment transactions.
                        </p>
                    </div>

                    <div className="w-full lg:w-56">
                        <label className="mb-2 block text-sm font-medium text-gray-700">
                            Filter by Status
                        </label>

                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value)}
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

                <div className="mb-6 grid grid-cols-2 gap-3 sm:grid-cols-2 lg:grid-cols-4">
                    <div className="rounded-xl bg-gray-50 p-4 ring-1 ring-gray-100">
                        <p className="text-xs font-medium text-gray-500">
                            Total
                        </p>

                        <p className="mt-1 text-xl font-bold text-gray-900">
                            {payments.length}
                        </p>
                    </div>

                    <div className="rounded-xl bg-gray-50 p-4 ring-1 ring-gray-100">
                        <p className="text-xs font-medium text-gray-500">
                            Pending
                        </p>

                        <p className="mt-1 text-xl font-bold text-amber-600">
                            {payments.filter(
                                payment => payment.transaction_status === 'Pending'
                            ).length}
                        </p>
                    </div>

                    <div className="rounded-xl bg-gray-50 p-4 ring-1 ring-gray-100">
                        <p className="text-xs font-medium text-gray-500">
                            Under Review
                        </p>

                        <p className="mt-1 text-xl font-bold text-blue-600">
                            {payments.filter(
                                payment => payment.transaction_status === 'Under Review'
                            ).length}
                        </p>
                    </div>

                    <div className="rounded-xl bg-gray-50 p-4 ring-1 ring-gray-100">
                        <p className="text-xs font-medium text-gray-500">
                            Approved
                        </p>

                        <p className="mt-1 text-xl font-bold text-emerald-600">
                            {payments.filter(
                                payment => payment.transaction_status === 'Approved'
                            ).length}
                        </p>
                    </div>
                </div>

                <div className="hidden overflow-hidden rounded-2xl bg-white ring-1 ring-gray-100 md:block">
                    <div className="w-full overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="border-b border-gray-100 bg-gray-50">
                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Payment
                                    </th>

                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        User
                                    </th>

                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Amount
                                    </th>

                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Type
                                    </th>

                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Status
                                    </th>

                                    <th className="px-5 py-4 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Date
                                    </th>

                                    <th className="px-5 py-4 text-right text-xs font-semibold uppercase tracking-wide text-gray-500">
                                        Action
                                    </th>
                                </tr>
                            </thead>

                            <tbody className="divide-y divide-gray-100">
                                {loading ? (
                                    <tr>
                                        <td
                                            colSpan="7"
                                            className="px-5 py-14 text-center text-sm text-gray-500"
                                        >
                                            Loading payments...
                                        </td>
                                    </tr>
                                ) : filteredPayments.length === 0 ? (
                                    <tr>
                                        <td
                                            colSpan="7"
                                            className="px-5 py-14 text-center"
                                        >
                                            <p className="text-sm font-medium text-gray-700">
                                                No payments found
                                            </p>

                                            <p className="mt-1 text-sm text-gray-400">
                                                There are no payments matching the selected status.
                                            </p>
                                        </td>
                                    </tr>
                                ) : (
                                    filteredPayments.map((payment) => (
                                        <tr
                                            key={payment._id}
                                            className="transition hover:bg-gray-50"
                                        >
                                            <td className="px-5 py-4">
                                                <p className="max-w-[180px] truncate font-medium text-gray-900">
                                                    {payment.payment_reference || 'No Reference'}
                                                </p>

                                                <p className="mt-1 max-w-[220px] truncate text-xs text-gray-400">
                                                    {payment.desc_payment || '-'}
                                                </p>
                                            </td>

                                            <td className="px-5 py-4">
                                                <p className="max-w-[200px] truncate font-medium text-gray-800">
                                                    {payment.user?.email ||
                                                        payment.user?.first_name ||
                                                        'User'}
                                                </p>

                                                {payment.tenant?.tenant_name && (
                                                    <p className="mt-1 max-w-[180px] truncate text-xs text-gray-400">
                                                        {payment.tenant.tenant_name}
                                                    </p>
                                                )}
                                            </td>

                                            <td className="whitespace-nowrap px-5 py-4">
                                                <span className="font-semibold text-gray-900">
                                                    {formatAmount(payment.amount)}
                                                </span>
                                            </td>

                                            <td className="px-5 py-4">
                                                <span className="whitespace-nowrap text-sm text-gray-700">
                                                    {payment.payment_type}
                                                </span>
                                            </td>

                                            <td className="px-5 py-4">
                                                <span
                                                    className={`inline-flex whitespace-nowrap rounded-full px-2.5 py-1 text-xs font-semibold ${getStatusStyle(
                                                        payment.transaction_status
                                                    )}`}
                                                >
                                                    {payment.transaction_status}
                                                </span>
                                            </td>

                                            <td className="whitespace-nowrap px-5 py-4">
                                                <span className="text-sm text-gray-600">
                                                    {formatDate(payment.createdAt)}
                                                </span>
                                            </td>

                                            <td className="px-5 py-4 text-right">
                                                <a href={`payment/view/${payment._id}`}>
                                                    <button
                                                        type="button"
                                                        className="mt-4 w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                                                    >
                                                        View
                                                    </button>
                                                </a>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {!loading && filteredPayments.length > 0 && (
                        <div className="border-t border-gray-100 px-5 py-4">
                            <p className="text-sm text-gray-500">
                                Showing{' '}
                                <span className="font-medium text-gray-700">
                                    {filteredPayments.length}
                                </span>{' '}
                                payment{filteredPayments.length !== 1 ? 's' : ''}
                            </p>
                        </div>
                    )}
                </div>

                <div className="space-y-3 md:hidden">
                    {loading ? (
                        <div className="rounded-2xl bg-white px-4 py-12 text-center ring-1 ring-gray-100">
                            <p className="text-sm text-gray-500">
                                Loading payments...
                            </p>
                        </div>
                    ) : filteredPayments.length === 0 ? (
                        <div className="rounded-2xl bg-white px-4 py-12 text-center ring-1 ring-gray-100">
                            <p className="text-sm font-medium text-gray-700">
                                No payments found
                            </p>

                            <p className="mt-1 text-sm text-gray-400">
                                There are no payments matching the selected status.
                            </p>
                        </div>
                    ) : (
                        filteredPayments.map((payment) => (
                            <div
                                key={payment._id}
                                className="rounded-2xl bg-white p-4 ring-1 ring-gray-100"
                            >
                                <div className="flex items-start justify-between gap-3">
                                    <div className="min-w-0">
                                        <p className="truncate font-semibold text-gray-900">
                                            {payment.payment_reference || 'No Reference'}
                                        </p>

                                        <p className="mt-1 truncate text-xs text-gray-400">
                                            {formatDate(payment.createdAt)}
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

                                <div className="mt-4 grid grid-cols-2 gap-4">
                                    <div className="min-w-0">
                                        <p className="text-xs text-gray-400">
                                            User
                                        </p>

                                        <p className="mt-1 truncate text-sm font-medium text-gray-800">
                                            {payment.user?.email ||
                                                payment.user?.first_name ||
                                                'User'}
                                        </p>
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-xs text-gray-400">
                                            Amount
                                        </p>

                                        <p className="mt-1 truncate text-sm font-semibold text-gray-900">
                                            {formatAmount(payment.amount)}
                                        </p>
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-xs text-gray-400">
                                            Payment Type
                                        </p>

                                        <p className="mt-1 truncate text-sm text-gray-700">
                                            {payment.payment_type}
                                        </p>
                                    </div>

                                    <div className="min-w-0">
                                        <p className="text-xs text-gray-400">
                                            Tenant
                                        </p>

                                        <p className="mt-1 truncate text-sm text-gray-700">
                                            {payment.tenant?.tenant_name || '-'}
                                        </p>
                                    </div>
                                </div>

                                <div className="mt-4 border-t border-gray-100 pt-4">
                                    <p className="text-xs text-gray-400">
                                        Description
                                    </p>

                                    <p className="mt-1 line-clamp-2 text-sm text-gray-700">
                                        {payment.desc_payment || '-'}
                                    </p>
                                </div>

                                <a href={`payment/view/${payment._id}`}>
                                    <button
                                        type="button"
                                        className="mt-4 w-full rounded-lg border border-gray-200 bg-white px-3 py-2.5 text-sm font-medium text-gray-700 transition hover:bg-gray-50"
                                    >
                                        View Payment
                                    </button>
                                </a>

                            </div>
                        ))
                    )}

                    {!loading && filteredPayments.length > 0 && (
                        <div className="px-1 py-2">
                            <p className="text-sm text-gray-500">
                                Showing{' '}
                                <span className="font-medium text-gray-700">
                                    {filteredPayments.length}
                                </span>{' '}
                                payment{filteredPayments.length !== 1 ? 's' : ''}
                            </p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default Payments