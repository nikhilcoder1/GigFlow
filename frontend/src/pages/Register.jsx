import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const Register = () => {
  const [form, setForm] = useState({});
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/auth/register", form);
      navigate("/login");
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: 24 }}>
      <h2>Register</h2>
      <input placeholder="Name" onChange={(e) => setForm({ ...form, name: e.target.value })} />
      <br />
      <input placeholder="Email" onChange={(e) => setForm({ ...form, email: e.target.value })} />
      <br />
      <input type="password" placeholder="Password" onChange={(e) => setForm({ ...form, password: e.target.value })} />
      <br />
      <button>Register</button>
    </form>
  );
};

export default Register;