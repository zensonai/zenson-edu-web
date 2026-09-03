import React from 'react'
import { useAuth } from '../../context/AuthContext'
import CountData from './tenantAdmins/CountData'
import TimeCard from './TimeCard'
import TeacherCoutData from './teachers/TeacherCoutData'
import StdCountData from './students/StdCountData'
import UpcomingAssignments from './students/UpcomingAssignments'
import UpComingClass from './UpComingClass'
import ProgressChart from './students/ProgressChart'
import PaymentHistory from './PaymentHistory'
import ClassAssignmentChart from './ClassAssignmentChart'
import MarksAssignment from './MarksAssignment'
import ChartUsers from './tenantAdmins/ChartUsers'
import Calendar from './Calendar'

const AllUserDash = () => {
    const token = localStorage.getItem('access_token')
    const { auth } = useAuth()

    return (
        <div>
            <div className="lg:flex">
                <div className="lg:w-3/4">
                    {
                        auth.role === 'institute_admin' ?
                            <CountData />
                            :
                            <div className="">
                                {
                                    auth.role === 'teacher' ?
                                        <TeacherCoutData />
                                        :
                                        <StdCountData />
                                }
                            </div>
                    }

                    <div className="mt-4">
                        <div className="lg:flex">
                            <div className="lg:w-1/2">
                                <UpComingClass />
                            </div>
                            <div className="lg:w-1/2 lg:ml-4 ml-0 lg:mt-0 mt-4">
                                {
                                    auth?.role === 'student' ?
                                        <ProgressChart />
                                        :
                                        <div className="">
                                            <MarksAssignment />
                                        </div>
                                }
                            </div>
                        </div>
                    </div>
                </div>



                <div className="lg:w-1/4 lg:ml-4 lg:mt-0 mt-4">
                    <div className="">
                        <TimeCard />
                    </div>
                    <div className="mt-4">
                        {
                            auth?.role === 'student' ?
                                <UpcomingAssignments />
                                :
                                <Calendar />
                        }
                    </div>
                </div>
            </div>

            <div className="lg:mt-4 flex">
                <div className="lg:w-1/2">
                    {
                        auth.role === 'institute_admin' ?
                            <ChartUsers />
                            :
                            <div className="">
                                <ClassAssignmentChart />
                            </div>
                    }
                </div>

                <div className="lg:w-1/2 lg:ml-4 ml-0">
                    <PaymentHistory />
                </div>
            </div>
        </div>
    )
}

export default AllUserDash