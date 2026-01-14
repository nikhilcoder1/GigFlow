import Bid from "../models/Bid.js";
import Gig from "../models/Gig.js";

// ================= SUBMIT BID =================
export const createBid = async (req, res) => {
  try {
    const { gigId, message, price } = req.body;

    if (!gigId || !message || !price) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const gig = await Gig.findById(gigId);
    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    if (gig.status !== "open") {
      return res.status(400).json({ message: "Bidding closed for this gig" });
    }

    
    if (gig.ownerId.toString() === req.user.id) {
      return res.status(403).json({ message: "Cannot bid on your own gig" });
    }

    
    const existingBid = await Bid.findOne({
      gigId,
      freelancerId: req.user.id,
    });

    if (existingBid) {
      return res.status(400).json({ message: "You already bid on this gig" });
    }

    const bid = await Bid.create({
      gigId,
      freelancerId: req.user.id,
      message,
      price,
      status: "pending",
    });

    res.status(201).json(bid);
  } catch (error) {
    console.error("Create Bid Error:", error);
    res.status(500).json({ message: "Failed to submit bid" });
  }
};

// ================= GET BIDS FOR A GIG (OWNER ONLY) =================
export const getBidsForGig = async (req, res) => {
  try {
    const { gigId } = req.params;

    const gig = await Gig.findById(gigId);
    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    
    if (gig.ownerId.toString() !== req.user.id) {
      return res.status(403).json({ message: "Access denied" });
    }

    const bids = await Bid.find({ gigId })
      .populate("freelancerId", "name email")
      .sort({ createdAt: -1 });

    res.json(bids);
  } catch (error) {
    console.error("Fetch Bids Error:", error);
    res.status(500).json({ message: "Failed to fetch bids" });
  }
};