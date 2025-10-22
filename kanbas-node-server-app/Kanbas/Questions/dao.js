import model from "./model.js";

export function findQuestionsForQuiz(quizId) {
  return model.find({ quiz_id: quizId });
}

export async function setQuestions(questions) {
  await model.deleteMany({});
  const questionsWithoutId = await questions.map(({ _id, ...rest }) => rest);
  return model.insertMany(questionsWithoutId);
}
