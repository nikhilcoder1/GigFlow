import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

const GigDetails = () => {
  const {id}=useParams();
  const [gig,setGig]=useState(null);
  const [message,setMessage]=useState("");
  const [price,setPrice]=useState("");

  useEffect(()=>{
    api.get(`/api/gigs/${id}`).then(r=>setGig(r.data));
  },[id]);

  const bid = async (e) => {
    e.preventDefault();
    try{
      await api.post("/api/bids",{gigId:id,message,price});
      alert("Bid submitted");
    }catch(err){
      alert("Action not allowed");
    }
  };

  if(!gig) return <div>Loading...</div>;
  return (
    <div>
      <h2>{gig.title}</h2>
      <p>{gig.description}</p>
      {gig.status==="open" && (
        <form onSubmit={bid}>
          <input placeholder="Message" onChange={e=>setMessage(e.target.value)} />
          <input placeholder="Price" onChange={e=>setPrice(e.target.value)} />
          <button>Submit Bid</button>
        </form>
      )}
    </div>
  );
};
export default GigDetails;