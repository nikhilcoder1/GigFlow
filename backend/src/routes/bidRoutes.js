import express from "express";
import { createBid, getBidsForGig } from "../controllers/bidController.js";
import { protect } from "../middleware/authMiddleware.js";
import { hireBid } from "../controllers/hiringController.js";

const router = express.Router();

// Submit a bid
router.post("/", protect, createBid);

// Get bids for a gig (owner only)
router.get("/:gigId", protect, getBidsForGig);

// Hire a bid
router.patch("/:bidId/hire", protect, hireBid);

export default router;