import React from 'react'
import BarChart from '../../../component/Dashboard/Charts/BarChart'

const TenantChart = () => {
    return (
        <div className="bg-white rounded-lg shadow p-5 h-[460px]">
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
                data={[
                    {
                        month: 'Jan',
                        registered: 25,
                    },
                    {
                        month: 'Feb',
                        registered: 32,
                    },
                    {
                        month: 'Mar',
                        registered: 41,
                    },
                    {
                        month: 'Apr',
                        registered: 52,
                    },
                    {
                        month: 'May',
                        registered: 8,
                    },
                    {
                        month: 'Jun',
                        registered: 68,
                    }
                ]}
                bars={[
                    {
                        dataKey: 'registered',
                        name: 'Registered',
                        color: '#3b82f6'
                    },
                ]}
            />
        </div>
    )
}

export default TenantChart