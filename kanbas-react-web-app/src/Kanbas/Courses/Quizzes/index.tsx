import { BsGripVertical } from "react-icons/bs";
import { FaEllipsisVertical, FaMagnifyingGlass } from "react-icons/fa6";
import { FaCaretDown } from "react-icons/fa";
import { GoPlus, GoRocket } from "react-icons/go";
import { useNavigate, useParams } from "react-router";
import { useDispatch, useSelector } from "react-redux";
import QuizControlButtons from "./QuizControlButtons";
import { addQuiz, setQuizzes, updateQuiz } from "./reducer";
import * as coursesClient from "../client";
import * as quizClient from "./client";
import { useEffect } from "react";

export default function Quizzes() {
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const course_quizzes = useSelector(
    (state: any) => state.quizzesReducer.quizzes
  );
  const dispatch = useDispatch();

  const fetchQuizzes = async () => {
    const quizzes = await coursesClient.findQuizzesForCourse(cid as string);
    dispatch(setQuizzes(quizzes));
  };

  const newQuiz = {
    _id: new Date().getTime().toString(),
    course: cid,
    title: "New Quiz",
    published: false,
    description: "Write description here",
    type: "Graded Quiz",
    group: "QUIZZES",
    shuffle_answers: false,
    timed: true,
    time_limit: 20,
    multiple_attempts: false,
    view_responses: true,
    num_attempts: 1,
    show_correct: true,
    code: true,
    access_code: "",
    one_q_at_time: false,
    webcam: true,
    lock_after_answering: true,
    availability: "Closed",
    due_date: "January 1st",
    until_date: "January 1st",
    available_date: "January 1st",
    points: 100,
    questions: 10,
    score: 100,
  };

  const navigate = useNavigate();

  const createQuizForCourse = async () => {
    if (!cid) return;
    const assignment = await coursesClient.createQuizForCourse(cid, newQuiz);
    dispatch(addQuiz(assignment));
    navigate(`./${assignment._id}`);
  };

  useEffect(() => {
    fetchQuizzes();
  }, []);

  const quizzes =
    currentUser.role === "FACULTY"
      ? course_quizzes
      : course_quizzes.filter((q: any) => q.course === cid && q.published);

  const allQuestions = useSelector(
    (state: any) => state.questionsReducer.questions
  );

  return (
    <div id="wd-quizzes">
      <div className="d-flex justify-content-between align-items-center">
        <div className="input-group w-25 inline">
          <button className="input-group-text bg-white border-end-0">
            <FaMagnifyingGlass className="fs-5 mb-1 text-secondary" />
          </button>
          <input
            id="wd-search-assignment"
            className="form-control p-2"
            placeholder="Search..."
          />
        </div>

        {currentUser.role === "FACULTY" && (
          <div>
            <button
              id="wd-context-quizzes"
              className="btn btn-secondary btn-lg mt-0 me-1 float-end"
            >
              <FaEllipsisVertical className="fs-3" />
            </button>
            <button
              id="wd-add-quiz"
              className="btn btn-danger btn-lg me-1 float-end"
              onClick={createQuizForCourse}
            >
              <GoPlus className="fs-3 me-1" />
              Quiz
            </button>
          </div>
        )}
      </div>
      <ul className="mt-5 list-group rounded-0">
        <li className="list-group-item p-0 fs-5">
          <p id="quizzes-title" className="p-3 ps-2 bg-secondary mb-0">
            <BsGripVertical className="me-2 fs-3" />
            <FaCaretDown className="me-2 fs-3" />
            Assignment Quizzes
          </p>
        </li>
        <ul id="wd-quizzes-list" className="list-group rounded-0">
          {quizzes.map((quiz: any) => (
            <li
              className="wd-quizzes-list-item list-group-item p-3 ps-1 d-flex align-items-center justify-content-between"
              key={quiz._id}
            >
              <div className="d-flex align-items-center justify-content-between">
                <GoRocket className="fs-3 mb-1 ms-3 me-3 text-success" />
                <div>
                  <a
                    className="wd-quiz-link text-decoration-none fs-5 text-black"
                    href={`#/Kanbas/Courses/${cid}/Quizzes/${quiz._id}`}
                  >
                    {quiz.title}
                  </a>
                  <br />
                  <span className="me-1">
                    <strong>
                      {new Date() < new Date(quiz.available_date)
                        ? `Available on ${new Date(
                            quiz.available_date
                          ).toLocaleDateString("en-US", {
                            month: "long",
                            day: "numeric",
                          })}`
                        : new Date() > new Date(quiz.until_date)
                        ? "Closed"
                        : "Available"}
                    </strong>
                  </span>{" "}
                  |{" "}
                  <span className="ms-1 me-1">
                    <strong>Due </strong>
                    {new Date(quiz.due_date).toLocaleDateString("en-US", {
                      month: "long",
                      day: "numeric",
                    })}
                  </span>{" "}
                  |{" "}
                  <span className="ms-1 me-1">{`${allQuestions
                    .filter((q: any) => q.quiz_id === quiz._id)
                    .reduce((sum: number, curr: any) => {
                      return sum + parseInt(curr.points);
                    }, 0)} pts`}</span>{" "}
                  |{" "}
                  <span className="ms-1 me-1">{`${
                    allQuestions.filter((q: any) => q.quiz_id === quiz._id)
                      .length
                  } questions`}</span>
                </div>
              </div>
              {currentUser.role === "FACULTY" && (
                <QuizControlButtons quiz={quiz} />
              )}
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
}
