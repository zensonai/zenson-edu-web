import React from 'react'
import DashData from '../superAdmin/Dashboard/DashData'
import QuickAction from '../superAdmin/Dashboard/QuickAction'
import LatestAduits from '../superAdmin/Dashboard/LatestAduits'
import PlanChart from '../superAdmin/Dashboard/PlanChart'
import TenantChart from '../superAdmin/Dashboard/TenantChart'
import PlanTable from '../superAdmin/Dashboard/PlanTable'
import UserData from '../superAdmin/Dashboard/UserData'
import TimeCard from '../../component/others/TimeCard'
import AdminCard from '../superAdmin/Dashboard/AdminCard'

const SuperAdminDash = () => {
    return (
        <div>
            <div className="flex flex-col xl:flex-row gap-6">
                <div className="w-full xl:w-4/5">
                    <DashData />

                    <div className="xl:flex mt-4">
                        <div className="xl:w-2/3">
                            <QuickAction />

                            <div className="md:flex mt-4">
                                <div className="w-full">
                                    <div className="mb-4">
                                        <TimeCard />
                                    </div>
                                    <TenantChart />
                                </div>
                                <div className="w-full md:ml-4 ml-0 xl:mt-0 md:mt-0 mt-4">
                                    <PlanTable />
                                </div>
                            </div>
                        </div>
                        <div className="xl:w-1/3 xl:ml-4">
                            <div className="md:flex lg:block">
                                <div className="w-full">
                                    <PlanChart />
                                </div>
                                <div className="mt-4 md:ml-4 lg:ml-0 w-full">
                                    <UserData />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full xl:w-1/5">
                    <div className="">
                        <LatestAduits />
                    </div>
                    <div className="">
                        <AdminCard />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SuperAdminDash