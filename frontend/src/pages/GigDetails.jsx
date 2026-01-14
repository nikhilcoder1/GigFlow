import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";

const GigDetails = () => {
  const { id } = useParams();
  const [gig, setGig] = useState(null);
  const [bidForm, setBidForm] = useState({ message: "", price: "" });

  useEffect(() => {
    api.get(`/api/gigs/${id}`).then(res => setGig(res.data));
  }, [id]);

  const submitBid = async (e) => {
    e.preventDefault();
    try {
      await api.post("/api/bids", { gigId: id, ...bidForm });
      alert("Bid submitted");
    } catch (err) {
      alert("Action not allowed");
    }
  };

  if (!gig) return <div>Loading...</div>;

  return (
    <div style={{ padding: 24 }}>
      <h2>{gig.title}</h2>
      <p>{gig.description}</p>
      <form onSubmit={submitBid}>
        <textarea placeholder="Message" onChange={(e) => setBidForm({ ...bidForm, message: e.target.value })} />
        <br />
        <input type="number" placeholder="Price" onChange={(e) => setBidForm({ ...bidForm, price: e.target.value })} />
        <br />
        <button>Submit Bid</button>
      </form>
    </div>
  );
};

export default GigDetails;