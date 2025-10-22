import { FaEllipsisVertical } from "react-icons/fa6";
import { useLocation, useParams } from "react-router";
import { Link } from "react-router-dom";

export default function QuizHeader({ points }: { points: number }) {
  const pathname = useLocation().pathname;
  const { cid, qid } = useParams();

  return (
    <>
      <div className="d-flex gap-3 align-items-center justify-content-end">
        <h5 className="">Points: {points}</h5>
        <h6 className="">Not published</h6>
        <button id="wd-context-quizzes" className="btn btn-secondary btn-md">
          <FaEllipsisVertical className="fs-5" />
        </button>
      </div>
      <hr />
      <div className="border-bottom mb-4">
        <Link
          to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/editor`}
          className={`btn btn-secondary border-bottom-0 rounded-0 me-3 bg-white ${
            pathname.includes("editor")
              ? "text-danger border-bottom-white"
              : "text-black"
          }`}
        >
          Details
        </Link>
        <Link
          to={`/Kanbas/Courses/${cid}/Quizzes/${qid}/questions`}
          className={`btn btn-secondary border-bottom-0 rounded-0 me-3 bg-white ${
            pathname.includes("questions") ? "text-danger" : "text-black"
          }`}
        >
          Questions
        </Link>
      </div>
    </>
  );
}
