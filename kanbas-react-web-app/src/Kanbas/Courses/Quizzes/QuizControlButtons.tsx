import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "../Modules/GreenCheckmark";
import { FaPencil, FaTrash } from "react-icons/fa6";
import { FaBan } from "react-icons/fa";
import { useState } from "react";
import { GoDownload, GoUpload } from "react-icons/go";
import { useDispatch } from "react-redux";
import { deleteQuiz, updateQuiz } from "./reducer";
import * as quizClient from "./client";

export default function QuizControlButtons({ quiz }: { quiz: any }) {
  const [showContext, setShowContext] = useState(false);
  const dispatch = useDispatch();

  const removeQuiz = async (quizId: string) => {
    await quizClient.deleteQuiz(quizId);
    dispatch(deleteQuiz(quizId));
  };

  const saveQuiz = async (newQuiz: any) => {
    await quizClient.updateQuiz(newQuiz);
    dispatch(updateQuiz(newQuiz));
  };

  return (
    <div className="float-end">
      {quiz.published && <GreenCheckmark />}
      {!quiz.published && "Available" && (
        <FaBan className="fs-5 me-1 text-danger" />
      )}
      {showContext && (
        <>
          <FaPencil className="fs-5 ms-1 me-1" title="Edit" />
          <FaTrash
            className="fs-5 ms-1 me-1 text-danger"
            title="Delete"
            onClick={() => removeQuiz(quiz._id)}
          />
          {!quiz.published && (
            <GoUpload
              className="fs-5 ms-1 me-1"
              title="Publish"
              onClick={() => saveQuiz({ ...quiz, published: true })}
            />
          )}
          {quiz.published && (
            <GoDownload
              className="fs-5 ms-1 me-1"
              title="Unpublish"
              onClick={() => saveQuiz({ ...quiz, published: false })}
            />
          )}
        </>
      )}
      <IoEllipsisVertical
        className="fs-4"
        onClick={() => setShowContext(!showContext)}
      />
    </div>
  );
}
