import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useState } from "react";
import { addAssignment, updateAssignment } from "./reducer";
import * as coursesClient from "../client";
import * as assignmentsClient from "../Assignments/client";

export default function AssignmentEditor() {
  const { cid, aid } = useParams();
  const assignments = useSelector((state: any) => state.assignmentsReducer);

  const dispatch = useDispatch();
  const newAssignment = {
    _id: new Date().toISOString(),
    title: "",
    course: cid,
    description: "",
    points: 100,
    available_date: "",
    due_date: "",
    until_date: "",
  };

  const currentAssignment = assignments.assignments.find(
    (assignment: any) => assignment._id === aid
  );

  const assignment = currentAssignment ? currentAssignment : newAssignment;

  const [formAssignment, setFormAssignment] = useState(assignment);

  const createAssignmentForCourse = async () => {
    if (!cid) return;
    const newAsmnt = formAssignment;
    const assignment = await coursesClient.createAssignmentForCourse(
      cid,
      newAsmnt
    );
    dispatch(addAssignment(assignment));
  };

  const saveAssignment = async (assignment: any) => {
    await assignmentsClient.updateAssignment(assignment);
    dispatch(updateAssignment(assignment));
  };

  return (
    <div id="wd-assignments-editor" className="mt-3 ps-4">
      <label htmlFor="wd-name">Assignment Name</label>
      <input
        id="wd-name"
        value={formAssignment.title}
        onChange={(e) =>
          setFormAssignment({ ...formAssignment, title: e.target.value })
        }
        className="form-control mb-3"
      />
      <textarea
        id="wd-description"
        className="form-control mb-3"
        value={formAssignment.description}
        onChange={(e) =>
          setFormAssignment({ ...formAssignment, description: e.target.value })
        }
      />
      <div className="container float-end mb-4">
        <div className="row mb-2">
          <label htmlFor="wd-points" className="col-12 col-md-6 text-md-end ">
            Points
          </label>
          <input
            id="wd-points"
            value={formAssignment.points}
            onChange={(e) =>
              setFormAssignment({
                ...formAssignment,
                points: e.target.value,
              })
            }
            className="form-control col-12 col-md-6 w-50"
          />
        </div>
        <div className="row mb-2">
          <label htmlFor="wd-group" className="col-12 col-md-6 text-md-end">
            Assignment Group
          </label>
          <select id="wd-group" className="form-control col-12 col-md-6 w-50">
            <option value="ASSIGNMENT"></option>
            <option value="QUIZZES">QUIZZES</option>
            <option value="EXAMS">EXAMS</option>
            <option value="PROJECT">PROJECT</option>
          </select>
        </div>
        <div className="row mb-2">
          <label
            htmlFor="wd-display-grade-as"
            className="col-12 col-md-6 text-md-end"
          >
            Display Grade as
          </label>
          <select
            id="wd-display-grade-as"
            className="form-control col-12 col-md-6 w-50"
          >
            <option value="PERCENTAGE">Percentage</option>
          </select>
        </div>
        <div className="row">
          <label
            htmlFor="wd-submission-type"
            className="col-12 col-md-6 text-md-end"
          >
            Submission Type
          </label>
          <div className="col-12 col-md-6 w-50 border border-gray p-3 mb-2">
            <select id="wd-submission-type" className="form-control mb-4">
              <option value="ONLINE">Online</option>
            </select>

            <label className="fw-bold text-gray mb-3">
              Online Entry Options
            </label>
            <br />
            <input
              type="checkbox"
              name="submission-option"
              id="wd-text-entry"
            />
            <label htmlFor="wd-text-entry" className="ps-3 mb-3">
              Text Entry
            </label>
            <br />

            <input
              type="checkbox"
              name="submission-option"
              id="wd-website-url"
            />
            <label htmlFor="wd-website-url" className="ps-3 mb-3">
              Website URL
            </label>
            <br />

            <input
              type="checkbox"
              name="submission-option"
              id="wd-media-recordings"
            />

            <label htmlFor="wd-media-recordings" className="ps-3 mb-3">
              Media Recordings
            </label>
            <br />

            <input
              type="checkbox"
              name="submission-option"
              id="wd-student-annotation"
            />

            <label htmlFor="wd-student-annotation" className="ps-3 mb-3">
              Student Annotation
            </label>
            <br />

            <input
              type="checkbox"
              name="submission-option"
              id="wd-file-upload"
            />
            <label htmlFor="wd-file-upload" className="ps-3 mb-3">
              File Uploads
            </label>
          </div>
        </div>
        <div className="row">
          <label className="col-12 col-md-6 text-md-end">Assign</label>
          <div className="col-12 col-md-6 w-50 border border-gray p-3">
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
              defaultValue="2024-07-01T23:59:00Z"
              value={formAssignment.due_date.slice(0, 10)}
              onChange={(e) =>
                setFormAssignment({
                  ...formAssignment,
                  due_date: e.target.value,
                })
              }
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
                defaultValue="2024-07-01T23:59:00Z"
                value={formAssignment.available_date.slice(0, 10)}
                onChange={(e) =>
                  setFormAssignment({
                    ...formAssignment,
                    available_date: e.target.value,
                  })
                }
                className="col-6 form-control w-50"
              />
              <input
                id="wd-available-until"
                type="date"
                defaultValue="2024-07-01T23:59:00Z"
                value={formAssignment.until_date.slice(0, 10)}
                onChange={(e) =>
                  setFormAssignment({
                    ...formAssignment,
                    until_date: e.target.value,
                  })
                }
                className="col-6 form-control w-50"
              />
            </div>
          </div>
        </div>
      </div>
      <Link
        to={`/Kanbas/Courses/${cid}/Assignments`}
        onClick={() => {
          aid ? saveAssignment(formAssignment) : createAssignmentForCourse();
        }}
        className="btn btn-danger float-end ms-1"
      >
        Save
      </Link>
      <Link
        to={`/Kanbas/Courses/${cid}/Assignments`}
        className="btn btn-secondary float-end"
      >
        Cancel
      </Link>
    </div>
  );
}
