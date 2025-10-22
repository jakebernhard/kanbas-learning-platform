import mongoose from "mongoose";
const assignmentSchema = new mongoose.Schema(
  {
    title: String,
    course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel" },
    description: String,
    points: Number,
    available_date: String,
    due_date: String,
    until_date: String,
  },
  { collection: "assignments" }
);
export default assignmentSchema;
