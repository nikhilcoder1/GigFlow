import { useState } from "react";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const CreateGig = () => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    budget: ""
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/gigs", form);
      navigate("/");
    } catch {
      alert("Failed to create gig");
    }
  };

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl mb-4">Post a New Gig</h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          className="border p-2 w-full"
          placeholder="Title"
          required
          onChange={(e) => setForm({ ...form, title: e.target.value })}
        />

        <textarea
          className="border p-2 w-full"
          placeholder="Description"
          rows="4"
          required
          onChange={(e) => setForm({ ...form, description: e.target.value })}
        />

        <input
          type="number"
          className="border p-2 w-full"
          placeholder="Budget"
          required
          onChange={(e) => setForm({ ...form, budget: e.target.value })}
        />

        <button className="bg-black text-white px-4 py-2">
          Create Gig
        </button>
      </form>
    </div>
  );
};

export default CreateGig;
