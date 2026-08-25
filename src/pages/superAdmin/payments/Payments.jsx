import React, { useState } from 'react'
import API from '../../../services/api'

const Payments = () => {
    const token = localStorage.getItem("access_token")
    const [payments, setPayments] = useState([])

    useState(() => {
        const fetchpayments = async () => {
            const res = await API.get('/admin/payments', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if(res.data.success === true) {
                setPayments(res.data.result)
            }
        }
        if(token) fetchpayments()
    }, [token])
    return (
        <div>Payments</div>
    )
}

export default Payments