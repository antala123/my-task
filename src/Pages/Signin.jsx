import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { signInStart, signInSuccess, signInFail } from "../Redux/User/UserSlice"
import { useDispatch, useSelector } from "react-redux"

export default function Signup() {

    const [formData, setFormData] = useState({
        Email: "",
        Password: "",
    });


    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { loading, error } = useSelector((state) => state.user);

    const [successMessage, setSuccessMessage] = useState(null);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.id]: e.target.value });
    };


    const HandelSubmit = async (e) => {
        e.preventDefault();

        try {
            dispatch(signInStart());

            const res = await fetch(" https://p2carebackend.onrender.com/user/login ", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData)
            })

            if (res.ok) {
                const data = await res.json();
                dispatch(signInSuccess(data.data));
                setSuccessMessage("User sign in successfully. ")
                navigate('/');

            }
            else {
                const errorText = await res.text();
                dispatch(signInFail(errorText));
            }
        }
        catch (error) {
            dispatch(signInFail(error));
        }

    }

    return (
        <div>
            <div className="bg-gray-100  h-screen flex items-center justify-center">
                <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
                    <h2 className="text-2xl font-semibold mb-6">Sign In</h2>
                    <form method="post" onSubmit={HandelSubmit}>
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
                                onChange={handleChange}
                                value={formData.Email}
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
                                onChange={handleChange}
                                value={formData.Password}
                            />
                        </div>

                        <div className="flex justify-between">
                            <button
                                className="bg-blue-500 w-full text-white font-bold py-2 px-4 rounded-lg focus:outline-none focus:shadow-outline my-2"
                                type="submit"
                                disabled={loading}
                            >
                                {loading ? "Signing in..." : "Sign In"}
                            </button>
                        </div>

                    </form>

                    <p className=' text-center text-rose-600 text-base'>{error ? error : ''}</p>
                    <p className=' text-center text-green-600 text-base'>{successMessage ? successMessage : ''}</p>


                    <p className="mt-4 text-gray-600 text-sm">
                        Already have an account?
                        <Link to="/signup" className='text-blue-700'> Sign Up</Link>
                    </p>
                </div>
            </div>
        </div >
    )
}
