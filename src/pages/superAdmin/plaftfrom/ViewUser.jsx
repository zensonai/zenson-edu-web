import React from 'react'
import { useParams } from 'react-router-dom'

const ViewUser = () => {
    const { id } = useParams()
    return (
        <div>ViewUser {id}</div>
    )
}

export default ViewUser