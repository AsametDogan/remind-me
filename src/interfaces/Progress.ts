import mongoose from "mongoose";

interface Progress {
  assignment: mongoose.Types.ObjectId;
  point: number;
  progressDate: Date;
}

export default Progress;
