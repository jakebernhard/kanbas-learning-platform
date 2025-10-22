import mongoose from "mongoose";
const courseSchema = new mongoose.Schema(
  {
    course_id: String,
    name: String,
    number: String,
    credits: Number,
    description: String,
  },
  { collection: "courses" }
);
export default courseSchema;
