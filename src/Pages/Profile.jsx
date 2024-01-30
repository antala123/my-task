import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { updateFail, updateStart, updateSuccess, signOutSuccess } from '../Redux/User/UserSlice';
import { useNavigate } from 'react-router-dom';



export default function Profile() {

    const { currentUser, loading, error } = useSelector((state) => state.user);
    console.log(currentUser);

    const defaultName = currentUser ? currentUser.Name : '';
    const defaultUsername = currentUser ? currentUser.Username : '';
    const defaultEmail = currentUser ? currentUser.Email : '';
    const defaultPassword = currentUser ? currentUser.Password : '';

    const [formData, setFormData] = useState({
        Name: defaultName,
        Username: defaultUsername,
        Email: defaultEmail,
        Password: defaultPassword,
    });
    // console.log(formData.Name);
    const dispatch = useDispatch();
    const [success, setSuccess] = useState(null);
    const [deleting, setDeleting] = useState(false);
    const navigate = useNavigate();


    const handlerChange = (e) => {
        setFormData({
            ...formData,
            [e.target.id]: e.target.value
        })
    }

    const updateHandler = async (e) => {
        e.preventDefault();

        try {
            dispatch(updateStart());
            const res = await fetch(`https://p2carebackend.onrender.com/user/update/${currentUser._id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: currentUser.token
                },
                body: JSON.stringify({ ...formData }),
            })
            if (res.ok) {
                const update = await res.json();
                dispatch(updateSuccess({ ...update.udata, ...currentUser }))
                setSuccess("Your profile update successfully.")


            } else {
                const error = await res.text();
                dispatch(updateFail(error));
            }
        } catch (error) {
            dispatch(updateFail(error));
        }
    }

    const deleteHandler = async (e) => {
        e.preventDefault();

        try {
            setDeleting(true);
            const res = await fetch(`https://p2carebackend.onrender.com/user/delete/${currentUser._id}`, {
                method: 'DELETE',
                headers: {
                    Authorization: currentUser.token
                },
            })
            if (res.ok) {
                const deleteUser = await res.json();
                dispatch(signOutSuccess());
                setSuccess("Your profile delete successfully.")
                console.log(deleteUser);
                setDeleting(false);
                navigate('/');
            } else {
                const error = await res.text();
                console.log(error);
                setDeleting(false);
            }
        } catch (error) {
            console.log(error);
            setDeleting(false);
        }
    }


    return (
        <div>
            <div className="bg-gray-100  h-screen flex items-center justify-center">
                <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
                    <h2 className="text-2xl font-semibold mb-6">Profile</h2>
                    <form method="post" onSubmit={updateHandler}>
                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="Name"
                            >
                                Name:
                            </label>
                            <input
                                className="w-full border rounded-lg px-3 py-2 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                name="Name"
                                id="Name"
                                defaultValue={formData.Name}
                                onChange={handlerChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="Username"
                            >
                                Username:
                            </label>
                            <input
                                className="w-full border rounded-lg px-3 py-2 leading-tight focus:outline-none focus:shadow-outline"
                                type="text"
                                name="Username"
                                id="Username"
                                defaultValue={formData.Username}
                                onChange={handlerChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="Email"
                            >
                                Email:
                            </label>
                            <input
                                className="w-full border rounded-lg px-3 py-2 leading-tight focus:outline-none focus:shadow-outline"
                                type="email"
                                name="Email"
                                id="Email"
                                defaultValue={formData.Email}
                                onChange={handlerChange}
                            />
                        </div>

                        <div className="mb-4">
                            <label
                                className="block text-gray-700 text-sm font-bold mb-2"
                                htmlFor="Password"
                            >
                                Password:
                            </label>
                            <input
                                className="w-full border rounded-lg px-3 py-2 leading-tight focus:outline-none focus:shadow-outline"
                                type="password"
                                name="Password"
                                id="Password"
                                autoComplete='false'
                                defaultValue={formData.Password}
                                onChange={handlerChange}
                            />
                        </div>

                        <div className="flex justify-between">
                            <button
                                className="bg-green-500 w-full text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline my-2"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? 'Updating...' : 'Update'}
                            </button>
                        </div>

                    </form>
                    <div className="flex justify-between">
                        <button
                            className="bg-red-500 w-full text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline my-2"
                            type="submit"
                            onClick={deleteHandler}
                            disabled={deleting}
                        >
                            {deleting ? 'Deleting' : 'Delete'}
                        </button>
                    </div>
                    <p className=' text-center text-rose-600 text-base'>{error ? error : ''}</p>
                    <p className=' text-center text-green-600 text-base'>{success ? success : ''}</p>

                </div>
            </div>

        </div>
    )
}
