import { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    try {
      const response = await axios.post("http://localhost:5000/api/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      alert("Login Successful");
      window.location.href = "/dashboard";
    } catch (err) {
      setError(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="w-96 p-6 shadow-lg bg-white rounded-xl">
        <h2 className="text-2xl font-bold mb-5 text-center">Customer Login</h2>
        {error && <p className="text-red-500 text-center">{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              className="w-full p-2 border rounded"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="mb-4">
            <label className="block mb-1 font-medium">Password</label>
            <input
              type="password"
              className="w-full p-2 border rounded"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded mb-4"
          >
            Login
          </button>
          <div className="text-center">
            <p className="text-gray-600 text-sm">
              Do not have an account?{" "}
              <Link to="/signup" className="text-blue-500 font-medium">
                Sign Up
              </Link>
            </p>
            <p className="text-gray-600 text-sm mt-2">
              <Link to="/forgot-password" className="text-blue-500 font-medium">
                Forgot Password?
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
