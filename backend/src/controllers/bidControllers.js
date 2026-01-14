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

    // Prevent owner from bidding on own gig
    if (gig.ownerId.toString() === req.user._id.toString()) {
      return res.status(403).json({ message: "Cannot bid on your own gig" });
    }

    // Prevent duplicate bids
    const existingBid = await Bid.findOne({
      gigId,
      freelancerId: req.user._id,
    });

    if (existingBid) {
      return res.status(400).json({ message: "You already bid on this gig" });
    }

    const bid = await Bid.create({
      gigId,
      freelancerId: req.user._id,
      message,
      price,
      status: "pending",
    });

    res.status(201).json(bid);
  } catch (error) {
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

    // Owner-only access
    if (gig.ownerId.toString() !== req.user._id.toString()) {
      return res.status(403).json({ message: "Access denied" });
    }

    const bids = await Bid.find({ gigId })
      .populate("freelancerId", "name email")
      .sort({ createdAt: -1 });

    res.json(bids);
  } catch (error) {
    res.status(500).json({ message: "Failed to fetch bids" });
  }
};