import mongoose from "mongoose";
import Bid from "../models/Bid.js";
import Gig from "../models/Gig.js";

export const hireBid = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const bid = await Bid.findById(req.params.bidId).session(session);
    if (!bid) throw "Bid not found";

    const gig = await Gig.findById(bid.gigId).session(session);
    if (!gig) throw "Gig not found";

    // Owner-only hiring
    if (gig.ownerId.toString() !== req.user._id.toString()) {
      throw "Unauthorized";
    }

    if (gig.status === "assigned") {
      throw "Gig already assigned";
    }

    gig.status = "assigned";
    await gig.save({ session });

    bid.status = "hired";
    await bid.save({ session });

    await Bid.updateMany(
      { gigId: gig._id, _id: { $ne: bid._id } },
      { status: "rejected" },
      { session }
    );

    await session.commitTransaction();
    res.json({ message: "Freelancer hired successfully" });
  } catch (error) {
    await session.abortTransaction();
    res.status(400).json({ message: error });
  } finally {
    session.endSession();
  }
};