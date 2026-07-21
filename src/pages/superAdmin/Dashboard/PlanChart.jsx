import React from 'react'
import PieChart from '../../../component/Dashboard/Charts/PieChart'

const PlanChart = () => {
    return (
        <div className="bg-white rounded-lg shadow p-5 h-[380px] ">
            <div className="flex items-start justify-between mb-4">
                <div>
                    <h2 className="text-lg font-semibold text-gray-800">
                        Subscription Plans
                    </h2>

                    <p className="text-sm text-gray-500">
                        Distribution of institutes by active subscription plan.
                    </p>
                </div>
            </div>

            <PieChart
                data={[
                    {
                        name: 'Students',
                        value: 500,
                        color: '#3b82f6'
                    },
                    {
                        name: 'Teachers',
                        value: 45,
                        color: '#10b981'
                    },
                    {
                        name: 'Parents',
                        value: 320,
                        color: '#f59e0b'
                    },
                    {
                        name: 'Admins',
                        value: 8,
                        color: '#ef4444'
                    }
                ]}
            />
        </div>
    )
}

export default PlanChart