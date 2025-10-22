import { useNavigate, useParams } from "react-router";
import { Link } from "react-router-dom";
import QuizHeader from "./QuizHeader";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { updateQuiz } from "./reducer";
import * as quizClient from "./client";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function QuizEditor() {
  const { cid, qid } = useParams();
  const quizzes = useSelector((state: any) => state.quizzesReducer.quizzes);
  const [quiz, setQuiz] = useState(
    quizzes.filter((q: any) => q._id === qid)[0]
  );
  const allQuestions = useSelector(
    (state: any) => state.questionsReducer.questions
  );
  const points = allQuestions
    .filter((q: any) => q.quiz_id === qid)
    .reduce((sum: number, curr: any) => {
      return sum + parseInt(curr.points);
    }, 0);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const saveQuiz = async (newQuiz: any) => {
    await quizClient.updateQuiz(newQuiz);
    dispatch(updateQuiz(newQuiz));
  };

  const handlePublish = async (newQuiz: any) => {
    await saveQuiz(newQuiz);
    navigate(`/Kanbas/Courses/${cid}/Quizzes`);
  };

  return (
    <div id="wd-quiz-editor" className="mt-3 ps-4">
      <QuizHeader points={points} />
      <input
        id="wd-name"
        value={quiz.title}
        className="form-control w-50 mb-3"
        onChange={(e) => setQuiz({ ...quiz, title: e.target.value })}
      />
      <div className="mb-1">Quiz Instructions:</div>
      <div className="mb-5">
        <ReactQuill
          value={quiz.description}
          onChange={(e) => setQuiz({ ...quiz, description: e })}
          modules={{
            toolbar: [
              [{ header: "1" }, { header: "2" }, { font: [] }],
              [{ list: "ordered" }, { list: "bullet" }],
              ["bold", "italic", "underline"],
              [{ align: [] }],
              ["link"],
              ["image"],
            ],
          }}
        />
      </div>
      <div className="container mb-4">
        <div className="row mb-2">
          <label htmlFor="wd-type" className="col-12 col-md-4 text-md-end ">
            Quiz Type
          </label>
          <select
            id="wd-type"
            value={quiz.type}
            className="form-control col-12 col-md-4 w-25"
            onChange={(e) => setQuiz({ ...quiz, type: e.target.value })}
          >
            <option value="Graded Quiz">Graded Quiz</option>
            <option value="Practice Quiz">Practice Quiz</option>
            <option value="Graded Survey">Graded Survey</option>
            <option value="Ungraded Survey">Ungraded Survey</option>
          </select>
        </div>
        <div className="row mb-2">
          <label htmlFor="wd-group" className="col-12 col-md-4 text-md-end ">
            Assignment Group
          </label>
          <select
            id="wd-group"
            value={quiz.group}
            onChange={(e) => setQuiz({ ...quiz, group: e.target.value })}
            className="form-control col-12 col-md-4 w-25"
          >
            <option value="Quizzes">Quizzes</option>
            <option value="Exams">Exams</option>
            <option value="Assignments">Assignments</option>
            <option value="Project">Project</option>
          </select>
        </div>
        <div className="row mb-2">
          <div className="col-12 col-md-4"></div>
          <div className="col-12 col-md-4 mt-2">
            <strong>Options</strong>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-12 col-md-4 text-md-end "></div>
          <div className="col-12 col-md-6">
            <input
              type="checkbox"
              name="time-limit"
              id="wd-time-limit"
              onClick={() => setQuiz({ ...quiz, timed: !quiz.timed })}
              checked={quiz.timed}
            />
            <label htmlFor="wd-time-limit" className="ps-3 mb-3 me-5">
              Time Limit
            </label>
            <input
              type="number"
              name="minutes"
              id="wd-minutes"
              className="w-25 form-control d-inline"
              value={quiz.time_limit}
              onChange={(e) => setQuiz({ ...quiz, time_limit: e.target.value })}
            />
            <label htmlFor="wd-minutes" className="ps-3 mb-3">
              minutes
            </label>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-12 col-md-4 text-md-end "></div>
          <div className="col-12 col-md-6">
            <input
              type="checkbox"
              name="access-code"
              id="wd-access-codet"
              onClick={() => setQuiz({ ...quiz, code: !quiz.code })}
              checked={quiz.code}
            />
            <label htmlFor="wd-access-code" className="ps-3 mb-3 me-4">
              Access Code
            </label>
            <input
              name="code"
              id="wd-code"
              className="w-25 form-control d-inline"
              value={quiz.access_code}
              onChange={(e) =>
                setQuiz({ ...quiz, access_code: e.target.value })
              }
            />
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-12 col-md-4 text-md-end "></div>
          <div className="col-12 col-md-6">
            <input
              type="checkbox"
              name="mult-attempts"
              id="wd-mult-attemptst"
              checked={quiz.multiple_attempts}
              onClick={() =>
                setQuiz({ ...quiz, multiple_attempts: !quiz.multiple_attempts })
              }
            />
            <label htmlFor="wd-mult-attempts" className="ps-3 mb-3 me-4">
              Multiple Attempts
            </label>
            {quiz.multiple_attempts && (
              <input
                type="number"
                name="attempts"
                id="wd-attempts"
                className="w-25 form-control d-inline"
                value={quiz.num_attempts}
                onChange={(e) =>
                  setQuiz({ ...quiz, num_attempts: e.target.value })
                }
              />
            )}
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-12 col-md-4 text-md-end "></div>
          <div className="col-12 col-md-4 mt-2 form-control w-50 pt-3 pb-0">
            <input
              type="checkbox"
              name="shuffle-answers"
              id="wd-shuffle-answers"
              checked={quiz.shuffle_answers}
              onClick={() =>
                setQuiz({ ...quiz, shuffle_answers: !quiz.shuffle_answers })
              }
            />
            <label htmlFor="wd-shuffle-answers" className="ps-3 mb-3">
              Shuffle Answers
            </label>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-12 col-md-4 text-md-end "></div>
          <div className="col-12 col-md-4 mt-2 form-control w-50 pt-3 pb-0">
            <input
              type="checkbox"
              name="show-answers"
              id="wd-show-answers"
              checked={quiz.show_correct}
              onClick={() =>
                setQuiz({ ...quiz, show_correct: !quiz.show_correct })
              }
            />
            <label htmlFor="wd-show-answers" className="ps-3 mb-3">
              Show Correct Answers
            </label>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-12 col-md-4 text-md-end "></div>
          <div className="col-12 col-md-4 mt-2 form-control w-50 pt-3 pb-0">
            <input
              type="checkbox"
              name="one-question"
              id="wd-one-question"
              checked={quiz.one_q_at_time}
              onClick={() =>
                setQuiz({ ...quiz, one_q_at_time: !quiz.one_q_at_time })
              }
            />
            <label htmlFor="wd-one-question" className="ps-3 mb-3">
              One Question at a Time
            </label>
          </div>
        </div>
        <div className="row mb-2">
          <div className="col-12 col-md-4 text-md-end "></div>
          <div className="col-12 col-md-4 mt-2 form-control w-50 pt-3 pb-0">
            <input
              type="checkbox"
              name="webcam"
              id="wd-webcam"
              checked={quiz.webcam}
              onClick={() => setQuiz({ ...quiz, webcam: !quiz.webcam })}
            />
            <label htmlFor="wd-webcam" className="ps-3 mb-3">
              Webcam Required
            </label>
          </div>
        </div>
        <div className="row mb-5">
          <div className="col-12 col-md-4 text-md-end "></div>
          <div className="col-12 col-md-4 mt-2 form-control w-50 pt-3 pb-0">
            <input
              type="checkbox"
              name="lock-after-answering"
              id="wd-lock-after-answering"
              checked={quiz.lock_after_answering}
              onClick={() =>
                setQuiz({
                  ...quiz,
                  lock_after_answering: !quiz.lock_after_answering,
                })
              }
            />
            <label htmlFor="wd-webcam" className="ps-3 mb-3">
              Lock Questions After Answering
            </label>
          </div>
        </div>
        <div className="row">
          <label className="col-12 col-md-4 text-md-end">Assign</label>
          <div className="col-12 col-md-4 w-50 border border-gray py-4 px-5">
            <label htmlFor="wd-assign-to" className="fw-bold text-gray mb-1">
              Assign to
            </label>
            <br />
            <input
              id="wd-assign-to"
              defaultValue="Everyone"
              className="form-control mb-3"
            />
            <label htmlFor="wd-due-date" className="fw-bold text-gray mb-1">
              Due
            </label>
            <br />
            <input
              id="wd-due-date"
              type="date"
              value={quiz.due_date}
              onChange={(e) => setQuiz({ ...quiz, due_date: e.target.value })}
              className="form-control mb-3"
            />
            <div className="row">
              <label
                htmlFor="wd-available-from"
                className="col-6 fw-bold text-gray"
              >
                Available from
              </label>
              <label
                htmlFor="wd-available-until"
                className="col-6 fw-bold text-gray"
              >
                Until
              </label>
              <br />
            </div>
            <div className="row">
              <input
                id="wd-available-from"
                type="date"
                value={quiz.available_date}
                onChange={(e) =>
                  setQuiz({ ...quiz, available_date: e.target.value })
                }
                className="col-6 form-control w-50"
              />
              <input
                id="wd-available-until"
                type="date"
                value={quiz.until_date}
                onChange={(e) =>
                  setQuiz({ ...quiz, until_date: e.target.value })
                }
                className="col-6 form-control w-50"
              />
            </div>
          </div>
        </div>
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
          onClick={() => saveQuiz(quiz)}
          to={`/Kanbas/Courses/${cid}/Quizzes/${qid}`}
          className="btn btn-danger ms-2"
        >
          Save
        </Link>
        <button
          onClick={() => handlePublish({ ...quiz, published: true })}
          className="btn btn-danger ms-2"
        >
          Save and Publish
        </button>
      </div>
    </div>
  );
}
