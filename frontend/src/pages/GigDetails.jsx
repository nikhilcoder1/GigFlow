import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import api from "../services/api";
import { useAuth } from "../context/AuthContext";

const GigDetails = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const [gig, setGig] = useState(null);
  const [bids, setBids] = useState([]);
  const [bidForm, setBidForm] = useState({
    message: "",
    price: ""
  });

  const isOwner = user && gig && user._id === gig.ownerId;

  // Fetch gig details
  const fetchGig = async () => {
    const res = await api.get(`/api/gigs/${id}`);
    setGig(res.data);
  };

  // Fetch bids (ONLY owner)
  const fetchBids = async () => {
    if (isOwner) {
      const res = await api.get(`/api/bids/${id}`);
      setBids(res.data);
    }
  };

  useEffect(() => {
    fetchGig();
  }, []);

  useEffect(() => {
    fetchBids();
  }, [gig]);

  const submitBid = async (e) => {
    e.preventDefault();
    await api.post("/api/bids", {
      gigId: id,
      message: bidForm.message,
      price: bidForm.price
    });
    alert("Bid submitted");
    setBidForm({ message: "", price: "" });
  };

  if (!gig) return <div className="p-6">Loading...</div>;

  const hireBid = async (bidId) => {
    try {
        await api.patch(`/api/bids/${bidId}/hire`);
        await fetchGig();   // refresh gig status
        await fetchBids();  // refresh bids
    } catch {
        alert("Hiring failed");
    }
};


  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      {/* Gig Info */}
      <div className="border p-4">
        <h1 className="text-2xl font-semibold">{gig.title}</h1>
        <p className="text-gray-600">{gig.description}</p>
        <p className="font-medium mt-2">Budget: ₹{gig.budget}</p>
        <p className="mt-1 text-sm">Status: {gig.status}</p>
      </div>

      {/* Bid Form (Non-owner + Open gig) */}
      {user && !isOwner && gig.status === "open" && (
        <form onSubmit={submitBid} className="border p-4 space-y-3">
          <h2 className="text-xl">Place a Bid</h2>

          <textarea
            className="border p-2 w-full"
            placeholder="Proposal message"
            required
            value={bidForm.message}
            onChange={(e) =>
              setBidForm({ ...bidForm, message: e.target.value })
            }
          />

          <input
            type="number"
            className="border p-2 w-full"
            placeholder="Your price"
            required
            value={bidForm.price}
            onChange={(e) =>
              setBidForm({ ...bidForm, price: e.target.value })
            }
          />

          <button className="bg-black text-white px-4 py-2">
            Submit Bid
          </button>
        </form>
      )}

      {/* Bid List (Owner only) */}
      {isOwner && (
        <div className="border p-4">
          <h2 className="text-xl mb-3">Bids</h2>

          {bids.length === 0 && <p>No bids yet</p>}

          <div className="space-y-3">
                            {bids.map((bid) => (
                <div
                    key={bid._id}
                    className={`border p-3 ${
                    bid.status === "hired"
                        ? "border-green-500"
                        : bid.status === "rejected"
                        ? "border-red-400 opacity-60"
                        : ""
                    }`}
                >
                    <p>{bid.message}</p>
                    <p className="font-medium">₹{bid.price}</p>
                    <p className="mb-2">Status: {bid.status}</p>

                    {gig.status === "open" && bid.status === "pending" && (
                    <button
                        onClick={() => hireBid(bid._id)}
                        className="bg-black text-white px-3 py-1"
                    >
                        Hire
                    </button>
                    )}

                    {bid.status === "hired" && (
                    <span className="text-green-600 font-semibold">
                        ✅ Hired
                    </span>
                    )}

                    {bid.status === "rejected" && (
                    <span className="text-red-500">
                        ❌ Rejected
                    </span>
                    )}
                </div>
                ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default GigDetails;
