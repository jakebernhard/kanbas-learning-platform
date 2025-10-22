import { Navigate, useParams } from "react-router-dom";

export default function ProtectedCourseRoute({
  children,
  courses,
}: {
  children: any;
  courses: any;
}) {
  const { cid } = useParams();

  if (courses.find((c: any) => c._id === cid)) {
    return children;
  } else {
    return <Navigate to="/Kanbas/Dashboard" />;
  }
}
