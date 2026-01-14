import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await api.post("/auth/register", form);
    navigate("/login");
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form onSubmit={handleSubmit} className="bg-white p-6 shadow w-96">
        <h2 className="text-2xl mb-4">Register</h2>

        <input className="border p-2 w-full mb-3" placeholder="Name"
          onChange={(e) => setForm({ ...form, name: e.target.value })} />

        <input className="border p-2 w-full mb-3" placeholder="Email"
          onChange={(e) => setForm({ ...form, email: e.target.value })} />

        <input type="password" className="border p-2 w-full mb-3" placeholder="Password"
          onChange={(e) => setForm({ ...form, password: e.target.value })} />

        <button className="bg-black text-white w-full p-2">
          Register
        </button>
      </form>
    </div>
  );
};

export default Register;