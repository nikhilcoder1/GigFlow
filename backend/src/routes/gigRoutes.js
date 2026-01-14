import express from "express";
import { createGig, getGigs } from "../controllers/gigController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

// Browse gigs (public or logged-in)
router.get("/", getGigs);

// Create gig (logged-in only)
router.post("/", protect, createGig);

export default router;
