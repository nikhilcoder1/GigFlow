import Gig from "../models/Gig.js";

// ================= CREATE GIG =================
export const createGig = async (req, res) => {
  try {
    const { title, description, budget } = req.body;

    if (!title || !description || !budget) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const gig = await Gig.create({
      title,
      description,
      budget,
      ownerId: req.user.id, 
      status: "open",
    });

    res.status(201).json(gig);
  } catch (error) {
    console.error("Create Gig Error:", error);
    res.status(500).json({ message: "Failed to create gig" });
  }
};

// ================= GET ALL GIGS =================
export const getGigs = async (req, res) => {
  try {
    const { search } = req.query;

    let query = { status: "open" };
    if (search) {
      query.title = { $regex: search, $options: "i" };
    }

    const gigs = await Gig.find(query)
      .populate("ownerId", "name email")
      .sort({ createdAt: -1 });

    res.json(gigs);
  } catch (error) {
    console.error("Fetch Gigs Error:", error);
    res.status(500).json({ message: "Failed to fetch gigs" });
  }
};

// ================= GET SINGLE GIG =================
export const getGigById = async (req, res) => {
  try {
    const gig = await Gig.findById(req.params.id)
      .populate("ownerId", "name email");

    if (!gig) {
      return res.status(404).json({ message: "Gig not found" });
    }

    res.json(gig);
  } catch (error) {
    console.error("Fetch Gig Error:", error);
    res.status(500).json({ message: "Failed to fetch gig" });
  }
};