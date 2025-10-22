import { createSlice } from "@reduxjs/toolkit";
import { questions } from "../../Database/index";

const initialState = {
  questions,
};

const questionsSlice = createSlice({
  name: "questions",
  initialState,
  reducers: {
    updateQuestions: (state, action) => {
      state.questions = action.payload;
    },
  },
});
export const { updateQuestions } = questionsSlice.actions;
export default questionsSlice.reducer;
