import { useEffect, useState } from "react";
import api from "../services/api";
import { Link } from "react-router-dom";

const Gigs = () => {
  const [gigs, setGigs] = useState([]);
  const [search, setSearch] = useState("");

  const fetchGigs = async () => {
    const res = await api.get(`/api/gigs?search=${search}`);
    setGigs(res.data);
  };

  useEffect(() => {
    fetchGigs();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h1 className="text-2xl mb-4">Available Gigs</h1>

      <input
        className="border p-2 w-full mb-6"
        placeholder="Search by title..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        onKeyUp={fetchGigs}
      />

      <div className="space-y-4">
        {gigs.map((gig) => (
          <Link
            to={`/gigs/${gig._id}`}
            key={gig._id}
            className="block border p-4 hover:bg-gray-50"
          >
            <h2 className="text-lg font-semibold">{gig.title}</h2>
            <p className="text-gray-600">{gig.description}</p>
            <p className="font-medium">₹ {gig.budget}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Gigs;
