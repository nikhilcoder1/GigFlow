import { useState } from "react";
import api from "../services/api";

const Register = () => {
  const [name,setName]=useState("");
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/auth/register",{name,email,password});
      window.location.href="/login";
    } catch {
      alert("Registration failed");
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Register</h2>
      <input placeholder="Name" onChange={e=>setName(e.target.value)} />
      <input placeholder="Email" onChange={e=>setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} />
      <button>Register</button>
    </form>
  );
};
export default Register;