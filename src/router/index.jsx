import { BrowserRouter, Route, Routes } from 'react-router-dom'
import WebSite from '../layouts/WebSite'
import DefultError from '../component/Errors/DefultError'
import Dashboard from '../layouts/Dashboard'
import DashError from '../component/Errors/DashError'
import Register from '../pages/auth/Register'
import Login from '../pages/auth/Login'
import Unauthorized from './Unauthorized'
import PrivateRoute from './PrivateRoute'
import DashHome from '../pages/dashboards/DashHome'
import MyProfile from '../pages/profiles/MyProfile'
import Users from '../pages/superAdmin/plaftfrom/Users'
import ViewUser from '../pages/superAdmin/plaftfrom/ViewUser'
import CreateUser from '../pages/superAdmin/plaftfrom/CreateUser'
import AuditLogs from '../pages/superAdmin/security/AuditLogs'
import LoginHistory from '../pages/superAdmin/security/LoginHistory'
import UserAuditLog from '../pages/superAdmin/security/UserAuditLog'
import CreatePlan from '../pages/superAdmin/plan/CreatePlan'
import Plans from '../pages/superAdmin/plan/Plans'
import ViewPlan from '../pages/superAdmin/plan/ViewPlan'
import TenantCreate from '../pages/superAdmin/tenant/TenantCreate'
import Tenants from '../pages/superAdmin/tenant/Tenants'
import ViewTenant from '../pages/superAdmin/tenant/ViewTenant'
import Subscription from '../pages/instituteAdmin/Settings/Subscription'
import InstituteProfile from '../pages/instituteAdmin/Settings/InstituteProfile'
import AssignTeacher from '../pages/instituteAdmin/Settings/AssignTeacher'
import CreatePayment from '../pages/payment/CreatePayment'
import Payments from '../pages/superAdmin/payments/Payments'
import ViewPayment from '../pages/superAdmin/payments/ViewPayment'
import ViewMyPayment from '../pages/payment/ViewMyPayment'
import PaymentResubmit from '../pages/payment/PaymentResubmit'
import CreateStudent from '../pages/instituteAdmin/students/CreateStudent'
import Students from '../pages/instituteAdmin/students/Students'
import ViewStudent from '../pages/instituteAdmin/students/ViewStudent'
import Teachers from '../pages/instituteAdmin/teacher/Teachers'
import CreateTeacher from '../pages/instituteAdmin/teacher/CreateTeacher'
import ViewTeacher from '../pages/instituteAdmin/teacher/ViewTeacher'
import CreateClass from '../pages/instituteAdmin/classes/CreateClass'
import Classes from '../pages/instituteAdmin/classes/Classes'
import ViewClass from '../pages/instituteAdmin/classes/ViewClass'
import Timetable from '../pages/timetable/Timetable'
import MyClasses from '../pages/teacherDash/MyClasses'
import ViewMyClass from '../pages/teacherDash/ViewMyClass'
import AttendanceClass from '../pages/teacherDash/AttendanceClass'
import StdMyClasses from '../pages/studentDash/StdMyClasses'
import StdViewMyClass from '../pages/studentDash/StdViewMyClass'
import CreateAssignment from '../pages/teacherDash/assigments/CreateAssignment'
import Assignments from '../pages/teacherDash/assigments/Assignments'
import MyAssignments from '../pages/teacherDash/assigments/MyAssignments'
import ViewAssignment from '../pages/teacherDash/assigments/ViewAssignment'
import FetchResult from '../pages/teacherDash/result/FetchResult'
import TeacherResult from '../pages/teacherDash/result/TeacherResult'
import StudentMarks from '../pages/teacherDash/result/StudentMarks'


function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path='/' element={<WebSite />} >
                    <Route path='*' element={<DefultError />} />
                    <Route index element={<Login /> } /> 
                    <Route path='/register' element={<Register /> } />
                    <Route path='/unauthorized' element={<Unauthorized /> } /> 
                </Route>

                <Route path='/dashboard/' element={<PrivateRoute roles={['super_admin', 'institute_admin', 'teacher', 'student', 'parent']} ><Dashboard /></PrivateRoute>}>
                    <Route path='*' element={<PrivateRoute roles={['super_admin', 'institute_admin', 'teacher', 'student', 'parent']} ><DashError /></PrivateRoute>}/>
                    <Route index element={<PrivateRoute roles={['super_admin', 'institute_admin', 'teacher', 'student', 'parent']} ><DashHome /></PrivateRoute>}/>
                    <Route path='my-profile' element={<PrivateRoute roles={['super_admin', 'institute_admin', 'teacher', 'student', 'parent']} ><MyProfile /></PrivateRoute>}/>

                    {/* superAdmin */}
                    <Route path='platfrom-users' element={<PrivateRoute roles={['super_admin']} ><Users /></PrivateRoute>}/>
                    <Route path='platfrom-user/:id' element={<PrivateRoute roles={['super_admin']} ><ViewUser /></PrivateRoute>}/>
                    <Route path='user/create' element={<PrivateRoute roles={['super_admin']} ><CreateUser /></PrivateRoute>}/>

                    <Route path='security/audit-logs' element={<PrivateRoute roles={['super_admin', 'institute_admin']} ><AuditLogs /></PrivateRoute>}/>
                    <Route path='security/login-history' element={<PrivateRoute roles={['super_admin', 'institute_admin']} ><LoginHistory /></PrivateRoute>}/>
                    <Route path='security/user-auditlog/:id' element={<PrivateRoute roles={['super_admin', 'institute_admin']} ><UserAuditLog /></PrivateRoute>}/>

                    <Route path='plan/create' element={<PrivateRoute roles={['super_admin']} ><CreatePlan /></PrivateRoute>}/>
                    <Route path='plans' element={<PrivateRoute roles={['super_admin']} ><Plans /></PrivateRoute>}/>
                    <Route path='plan/:id' element={<PrivateRoute roles={['super_admin']} >< ViewPlan/></PrivateRoute>}/>

                    <Route path='tenant/create' element={<PrivateRoute roles={['super_admin']} ><TenantCreate /></PrivateRoute>}/>
                    <Route path='tenants' element={<PrivateRoute roles={['super_admin']} ><Tenants /></PrivateRoute>}/>
                    <Route path='tenant/:id' element={<PrivateRoute roles={['super_admin']} ><ViewTenant /></PrivateRoute>}/>


                    <Route path='payments' element={<PrivateRoute roles={['super_admin']} ><Payments /></PrivateRoute>}/>
                    <Route path='payment/view/:id' element={<PrivateRoute roles={['super_admin']} ><ViewPayment /></PrivateRoute>}/>

                    {/* --------------------------------------------------------------------------------------------------- */}

                    {/* institute_admin */}


                    <Route path='settings/subscription' element={<PrivateRoute roles={['super_admin', 'institute_admin']} ><Subscription /></PrivateRoute>}/>
                    <Route path='settings/profile' element={<PrivateRoute roles={['super_admin', 'institute_admin']} ><InstituteProfile /></PrivateRoute>}/>
                    <Route path='settings/assign-teacher' element={<PrivateRoute roles={['super_admin', 'institute_admin']} ><AssignTeacher /></PrivateRoute>}/>

                    
                    <Route path='payments/create-payment' element={<PrivateRoute roles={['super_admin', 'institute_admin', 'teacher', 'student']} ><CreatePayment /></PrivateRoute>}/>
                    <Route path='payments/view-my-payments' element={<PrivateRoute roles={['super_admin', 'institute_admin', 'teacher', 'student']} ><ViewMyPayment /></PrivateRoute>}/>
                    <Route path='payments/resubmit-payment/:id' element={<PrivateRoute roles={['super_admin', 'institute_admin', 'teacher', 'student']} ><PaymentResubmit /></PrivateRoute>}/>


                    <Route path='students' element={<PrivateRoute roles={['super_admin', 'institute_admin']} ><Students /></PrivateRoute>}/>
                    <Route path='student/create' element={<PrivateRoute roles={['super_admin', 'institute_admin']} ><CreateStudent /></PrivateRoute>}/>
                    <Route path='student/view/:id' element={<PrivateRoute roles={['super_admin', 'institute_admin']} ><ViewStudent /></PrivateRoute>}/>

                    <Route path='teachers' element={<PrivateRoute roles={['super_admin', 'institute_admin']} ><Teachers /></PrivateRoute>}/>
                    <Route path='teacher/create' element={<PrivateRoute roles={['super_admin', 'institute_admin']} ><CreateTeacher /></PrivateRoute>}/>
                    <Route path='teacher/view/:id' element={<PrivateRoute roles={['super_admin', 'institute_admin']} ><ViewTeacher /></PrivateRoute>}/>

                    <Route path='classes' element={<PrivateRoute roles={['super_admin', 'institute_admin']} ><Classes /></PrivateRoute>}/>
                    <Route path='class/create' element={<PrivateRoute roles={['super_admin', 'institute_admin']} ><CreateClass /></PrivateRoute>}/>
                    <Route path='class/view/:id' element={<PrivateRoute roles={['super_admin', 'institute_admin']} ><ViewClass /></PrivateRoute>}/>

                    <Route path='timetable' element={<PrivateRoute roles={['super_admin', 'institute_admin', 'teacher', 'student']} ><Timetable /></PrivateRoute>}/>
                    <Route path='classes/my-classes' element={<PrivateRoute roles={['super_admin', 'institute_admin', 'teacher', 'student']} ><MyClasses /></PrivateRoute>}/>
                    <Route path='view-my-class/:id' element={<PrivateRoute roles={['super_admin', 'institute_admin', 'teacher']} ><ViewMyClass /></PrivateRoute>}/>
                    <Route path='classes/attendance-class/:id' element={<PrivateRoute roles={['super_admin', 'institute_admin', 'teacher']} ><AttendanceClass /></PrivateRoute>}/>

                    <Route path='student/my-classes' element={<PrivateRoute roles={['super_admin', 'institute_admin', 'teacher', 'student']} ><StdMyClasses /></PrivateRoute>}/>
                    <Route path='student/view-my-class/:id' element={<PrivateRoute roles={['super_admin', 'institute_admin', 'teacher', 'student']} ><StdViewMyClass /></PrivateRoute>}/>
                   
                    <Route path='assignments' element={<PrivateRoute roles={['super_admin', 'institute_admin', 'teacher']} ><Assignments /></PrivateRoute>}/>
                    <Route path='assignment/create' element={<PrivateRoute roles={['super_admin', 'institute_admin', 'teacher']} ><CreateAssignment /></PrivateRoute>}/>
                    <Route path='student/assignments' element={<PrivateRoute roles={['super_admin', 'institute_admin', 'teacher', 'student']} ><MyAssignments /></PrivateRoute>}/>
                    
                    <Route path='assignment/view/:id' element={<PrivateRoute roles={['super_admin', 'institute_admin', 'teacher', 'student']} ><ViewAssignment /></PrivateRoute>}/>
                    <Route path='assignment/results' element={<PrivateRoute roles={['super_admin', 'institute_admin']} ><FetchResult /></PrivateRoute>}/>
                    
                    <Route path='results' element={<PrivateRoute roles={['super_admin', 'institute_admin', 'teacher']} ><TeacherResult /></PrivateRoute>}/>
                    <Route path='student/my-results' element={<PrivateRoute roles={['super_admin', 'institute_admin', 'teacher', 'student']} ><StudentMarks /></PrivateRoute>}/>



                </Route>


            </Routes>
        </BrowserRouter>
    )
}

export default App

