import React, { useEffect, useState } from 'react'
import API from '../../services/api'

const PaymentHistory = () => {
    const token = localStorage.getItem('access_token')
    const [payments, setPayments] = useState([])

    useEffect(() => {
        const fetchmypayments = async () => {
            const res = await API.get('/payment/fetch-my-payments', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if (res.data.success === true) {
                setPayments(res.data.result || [])
            }
        }
        if (token) {
            fetchmypayments()
        }
    }, [token])

    return (
        <div className="w-full rounded-2xl border border-slate-200 bg-white">
            <div className="border-b border-slate-100 px-4 py-4 sm:px-6">
                <h2 className="text-lg font-bold text-slate-800">
                    Payment History
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                    View your previous payment records
                </p>
            </div>

            <div className="w-full overflow-x-auto">
                <table className="w-full min-w-[700px] text-left">
                    <thead>
                        <tr className="border-b border-slate-100 bg-slate-50">
                            <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500 sm:px-6">
                                #
                            </th>
                            <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">
                                Payment
                            </th>
                            <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">
                                Amount
                            </th>
                            <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">
                                Method
                            </th>
                            <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500">
                                Status
                            </th>
                            <th className="px-4 py-3 text-xs font-bold uppercase tracking-wide text-slate-500 sm:px-6">
                                Date
                            </th>
                        </tr>
                    </thead>

                    <tbody>
                        {payments.length > 0 ? (
                            payments.slice(0, 4).map((payment, index) => {
                                return (
                                    <tr
                                        key={payment._id || index}
                                        className="border-b border-slate-100 last:border-0"
                                    >
                                        <td className="px-4 py-4 text-sm font-semibold text-slate-400 sm:px-6">
                                            {index + 1}
                                        </td>

                                        <td className="px-4 py-4">
                                            <div>
                                                <p className="text-sm font-bold text-slate-800">
                                                    {payment.payment_type || payment.type || 'Payment'}
                                                </p>
                                                <p className="mt-1 text-xs text-slate-400">
                                                    {payment._id || '-'}
                                                </p>
                                            </div>
                                        </td>

                                        <td className="px-4 py-4">
                                            <span className="font-bold text-indigo-600">
                                                {payment.amount ?? 0}
                                            </span>
                                        </td>

                                        <td className="px-4 py-4 text-sm font-medium text-slate-600">
                                            {payment.payment_method || payment.method || '-'}
                                        </td>

                                        <td className="px-4 py-4">
                                            <span className="inline-flex rounded-full bg-lime-50 px-3 py-1 text-xs font-bold text-lime-700">
                                                {payment.transaction_status}
                                            </span>
                                        </td>

                                        <td className="px-4 py-4 text-sm font-medium text-slate-500 sm:px-6">
                                            {payment.createdAt
                                                ? new Date(payment.createdAt).toLocaleDateString('en-GB', {
                                                    day: '2-digit',
                                                    month: 'short',
                                                    year: 'numeric',
                                                })
                                                : payment.created_at
                                                    ? new Date(payment.created_at).toLocaleDateString('en-GB', {
                                                        day: '2-digit',
                                                        month: 'short',
                                                        year: 'numeric',
                                                    })
                                                    : '-'}
                                        </td>
                                    </tr>
                                )
                            })
                        ) : (
                            <tr>
                                <td
                                    colSpan="6"
                                    className="px-4 py-12 text-center sm:px-6"
                                >
                                    <p className="text-sm font-semibold text-slate-500">
                                        No payment history found
                                    </p>
                                    <p className="mt-1 text-xs text-slate-400">
                                        Your payment records will appear here.
                                    </p>
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>

                <div className="border-t border-gray-200 text-center p-2">
                    <a href="/dashboard/payments/view-my-payments" className='text-indigo-500 text-sm font-bold'>
                        View More
                    </a>
                </div>
            </div>
        </div>
    )
}

export default PaymentHistory