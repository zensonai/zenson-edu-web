import React from 'react'
import { FaBuilding, FaUserShield, FaChalkboardTeacher, FaUserGraduate, FaClipboardList, FaUsers } from 'react-icons/fa'

const DashData = () => {

    const datacount = [
        {
            id: 1,
            name: "Total Tenants",
            desc: "Registered institutes",
            values: 25,
            icon: FaBuilding,
            color: "blue"
        },
        {
            id: 2,
            name: "Institute Admin",
            desc: "Management accounts",
            values: 25,
            icon: FaUserShield,
            color: "lime"
        },
        {
            id: 3,
            name: "Teachers",
            desc: "Active teachers",
            values: 25,
            icon: FaChalkboardTeacher,
            color: "indigo"
        },
        {
            id: 4,
            name: "Students",
            desc: "Learning users",
            values: 25,
            icon: FaUserGraduate,
            color: "yellow"
        },
        {
            id: 5,
            name: "Plans",
            desc: "Subscription plans",
            values: 25,
            icon: FaClipboardList,
            color: "orange"
        },
        {
            id: 6,
            name: "Platform Users",
            desc: "System accounts",
            values: 25,
            icon: FaUsers,
            color: "red"
        }
    ]

    const colors = {
        blue: {
            bg: "bg-blue-500/10",
            icon: "text-blue-600"
        },
        lime: {
            bg: "bg-lime-500/10",
            icon: "text-lime-600"
        },
        indigo: {
            bg: "bg-indigo-500/10",
            icon: "text-indigo-600"
        },
        yellow: {
            bg: "bg-yellow-500/10",
            icon: "text-yellow-600"
        },
        orange: {
            bg: "bg-orange-500/10",
            icon: "text-orange-600"
        },
        red: {
            bg: "bg-red-500/10",
            icon: "text-red-600"
        }
    }

    return (
        <div className="grid xl:grid-cols-6 md:grid-cols-3 grid-cols-2 gap-4">
            {
                datacount.map((data, index) => {
                    const Icon = data.icon
                    const style = colors[data.color]

                    return (
                        <div
                            key={index}
                            className="shadow relative rounded-xl border border-white/40 bg-white/60 backdrop-blur-xl p-4 hover:shadow-lg transition-all duration-300"
                        >
                            <div className="flex justify-between items-start">

                                <div>
                                    <p className="text-sm font-semibold text-gray-700">
                                        {data.name}
                                    </p>

                                    <p className="mt-2 text-xs text-gray-400">
                                        {data.desc}
                                    </p>

                                    <h2 className="mt-3 text-2xl font-bold text-gray-800">
                                        {data.values}
                                    </h2>
                                </div>

                                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${style.bg}`}>
                                    <Icon className={`text-lg ${style.icon}`} />
                                </div>

                            </div>
                        </div>
                    )
                })
            }
        </div>
    )
}

export default DashData