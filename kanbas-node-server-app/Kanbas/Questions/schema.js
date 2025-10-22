import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    quiz_id: { type: mongoose.Schema.Types.ObjectId, ref: "QuizModel" },
    state_id: String,
    title: String,
    description: String,
    type: String,
    points: Number,
    options: [String],
    mc_answer: Number,
    tf_answer: Boolean,
    fitb_answers: [String],
  },
  { collection: "questions" }
);

export default schema;
