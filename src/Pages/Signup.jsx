import { useState } from "react";
import { Link } from "react-router-dom"

export default function Signup() {

  const [formData, setFormData] = useState({
    Username: "",
    Email: "",
    Password: "",
    Name: "",
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };


  const HandelSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true)
      const res = await fetch(" https://p2carebackend.onrender.com/user/add ", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData)
      })

      if (res.ok) {
        setSuccessMessage("User Register Success...")
        setLoading(false);
      }
      else {
        const errorText = await res.text();
        setError(errorText);
        setLoading(false);
      }
    }
    catch (error) {
      setError(error)
      setLoading(false)
    }

  }

  return (
    <div>
      <div className="bg-gray-100  h-screen flex items-center justify-center">
        <div className="bg-white p-8 rounded shadow-md max-w-md w-full">
          <h2 className="text-2xl font-semibold mb-6">Sign Up</h2>
          <form method="post" onSubmit={HandelSubmit}>
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
                onChange={handleChange}
                value={formData.Name}
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
                onChange={handleChange}
                value={formData.Username}
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
                {loading ? "Signup in..." : "Sign Up"}
              </button>
            </div>

          </form>

          <p className=' text-center text-rose-600 text-base'>{error ? error : ''}</p>
          <p className=' text-center text-green-600 text-base'>{successMessage ? successMessage : ''}</p>


          <p className="mt-4 text-gray-600 text-sm">
            Already have an account?
            <Link to="/signin" className='text-blue-700'> Sign In</Link>
          </p>
        </div>
      </div>
    </div >
  )
}
