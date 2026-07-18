import React, { useEffect, useState } from 'react'
import useForm from '../../hooks/useForm';
import API from '../../services/api';
import DefaultInput from '../../component/Form/DefaultInput';
import DateInput from '../../component/Form/DateInput';
import TextAreaInput from '../../component/Form/TextAreaInput';
import DefaultButton from '../../component/Buttons/DefaultButton';
import FileInput from '../../component/Form/FileInput';
import Toast from '../../component/Toast/Toast';


const UpdateProfile = ({ profiledata, token }) => {
    const [loading, setLoading] = useState(false)
    const [toast, setToast] = useState(false)

    const { values, handleChange, setValues } = useForm({
        nic: '',
        fname: '',
        mname: '',
        lname: '',
        mobile: '',
        dob: '',
        address: '',
        bio: '',
        profile_image: null
    });

    useEffect(() => {
        if (profiledata) {
            setValues({
                nic: profiledata.nic || '',
                fname: profiledata.fname || '',
                mname: profiledata.mname || '',
                lname: profiledata.lname || '',
                mobile: profiledata.mobile || '',
                dob: profiledata.dob ? profiledata.dob.split('T')[0] : '',
                address: profiledata.address || '',
                bio: profiledata.bio || '',
                profile_image: null,
            });
        }
    }, [profiledata, setValues]);


    const headleUpdateProfile = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {

            const formData = new FormData();

            Object.entries(values).forEach(([key, value]) => {
                if (value !== null && value !== "") {
                    formData.append(key, value);
                }
            });

            const res = await API.patch(
                "/profile/update-profile",
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                        "Content-Type": "multipart/form-data",
                    },
                }
            );

            if (res.data.success === true) {
                setToast({
                    success: true,
                    message: res.data.message,
                });

                setTimeout(() => window.location.reload(), 3000);
            }

        } catch (err) {
            console.log(err.response?.data);
            setToast({
                success: false,
                message: err.response?.data?.message || "Something went wrong",
            });

        } finally {
            setLoading(false);
        }
    };


    return (
        <div className='bg-white p-4 rounded-lg shadow-md'>
            {toast && (
                <div className="fixed top-8 right-8 z-50">
                    <Toast
                        success={toast.success}
                        message={toast.message}
                        onClose={() => setToast(null)}
                    />
                </div>
            )}
            <form onSubmit={headleUpdateProfile} method="post">
                <div className="">
                    <FileInput
                        label={"Select Your Profle Image"}
                        name={"profile_image"}
                        onChange={(e) =>
                            handleChange({
                                target: {
                                    name: "profile_image",
                                    value: e.target.files[0],
                                },
                            })
                        }
                    />
                </div>
                <div className="md:flex">
                    <div className="md:w-1/2 w-full md:mr-2 mr-0">
                        <DefaultInput
                            label={"Enter NIC Nubmer"}
                            value={values.nic}
                            name={'nic'}
                            placeholder={"Enter Your NIC Number"}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="md:w-1/2 w-full">
                        <DefaultInput
                            label={"Enter First Name"}
                            value={values.fname}
                            name={'fname'}
                            placeholder={"Enter Your First Name"}
                            onChange={handleChange}
                        />
                    </div>
                </div>


                <div className="md:flex">
                    <div className="md:w-1/2 w-full md:mr-2 mr-0">
                        <DefaultInput
                            label={"Enter Middle Name"}
                            value={values.mname}
                            name={'mname'}
                            placeholder={"Enter Your Middle Name"}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="md:w-1/2 w-full">
                        <DefaultInput
                            label={"Enter Last Name"}
                            value={values.lname}
                            name={'lname'}
                            placeholder={"Enter Your Last Name"}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="md:flex">
                    <div className="md:w-1/2 w-full md:mr-2 mr-0">
                        <DefaultInput
                            label={"Enter Mobile Number"}
                            value={values.mobile}
                            name={'mobile'}
                            placeholder={"Enter Your Mobile Name"}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="md:w-1/2 w-full">
                        <DateInput
                            label={"Enter You Date of Birth"}
                            value={values.dob}
                            name={'dob'}
                            onChange={handleChange}
                        />
                    </div>
                </div>

                <div className="">
                    <TextAreaInput
                        label={"Enter Address"}
                        value={values.address}
                        name={'address'}
                        onChange={handleChange}
                        placeholder='Enter your Home Address'
                    />
                </div>

                <div className="">
                    <TextAreaInput
                        label={"Enter Bio"}
                        value={values.bio}
                        name={'bio'}
                        onChange={handleChange}
                        placeholder='Enter your Bio'
                    />
                </div>

                <div className="">
                    <DefaultButton
                        type='submit'
                        label={loading ? 'Updating...' : 'Update My data'}
                    />
                </div>
            </form>
        </div>
    )
}

export default UpdateProfile