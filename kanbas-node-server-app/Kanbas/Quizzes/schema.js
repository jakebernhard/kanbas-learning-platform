import mongoose from "mongoose";
const schema = new mongoose.Schema(
  {
    course: { type: mongoose.Schema.Types.ObjectId, ref: "CourseModel" },
    title: String,
    published: Boolean,
    description: String,
    type: String,
    group: String,
    shuffle_answers: Boolean,
    timed: Boolean,
    time_limit: Number,
    multiple_attempts: Boolean,
    view_responses: Boolean,
    num_attempts: Number,
    show_correct: Boolean,
    code: Boolean,
    access_code: String,
    one_q_at_time: Boolean,
    webcam: Boolean,
    lock_after_answering: Boolean,
    availability: String,
    due_date: String,
    until_date: String,
    available_date: String,
  },
  { collection: "quizzes" }
);

export default schema;
