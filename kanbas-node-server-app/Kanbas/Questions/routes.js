import * as questionsDao from "./dao.js";

export default function QuestionsRoutes(app) {
  app.put("/api/questions", async (req, res) => {
    const newQuestions = req.body;
    const questions = await questionsDao.setQuestions(newQuestions);
    res.json(questions);
  });
}
