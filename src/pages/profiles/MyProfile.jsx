import React, { useEffect, useState } from 'react'
import API from '../../services/api'
import UpdateProfile from './UpdateProfile'
import UpdatePassword from './UpdatePassword'


const MyProfile = () => {
    const token = localStorage.getItem('access_token')

    const [myprofile, setMyProfile] = useState()

    useEffect(() => {
        const fetchmyprofile = async () => {
            const res = await API.get('/profile/profile-data', {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            })
            if (res.data.success === true) {
                setMyProfile(res.data.result)
            }
        }

        if (token) fetchmyprofile()
    }, [token])

    const [updtemenu, setUpdatemenu] = useState('update_profile')

    const healdeMenuChage = (menu) => {
        setUpdatemenu(menu)
    }

    return (
        <div className="">
            <div className="md:flex justify-between">
                <div className="md:w-1/2 w-full bg-white md:p-8 p-4 rounded-lg shadow-md md:mr-2 mr-0">
                    <div className="w-16 h-16 rounded-full overflow-hidden">
                        <img
                            src={
                                myprofile?.profle_img
                                    ? `${import.meta.env.VITE_APP_API_FILES}/uploads/profile/${myprofile.profle_img}`
                                    : "/default-profile.png"
                            }
                            alt="profile-img"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <div className="space-y-8">
                        <div>
                            <h2 className="text-3xl font-bold text-gray-900">
                                {myprofile?.fname} {myprofile?.mname} {myprofile?.lname}
                            </h2>

                            <p className="mt-3 text-gray-600 leading-7">
                                {myprofile?.bio}
                            </p>
                        </div>

                        <div className="divide-y divide-gray-200">
                            <div className="flex py-4">
                                <span className="w-40 text-sm font-medium text-gray-500">
                                    NIC Number
                                </span>
                                <span className="flex-1 text-gray-900 font-medium">
                                    {myprofile?.nic}
                                </span>
                            </div>

                            <div className="flex py-4">
                                <span className="w-40 text-sm font-medium text-gray-500">
                                    Date of Birth
                                </span>
                                <span className="flex-1 text-gray-900 font-medium">
                                    {myprofile?.dob}
                                </span>
                            </div>

                            <div className="flex py-4">
                                <span className="w-40 text-sm font-medium text-gray-500">
                                    Mobile
                                </span>
                                <span className="flex-1 text-gray-900 font-medium">
                                    {myprofile?.mobile}
                                </span>
                            </div>

                            <div className="flex py-4">
                                <span className="w-40 text-sm font-medium text-gray-500">
                                    Address
                                </span>
                                <span className="flex-1 text-gray-900 font-medium">
                                    {myprofile?.address}
                                </span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="w-full md:w-1/2 mt-6 md:mt-0">
                    <div className="flex flex-wrap gap-3 mb-6">
                        <button
                            onClick={() => healdeMenuChage("update_profile")}
                            className={`px-5 py-3 rounded-xl font-medium transition-all duration-300 ${updtemenu === "update_profile"
                                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                                : "bg-white border border-gray-200 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
                                }`}
                        >
                            Update Profile
                        </button>

                        <button
                            onClick={() => healdeMenuChage("update_password")}
                            className={`px-5 py-3 rounded-xl font-medium transition-all duration-300 ${updtemenu === "update_password"
                                ? "bg-indigo-600 text-white shadow-lg shadow-indigo-500/30"
                                : "bg-white border border-gray-200 text-gray-600 hover:bg-indigo-50 hover:text-indigo-600"
                                }`}
                        >
                            Update Password
                        </button>
                    </div>

                    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm p-6">
                        {(() => {
                            if (updtemenu === "update_profile") {
                                return <UpdateProfile profiledata={myprofile} token={token} />;
                            }

                            if (updtemenu === "update_password") {
                                return <UpdatePassword token={token} />;
                            }

                            return (
                                <div className="flex items-center justify-center py-20">
                                    <p className="text-gray-500">Select an option</p>
                                </div>
                            );
                        })()}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default MyProfile