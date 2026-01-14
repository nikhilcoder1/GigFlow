import { useState } from "react";
import api from "../services/api";

const CreateGig = () => {
  const [title,setTitle]=useState("");
  const [description,setDescription]=useState("");
  const [budget,setBudget]=useState("");

  const submit = async (e) => {
    e.preventDefault();
    try{
      await api.post("/api/gigs",{title,description,budget});
      window.location.href="/";
    }catch{
      alert("Login required");
    }
  };

  return (
    <form onSubmit={submit}>
      <h2>Create Gig</h2>
      <input placeholder="Title" onChange={e=>setTitle(e.target.value)} />
      <input placeholder="Description" onChange={e=>setDescription(e.target.value)} />
      <input placeholder="Budget" onChange={e=>setBudget(e.target.value)} />
      <button>Create</button>
    </form>
  );
};
export default CreateGig;