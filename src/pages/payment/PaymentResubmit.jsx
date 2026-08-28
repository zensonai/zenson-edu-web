import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../../services/api'

const PaymentResubmit = () => {
    const { id } = useParams()
    const token = localStorage.getItem('access_token')
    const [payment, setPayment] = useState('')

    useEffect(() => {
        const fetchbypaymendbyid = async () => {
            const res = await API.get(`/payment/fetch-my-payment/${id}`, {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if(res.data.success === true) {
                setPayment(res.data.result)
            }
        }
        if(token) fetchbypaymendbyid()
    }, [token, id])

    return (
        <div>PaymentResubmit</div>
    )
}

export default PaymentResubmit