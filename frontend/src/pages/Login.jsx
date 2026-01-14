import { useState } from "react";
import api from "../services/api";

const Login = () => {
  const [email,setEmail]=useState("");
  const [password,setPassword]=useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/auth/login",{email,password});
      window.location.href="/";
    } catch {
      alert("Invalid credentials");
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Login</h2>
      <input placeholder="Email" onChange={e=>setEmail(e.target.value)} />
      <input type="password" placeholder="Password" onChange={e=>setPassword(e.target.value)} />
      <button>Login</button>
    </form>
  );
};
export default Login;