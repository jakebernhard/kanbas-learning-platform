import { BiPlus } from "react-icons/bi";
import QuizHeader from "./QuizHeader";
import Question from "./Question";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router";
import { updateQuestions } from "./questionReducer";
import { Link } from "react-router-dom";
import * as quizzesClient from "./client";
import * as questionsClient from "./questionClient";

const mockQuestion = {
  state_id: null,
  title: "Question 1",
  quiz_id: null,
  description: "This is a description for the question",
  type: "MC",
  points: 0,
  options: ["Choice 1", "Choice 2", "Choice 3"],
  mc_answer: null,
  tf_answer: null,
  fitb_answers: ["Answer 1", "Answer 2", "Answer 3"],
};

export default function QuizQuestion() {
  const { cid, qid } = useParams();
  const allQuestions = useSelector(
    (state: any) => state.questionsReducer.questions
  );
  const [questions, setQuestions] = useState(
    allQuestions.filter((q: any) => q.quiz_id === qid)
  );

  const fetchQuestions = async () => {
    const currQuestions = await quizzesClient.findQuestionsForQuiz(
      qid as string
    );
    console.log(currQuestions);
    setQuestions(currQuestions);
  };

  const points = allQuestions
    .filter((q: any) => q.quiz_id === qid)
    .reduce((sum: number, curr: any) => {
      return sum + parseInt(curr.points);
    }, 0);

  const newQuestions = [
    ...questions,
    ...allQuestions.filter((q: any) => q.quiz_id !== qid),
  ];

  const dispatch = useDispatch();

  function addQuestion() {
    setQuestions([
      ...questions,
      {
        ...mockQuestion,
        quiz_id: qid,
        state_id: new Date().getTime().toString(),
      },
    ]);
  }

  function updateQuestion(question: any) {
    setQuestions(
      questions.map((q: any) =>
        q.state_id === question.state_id ? question : q
      )
    );
  }

  async function saveQuestions() {
    const resultingQuestions = await questionsClient.updateQuestions(
      newQuestions
    );
    dispatch(updateQuestions(resultingQuestions));
  }

  useEffect(() => {
    fetchQuestions();
  }, []);

  return (
    <div id="wd-quiz-question" className="mt-3 ps-4">
      <QuizHeader points={points} />
      {questions.map((question: any, i: any) => (
        <Question
          q={question}
          setQ={updateQuestion}
          key={i}
          facultyView={true}
        />
      ))}
      <div className="text-center">
        <button className="btn btn-secondary btn-md" onClick={addQuestion}>
          <BiPlus /> New Question
        </button>
      </div>
      <hr />
      <div className="text-center">
        <Link
          to={`/Kanbas/Courses/${cid}/Quizzes`}
          className="btn btn-secondary"
        >
          Cancel
        </Link>
        <Link
          to={`/Kanbas/Courses/${cid}/Quizzes`}
          className="btn btn-danger ms-2"
          onClick={saveQuestions}
        >
          Save
        </Link>
      </div>
    </div>
  );
}
