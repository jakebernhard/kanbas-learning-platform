import { TiTrash } from "react-icons/ti";
import { GoPlus } from "react-icons/go";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function FillInTheBlank({
  editing,
  setEditing,
  question,
  setQuestion,
}: {
  editing: boolean;
  setEditing: any;
  question: any;
  setQuestion: any;
}) {
  const numAnswers = question.fitb_answers.length;

  function addNewAnswer() {
    setQuestion({ ...question, fitb_answers: [...question.fitb_answers, ""] });
  }

  function removeAnswerChoice(index: number) {
    const newAnswers = question.fitb_answers.filter(
      (answer: string, i: number) => i !== index
    );

    setQuestion({ ...question, fitb_answers: newAnswers });
  }

  function updateAnswer(index: number, value: string) {
    const newAnswers = question.fitb_answers.map((answer: string, i: number) =>
      i === index ? value : answer
    );
    setQuestion({ ...question, fitb_answers: newAnswers });
  }

  return (
    <>
      <div className="mx-3 mt-3">
        {editing && (
          <>
            <p>
              Enter your question text, then definite multiple answers for the
              blank. Students will see this question followed by a small text
              box to type their answer.
            </p>
            <h5>Question: </h5>
            <div className="mb-3">
              <ReactQuill
                value={question.description}
                onChange={(e) => setQuestion({ ...question, description: e })}
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
          </>
        )}
        {!editing && (
          <>
            <div className="my-4">{question.description}</div> <hr />
          </>
        )}
        {editing && <h5>Answers: </h5>}
        {editing &&
          question.fitb_answers.map((answer: any, i: any) => (
            <>
              <div
                className={`ps-5 pb-4 ${
                  i === numAnswers - 1 && editing ? "border" : ""
                }`}
              >
                {editing && (
                  <>
                    <label className="d-inline me-2" htmlFor="wd-q3">
                      Possible Answer
                    </label>
                    <input
                      className="form-control d-inline"
                      style={{ width: "35%" }}
                      defaultValue={answer}
                      onChange={(e) => updateAnswer(i, e.target.value)}
                      id="wd-q3"
                    ></input>
                  </>
                )}
                {i === numAnswers - 1 && editing && (
                  <div className="float-end me-1">
                    <TiTrash
                      className="fs-5"
                      onClick={() => removeAnswerChoice(i)}
                    />
                  </div>
                )}
              </div>
            </>
          ))}
        {editing && (
          <div className="text-danger text-end" onClick={addNewAnswer}>
            <GoPlus /> Add Another Answer
          </div>
        )}
        {!editing && (
          <div className="text-center">
            <input className=" w-75 my-4 px-3 py-2 border border-black rounded-0"></input>
          </div>
        )}
      </div>
    </>
  );
}
