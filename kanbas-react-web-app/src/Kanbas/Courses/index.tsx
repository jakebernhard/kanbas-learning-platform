import { Navigate, Route, Routes, useLocation, useParams } from "react-router";
import { FaAlignJustify } from "react-icons/fa";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import Home from "./Home";
import Modules from "./Modules";
import CoursesNavigation from "./Navigation";
import PeopleTable from "./People/Table";
import { useEffect, useState } from "react";
import * as courseClient from "./client";
import Quizzes from "./Quizzes";
import QuizDetails from "./Quizzes/QuizDetails";
import QuizEditor from "./Quizzes/QuizEditor";
import QuizPreview from "./Quizzes/QuizPreview";
import QuizQuestion from "./Quizzes/QuizQuestion";

const quiz = {
  _id: 1,
  title: "Q1 - HTML",
  type: "Online",
  group: "EXAMS",
  shuffle_answers: "Yes",
  time_limit: 20,
  multiple_attempts: "No",
  view_responses: "Yes",
  num_attempts: 1,
  show_correct: "Yes",
  access_code: "code123",
  one_q_at_time: "Yes",
  webcam: "Yes",
  lock_after_answering: "Yes",
  availability: "Closed",
  due_date: "November 1st",
  until_date: "December 1st",
  available_date: "October 1st",
  points: 100,
  questions: 10,
  score: 90,
};

export default function Courses({ courses }: { courses: any[] }) {
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);
  const { pathname } = useLocation();
  const [courseUsers, setCourseUsers] = useState();

  const findUsersForCourse = async () => {
    try {
      const users = await courseClient.findUsersForCourse(cid || "");
      setCourseUsers(users);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    findUsersForCourse();
  }, []);

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name} &gt; {pathname.split("/")[4]}
      </h2>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CoursesNavigation />
        </div>
        <div className="flex-fill">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:aid" element={<AssignmentEditor />} />
            <Route
              path="Assignments/NewAssignment"
              element={<AssignmentEditor />}
            />
            <Route path="Quizzes" element={<Quizzes />} />
            <Route path="Quizzes/:qid/" element={<QuizDetails />} />
            <Route path="Quizzes/:qid/editor" element={<QuizEditor />} />
            <Route path="Quizzes/:qid/questions" element={<QuizQuestion />} />
            <Route
              path="Quizzes/:qid/preview"
              element={<QuizPreview realAttempt={false} />}
            />
            <Route
              path="Quizzes/:qid/attempt"
              element={<QuizPreview realAttempt={true} />}
            />
            <Route
              path="People"
              element={<PeopleTable users={courseUsers} />}
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}
