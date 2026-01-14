import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";

const Gigs = () => {
  const [gigs,setGigs]=useState([]);
  const fetch = async () => {
    const res = await api.get("/api/gigs");
    setGigs(res.data);
  };
  useEffect(()=>{fetch();},[]);
  return (
    <div>
      <h2>Gigs</h2>
      {gigs.map(g=>(
        <Link key={g._id} to={`/gigs/${g._id}`}>
          <div>{g.title}</div>
        </Link>
      ))}
    </div>
  );
};
export default Gigs;