import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FaTrash } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import * as assignmentsClient from "../Assignments/client";
import { deleteAssignment } from "./reducer";

export default function AssignmentControlButtons({
  assignment_id,
}: {
  assignment_id: any;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();

  const removeAssignment = async (assignmentId: string) => {
    await assignmentsClient.deleteAssignment(assignmentId);
    dispatch(deleteAssignment(assignmentId));
  };

  return (
    <div className="float-end">
      {currentUser.role === "FACULTY" && (
        <FaTrash
          className="text-danger me-2 mb-1"
          // data-bs-toggle="modal"
          // data-bs-target="#wd-delete-assignment-dialog"
          onClick={() => removeAssignment(assignment_id)}
        />
      )}
      <GreenCheckmark />
      <IoEllipsisVertical className="fs-4" />
      {/* <AssignmentDeleteForm
        deleteAssignment={() => removeAssignment(assignment_id)}
      /> */}
    </div>
  );
}
