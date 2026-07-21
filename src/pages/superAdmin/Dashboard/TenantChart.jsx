import React, { useEffect, useState } from 'react'
import BarChart from '../../../component/Dashboard/Charts/BarChart'
import API from '../../../services/api'

const TenantChart = () => {
    const [tenants, setTenants] = useState([])
    const [chartData, setChartData] = useState([])
    const token = localStorage.getItem('access_token')

    useEffect(() => {
        const fetchTenants = async () => {
            const res = await API.get('/tenant/fetch-tenants', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })

            if (res.data.success === true) {
                setTenants(res.data.result || [])
            }
        }

        if (token) {
            fetchTenants()
        }
    }, [token])

    useEffect(() => {
        const now = new Date()

        const months = Array.from({ length: 6 }, (_, index) => {
            const date = new Date(now.getFullYear(), now.getMonth() - (5 - index), 1)

            return {
                name: date.toLocaleString('default', { month: 'short' }),
                month: date.getMonth(),
                year: date.getFullYear()
            }
        })

        const monthlyData = months.map((item) => {
            const count = tenants.filter((tenant) => {
                const date = new Date(tenant.createdAt)

                return (
                    date.getMonth() === item.month &&
                    date.getFullYear() === item.year
                )
            }).length

            return {
                month: item.name,
                registered: count
            }
        })

        setChartData(monthlyData)
    }, [tenants])

    return (
        <div className="bg-white rounded-lg shadow p-5 xl:h-[435px]">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                        Tenant Growth
                    </h2>

                    <p className="text-sm text-gray-500">
                        Monthly tenant registrations and active tenants.
                    </p>
                </div>
            </div>

            <BarChart
                xKey="month"
                data={chartData}
                bars={[
                    {
                        dataKey: 'registered',
                        name: 'Registered',
                        color: '#3b82f6'
                    }
                ]}
            />
        </div>
    )
}

export default TenantChart