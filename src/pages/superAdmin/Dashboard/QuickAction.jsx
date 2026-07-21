import React from 'react'
import { FaBuilding, FaUserShield, FaClipboardList, FaUsers, FaRobot } from 'react-icons/fa'

const QuickAction = () => {

    const quickactions = [
        {
            id: 1,
            name: "Create Tenant",
            icon: FaBuilding,
            color: "text-blue-600",
            bg: "bg-blue-100/70",
            link: '/dashboard/tenant/create',
        },
        {
            id: 2,
            name: "Create Institute Admin",
            icon: FaUserShield,
            color: "text-lime-600",
            bg: "bg-lime-100/70",
            link: '/dashboard/user/create',
        },
        {
            id: 3,
            name: "Create Plan",
            icon: FaClipboardList,
            color: "text-orange-600",
            bg: "bg-orange-100/70",
            link: '/dashboard/plan/create',
        },
        {
            id: 4,
            name: "Create Platform User",
            icon: FaUsers,
            color: "text-indigo-600",
            bg: "bg-indigo-100/70",
            link: '/dashboard/user/create',
        },
        {
            id: 5,
            name: "AI Insights",
            icon: FaRobot,
            color: "text-red-600",
            bg: "bg-red-100/70",
            link: '#',
        },
    ]

    return (
        <div>

            <h1 className=" font-semibold text-gray-700 mb-4">
                Quick Actions
            </h1>

            <div className="grid md:grid-cols-5 grid-cols-2 gap-4">
                {
                    quickactions.map((data, index) => {
                        const Icon = data.icon

                        return (
                            <a
                                href={data.link}
                                key={index}
                                className="border shadow border-white/40 bg-white/60 backdrop-blur-xl rounded-xl p-5 hover:shadow-lg transition-all duration-300 cursor-pointer"
                            >
                                <div className="flex flex-col items-center justify-center text-center">

                                    <div className={`w-12 h-12 rounded-xl ${data.bg} flex items-center justify-center`}>
                                        <Icon className={`text-2xl ${data.color}`} />
                                    </div>

                                    <p className="mt-4 text-sm font-semibold text-gray-700">
                                        {data.name}
                                    </p>

                                </div>
                            </a>
                        )
                    })
                }
            </div>

        </div>
    )
}

export default QuickAction