import { IoAlertCircleOutline } from "react-icons/io5";
import Question from "./Question";
import { FaPencil } from "react-icons/fa6";
import { AiOutlineQuestionCircle } from "react-icons/ai";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function QuizPreview(realAttempt: any) {
  const [completed, setCompleted] = useState(false);
  const [score, setScore] = useState("");
  const { qid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const allQuizzes = useSelector((state: any) => state.quizzesReducer.quizzes);
  const allQuestions = useSelector(
    (state: any) => state.questionsReducer.questions
  );
  const questions = allQuestions.filter((q: any) => q.quiz_id === qid);
  const quiz = allQuizzes.find((q: any) => q._id === qid);

  const [answers, setAnswers] = useState(questions.map(() => null));

  const points = quiz.reduce((sum: number, curr: any) => {
    return sum + parseInt(curr.points);
  }, 0);

  function handleSubmit() {
    const score = questions.reduce((score: any, question: any, i: any) => {
      if (question.type === "TF") {
        if (question.tf_answer === answers[i]) {
          score += question.points;
        }
      }
      if (question.type === "MC") {
        if (question.mc_answer === answers[i]) {
          score += question.points;
        }
      }
      if (question.type === "FITB") {
        if (answers[i] in question.answers) {
          score += question.points;
        }
      }
    }, 0);
    setScore(`${score} / ${points}`);
    setCompleted(true);
  }

  return (
    <div>
      <h2 className="mb-3">{quiz.title}</h2>
      {currentUser.role === "FACULTY" && (
        <div
          className="text-danger rounded rounded-25 p-3 mb-3 "
          style={{ backgroundColor: "rgba(255, 0, 0, 0.05)" }}
        >
          <IoAlertCircleOutline className="me-2 fs-4" />
          This is a preview of the published version of the quiz
        </div>
      )}
      <div className="mb-1">Started: {new Date().toLocaleDateString()}</div>
      {completed && <div className="my-1">{score}</div>}
      <h3>Quiz Instructions</h3>
      <hr />
      {questions.map((question: any, i: any) => (
        <Question q={question} setQ={null} key={i} facultyView={false} />
      ))}
      <div className="border border-black text-end mx-2">
        <p className="d-inline mx-3">
          Quiz saved at {new Date().toLocaleTimeString()}
        </p>
        <button
          className="btn btn-secondary d-inline my-3 me-3"
          onClick={handleSubmit}
        >
          Submit Quiz
        </button>
      </div>
      <br />
      {currentUser.role === "FACULTY" && (
        <button
          className="btn btn-secondary my-5 w-100"
          style={{ textAlign: "left" }}
        >
          <FaPencil className="me-2" />
          Keep Editing This Quiz
        </button>
      )}
      <div className="mb-3">
        <h4>Questions</h4>
        {questions.map((question: any, i: any) => (
          <div className="text-danger ps-5">
            <AiOutlineQuestionCircle className="text-black fs-5 me-1" />
            Question {i + 1}
          </div>
        ))}
      </div>
    </div>
  );
}
