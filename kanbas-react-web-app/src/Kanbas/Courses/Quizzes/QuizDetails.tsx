import { HiOutlinePencil } from "react-icons/hi";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";

export default function QuizDetails() {
  const { qid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const allQuizzes = useSelector((state: any) => state.quizzesReducer.quizzes);
  const allQuestions = useSelector(
    (state: any) => state.questionsReducer.questions
  );
  const points = allQuestions
    .filter((q: any) => q.quiz_id === qid)
    .reduce((sum: number, curr: any) => {
      return sum + parseInt(curr.points);
    }, 0);
  const quiz = allQuizzes.filter((q: any) => q._id === qid)[0];

  return (
    <div className="wd-quiz-details">
      <div className="wd-quiz-buttons text-center mt-4 mb-4">
        {currentUser.role === "FACULTY" && (
          <>
            <Link className="btn btn-secondary me-2" to="./preview">
              Preview
            </Link>
            <Link className="btn btn-secondary" to="./editor">
              <HiOutlinePencil className="me-1" />
              Edit
            </Link>
          </>
        )}
        {currentUser.role === "STUDENT" && (
          <Link to="./attempt" className="btn btn-danger py-2 px-4 fs-5">
            Start
          </Link>
        )}
      </div>
      <hr />
      <h2>{quiz.title}</h2>
      {currentUser.role === "FACULTY" && (
        <div className="container mb-5">
          <div className="row mb-1">
            <div className="col-sm text-end">
              <strong>Quiz Type</strong>
            </div>
            <div className="col-sm">{quiz.type}</div>
            <div className="col-sm"></div>
          </div>
          <div className="row mb-1">
            <div className="col-sm text-end">
              <strong>Points</strong>
            </div>
            <div className="col-sm">{points}</div>
            <div className="col-sm"></div>
          </div>
          <div className="row mb-1">
            <div className="col-sm text-end">
              <strong>Assignment Group</strong>
            </div>
            <div className="col-sm">{quiz.group}</div>
            <div className="col-sm"></div>
          </div>
          <div className="row mb-1">
            <div className="col-sm text-end">
              <strong>Shuffle Answers</strong>
            </div>
            <div className="col-sm">{quiz.shuffle_answers ? "Yes" : "No"}</div>
            <div className="col-sm"></div>
          </div>
          <div className="row mb-1">
            <div className="col-sm text-end">
              <strong>Time Limit</strong>
            </div>
            <div className="col-sm">{quiz.time_limit}</div>
            <div className="col-sm"></div>
          </div>
          <div className="row mb-1">
            <div className="col-sm text-end">
              <strong>Multiple Attempts</strong>
            </div>
            <div className="col-sm">
              {quiz.multiple_attempts ? "Yes" : "No"}
            </div>
            <div className="col-sm"></div>
          </div>
          <div className="row mb-1">
            <div className="col-sm text-end">
              <strong>How Many Attempts</strong>
            </div>
            <div className="col-sm">
              {quiz.multiple_attempts ? quiz.num_attempts : 1}
            </div>
            <div className="col-sm"></div>
          </div>
          <div className="row mb-1">
            <div className="col-sm text-end">
              <strong>Show Correct Answers</strong>
            </div>
            <div className="col-sm">{quiz.show_correct ? "Yes" : "No"}</div>
            <div className="col-sm"></div>
          </div>
          <div className="row mb-1">
            <div className="col-sm text-end">
              <strong>Access Code</strong>
            </div>
            <div className="col-sm">
              {quiz.code ? quiz.access_code : "None"}
            </div>
            <div className="col-sm"></div>
          </div>
          <div className="row mb-1">
            <div className="col-sm text-end">
              <strong>One Question at a Time</strong>
            </div>
            <div className="col-sm">{quiz.one_q_at_time ? "Yes" : "No"}</div>
            <div className="col-sm"></div>
          </div>
          <div className="row mb-1">
            <div className="col-sm text-end">
              <strong>Webcam Required</strong>
            </div>
            <div className="col-sm">{quiz.webcam ? "Yes" : "No"}</div>
            <div className="col-sm"></div>
          </div>
          <div className="row mb-1">
            <div className="col-sm text-end">
              <strong>Lock Question After Answering</strong>
            </div>
            <div className="col-sm">
              {quiz.lock_after_answering ? "Yes" : "No"}
            </div>
            <div className="col-sm"></div>
          </div>
        </div>
      )}
      <div className="container">
        <div className="row mb-1 pb-1 border-bottom ">
          <div className="col-sm">
            <strong>Due</strong>
          </div>
          <div className="col-sm">
            <strong>For</strong>
          </div>
          <div className="col-sm">
            <strong>Available From</strong>
          </div>
          <div className="col-sm">
            <strong>Until</strong>
          </div>
        </div>
        <div className="row py-3 border-bottom ">
          <div className="col-sm">
            {new Date(quiz.due_date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
            })}
          </div>
          <div className="col-sm">Everyone</div>
          <div className="col-sm">
            {new Date(quiz.available_date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
            })}
          </div>
          <div className="col-sm">
            {new Date(quiz.until_date).toLocaleDateString("en-US", {
              month: "long",
              day: "numeric",
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
