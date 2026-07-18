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


                </Route>


            </Routes>
        </BrowserRouter>
    )
}

export default App

