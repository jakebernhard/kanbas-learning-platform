import { useEffect, useState } from "react";
import TFQuestion from "./TFQuestion";
import MCQuestion from "./MCQuestion";
import FillInTheBlank from "./FillInTheBlank";

export default function Question({
  q,
  setQ,
  facultyView,
}: {
  q: any;
  setQ: any;
  facultyView: boolean;
}) {
  const [question, setQuestion] = useState<any>(q);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    setQuestion(q);
  }, [q]);

  return (
    <div
      className={`border mx-auto my-5 ${!editing && "border-black"}`}
      style={{ width: "60%" }}
    >
      <div
        className={`pb-4 pt-2 border-bottom ${
          editing ? "" : "bg-secondary border-black"
        }`}
      >
        {!editing && (
          <div className="mb-4">
            <div className="ms-3 mt-2 d-inline fs-5 float-start">
              {question.title}
            </div>
            <div className="me-3 mt-2 d-inline fs-5 float-end">
              {question.points} pts
            </div>
          </div>
        )}
        {editing && (
          <>
            <input
              className="ms-3 mt-2 form-control w-25 d-inline me-1"
              defaultValue={question.title}
              onChange={(e) =>
                setQuestion({ ...question, title: e.target.value })
              }
            />
            <select
              className="form-control d-inline w-25"
              defaultValue={question.type}
              onChange={(e) =>
                setQuestion({ ...question, type: e.target.value })
              }
            >
              <option value="MC">Multiple Choice</option>
              <option value="TF">True/False</option>
              <option value="FITB">Fill In The Blank</option>
            </select>

            <div className="d-inline float-end me-3 mt-2">
              pts:
              <input
                className="form-control d-inline"
                style={{ width: "70px" }}
                value={question.points}
                onChange={(e) =>
                  setQuestion({ ...question, points: e.target.value })
                }
              ></input>
            </div>
          </>
        )}
      </div>
      {question.type === "TF" && (
        <TFQuestion
          editing={editing}
          setEditing={setEditing}
          question={question}
          setQuestion={setQuestion}
        />
      )}
      {question.type === "MC" && (
        <MCQuestion
          editing={editing}
          question={question}
          setQuestion={setQuestion}
        />
      )}
      {question.type === "FITB" && (
        <FillInTheBlank
          editing={editing}
          setEditing={setEditing}
          question={question}
          setQuestion={setQuestion}
        />
      )}
      <div className="mb-3 ms-3">
        {editing && (
          <>
            <button className="btn btn-sm btn-secondary">Cancel</button>
            <button
              className="btn btn-sm btn-danger ms-2"
              onClick={() => {
                console.log(question);
                setEditing(false);
                setQ(question);
              }}
            >
              Update Question
            </button>
          </>
        )}
        {!editing && facultyView && (
          <>
            <button
              className="btn btn-md btn-danger ms-2"
              onClick={() => setEditing(true)}
            >
              Edit
            </button>
          </>
        )}
      </div>
    </div>
  );
}
