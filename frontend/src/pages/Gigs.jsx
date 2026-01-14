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
    <div style={{ padding: 24 }}>
      <h1>Available Gigs</h1>
      <input placeholder="Search" value={search} onChange={(e) => setSearch(e.target.value)} onKeyUp={fetchGigs} />
      {gigs.map(g => (
        <Link key={g._id} to={`/gigs/${g._id}`} style={{ display: "block", border: "1px solid #ccc", marginTop: 12, padding: 12 }}>
          <h3>{g.title}</h3>
          <p>{g.description}</p>
        </Link>
      ))}
    </div>
  );
};

export default Gigs;