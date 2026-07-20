import React from 'react'
import DashData from '../superAdmin/Dashboard/DashData'
import QuickAction from '../superAdmin/Dashboard/QuickAction'
import LatestAduits from '../superAdmin/Dashboard/LatestAduits'

const SuperAdminDash = () => {
    return (
        <div>
            <div className="flex flex-col md:flex-row gap-6">
                <div className="w-full md:w-4/5">
                    <DashData />

                    <div className="md:flex mt-4">
                        <div className="md:w-2/3">
                            <QuickAction />
                        </div>
                        <div className="md:w-1/3">
                            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Modi delectus sit enim magni, dolor doloribus vero fugit recusandae tempore ut cum explicabo natus quaerat praesentium ex laboriosam deleniti, voluptates eos.
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-1/5">
                    <div className="">
                        <LatestAduits />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default SuperAdminDash