import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const CreateGig = () => {
  const [form, setForm] = useState({ title: "", description: "", budget: "" });
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/gigs", form);
      navigate("/");
    } catch (err) {
      if (err.response?.status === 401) {
        alert("Please login to post a gig");
      } else {
        alert("Failed to create gig");
      }
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ padding: 24 }}>
      <h2>Create Gig</h2>
      <input placeholder="Title" onChange={(e) => setForm({ ...form, title: e.target.value })} />
      <br />
      <textarea placeholder="Description" onChange={(e) => setForm({ ...form, description: e.target.value })} />
      <br />
      <input type="number" placeholder="Budget" onChange={(e) => setForm({ ...form, budget: e.target.value })} />
      <br />
      <button>Create</button>
    </form>
  );
};

export default CreateGig;