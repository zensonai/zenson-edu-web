import React from 'react'
import DashData from '../superAdmin/Dashboard/DashData'
import QuickAction from '../superAdmin/Dashboard/QuickAction'
import LatestAduits from '../superAdmin/Dashboard/LatestAduits'
import PlanChart from '../superAdmin/Dashboard/PlanChart'
import TenantChart from '../superAdmin/Dashboard/TenantChart'
import PlanTable from '../superAdmin/Dashboard/PlanTable'
import UserData from '../superAdmin/Dashboard/UserData'

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
                                    <TenantChart />
                                </div>
                                <div className="w-full md:ml-4 ml-0 xl:mt-0 md:mt-0 mt-4">
                                    <PlanTable />
                                </div>
                            </div>
                        </div>
                        <div className="xl:w-1/3 md:ml-4 md:mt-0 mt-4">
                            <div className="">
                                <PlanChart />                            
                            </div>
                            <div className="mt-4">
                                <UserData />
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full xl:w-1/5">
                    <div className="">
                        <LatestAduits />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SuperAdminDash