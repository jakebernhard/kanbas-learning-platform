import { BsGripVertical } from "react-icons/bs";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { MdOutlineAssignment } from "react-icons/md";
import { FaCaretDown } from "react-icons/fa";
import { IoEllipsisVertical } from "react-icons/io5";
import { GoPlus } from "react-icons/go";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AssignmentControlButtons from "./AssignmentControls";
import { setAssignments } from "./reducer";
import * as coursesClient from "../client";
import { useEffect } from "react";

export default function Assignments() {
  const { cid } = useParams();
  const { assignments } = useSelector((state: any) => state.assignmentsReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();
  const fetchAssignments = async () => {
    const assignments = await coursesClient.findAssignmentsForCourse(
      cid as string
    );
    dispatch(setAssignments(assignments));
  };
  useEffect(() => {
    fetchAssignments();
  }, []);

  return (
    <div id="wd-assignments">
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
              id="wd-add-assignment-group"
              className="btn btn-secondary btn-lg mt-0 me-1 float-end"
            >
              <GoPlus className="fs-3 me-1" />
              Group
            </button>
            <Link
              id="wd-add-assignment"
              className="btn btn-danger btn-lg me-1 float-end"
              to="./NewAssignment"
            >
              <GoPlus className="fs-3 me-1" />
              Assignment
            </Link>
          </div>
        )}
      </div>
      <ul className="mt-5 list-group rounded-0">
        <li className="list-group-item p-0 fs-5">
          <p id="wd-assignments-title" className="p-3 ps-2 bg-secondary mb-0">
            <BsGripVertical className="me-2 fs-3" />
            <FaCaretDown className="me-2 fs-3" />
            ASSIGNMENTS
            <IoEllipsisVertical className="fs-4 float-end" />
            {currentUser.role === "FACULTY" && (
              <button className="border-0 bg-secondary float-end">
                <GoPlus className="fs-3 me-2" />
              </button>
            )}
            <span className="border border-black p-1 rounded-pill span float-end">
              40% of Total
            </span>
          </p>
        </li>
        <ul id="wd-assignment-list" className="list-group rounded-0">
          {assignments.map((assignment: any) => (
            <li
              className="wd-assignment-list-item list-group-item p-3 ps-1 d-flex align-items-center justify-content-between"
              key={assignment._id}
            >
              <div className="d-flex align-items-center justify-content-between">
                <BsGripVertical className="me-2 fs-3" />
                <MdOutlineAssignment className="fs-3 mb-1 me-3 text-success" />
                <div>
                  <a
                    className="wd-assignment-link text-decoration-none fs-5 text-black"
                    href={
                      currentUser.role === "FACULTY"
                        ? `#/Kanbas/Courses/${cid}/Assignments/${assignment._id}`
                        : `#/Kanbas/Courses/${cid}/Assignments/`
                    }
                  >
                    {assignment.title}
                  </a>
                  <br />
                  <span className="text-danger">Multiple Modules </span> |{" "}
                  <span>
                    <strong>Not available until </strong>
                    {new Date(assignment.available_date).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      }
                    )}{" "}
                  </span>
                  |{" "}
                  <span>
                    <strong>Due </strong>
                    {new Date(assignment.due_date).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })}{" "}
                  </span>{" "}
                  | <span>{assignment.points}</span>
                </div>
              </div>
              <AssignmentControlButtons assignment_id={assignment._id} />
            </li>
          ))}
        </ul>
      </ul>
    </div>
  );
}
