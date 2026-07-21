import React from 'react'
import AreaChart from '../../../component/Dashboard/Charts/AreaChart'

const UserData = () => {
    return (
        <div className="bg-white rounded-lg shadow p-5 h-[350px]">
            <div className="flex justify-between items-start">
                <div>
                    <h1 className="text-lg font-semibold text-gray-800">
                        User Growth
                    </h1>

                    <p className="text-sm text-gray-500">
                        Monthly user registration overview
                    </p>
                </div>
            </div>

            <AreaChart
                height={270}
                xKey="month"
                data={[
                    {
                        month: 'Jan',
                        superadmins: 5,
                        tenantadmins: 20,
                        teachers: 120,
                        students: 800,
                        parents: 500
                    },
                    {
                        month: 'Feb',
                        superadmins: 6,
                        tenantadmins: 25,
                        teachers: 150,
                        students: 950,
                        parents: 620
                    },
                    {
                        month: 'Mar',
                        superadmins: 8,
                        tenantadmins: 32,
                        teachers: 190,
                        students: 1200,
                        parents: 800
                    },
                    {
                        month: 'Apr',
                        superadmins: 10,
                        tenantadmins: 40,
                        teachers: 5,
                        students: 1500,
                        parents: 1000
                    },
                    {
                        month: 'May',
                        superadmins: 12,
                        tenantadmins: 48,
                        teachers: 300,
                        students: 1900,
                        parents: 1300
                    },
                    {
                        month: 'Jun',
                        superadmins: 15,
                        tenantadmins: 60,
                        teachers: 380,
                        students: 2400,
                        parents: 1700
                    }
                ]}
                areas={[
                    {
                        dataKey: 'superadmins',
                        name: 'Super Admins',
                        color: '#ef4444'
                    },
                    {
                        dataKey: 'tenantadmins',
                        name: 'Tenant Admins',
                        color: '#8b5cf6'
                    },
                    {
                        dataKey: 'teachers',
                        name: 'Teachers',
                        color: '#10b981'
                    },
                    {
                        dataKey: 'students',
                        name: 'Students',
                        color: '#3b82f6'
                    },
                    {
                        dataKey: 'parents',
                        name: 'Parents',
                        color: '#f59e0b'
                    }
                ]}
            />
        </div>
    )
}

export default UserData