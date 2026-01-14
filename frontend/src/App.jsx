import { Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Gigs from "./pages/Gigs";
import CreateGig from "./pages/CreateGig";
import GigDetails from "./pages/GigDetails";
import Navbar from "./components/Navbar";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/" element={<Gigs />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/create-gig" element={<CreateGig />} />
        <Route path="/gigs/:id" element={<GigDetails />} />
      </Routes>
    </>
  );
}

export default App;