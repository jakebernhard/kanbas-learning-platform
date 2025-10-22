import { TiTrash } from "react-icons/ti";
import { FaPencil } from "react-icons/fa6";
import { GoPlus } from "react-icons/go";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function MCQuestion({
  editing,
  question,
  setQuestion,
}: {
  editing: boolean;
  question: any;
  setQuestion: any;
}) {
  const question_stamp = new Date().getTime().toString();
  const numOptions = question?.options?.length;

  function handleSelectChoice(i: number) {
    setQuestion({ ...question, mc_answer: i });
  }

  function handleAddAnswer() {
    const newOptions = [...question.options, "New Option"];
    setQuestion({ ...question, options: newOptions });
  }

  function handleRemoveChoice(index: number) {
    const newOptions = question.options.filter(
      (option: string, i: number) => i !== index
    );
    setQuestion({ ...question, options: newOptions });
  }

  function handleUpdate(index: number, value: string) {
    const newOptions = question.options.map((option: any, i: any) =>
      i === index ? value : option
    );
    setQuestion({ ...question, options: newOptions });
  }

  const stripPTags = (html: string) => {
    return html.replace("</?p>", "");
  };

  return (
    <>
      <div className="mx-3 mt-3">
        {editing && (
          <>
            <p>
              Enter your question and multiple answers, then select the one
              correct answer.
            </p>
            <h5>Question: </h5>
            <div className="mb-3">
              <ReactQuill
                value={question.description}
                onChange={(e) =>
                  setQuestion({ ...question, description: stripPTags(e) })
                }
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
            <div>{question.description}</div>

            <hr />
          </>
        )}
        {editing && <h5>Answers: </h5>}
        {question.options.map((option: any, i: any) => (
          <>
            <div
              className={`ps-4 pb-4 ${
                i === numOptions - 1 && editing ? "border" : ""
              }`}
            >
              <input
                type="radio"
                name={question_stamp}
                checked={question.mc_answer === i}
                onClick={() => handleSelectChoice(i)}
                className={`me-3 form-check-input mt-${editing ? "2" : "1"}`}
              ></input>
              {!editing && <div className="d-inline">{option}</div>}
              {editing && (
                <>
                  <label className="d-inline me-2" htmlFor="wd-q3">
                    {question.mc_answer === i
                      ? "Correct Choice"
                      : "Possible Choice"}
                  </label>

                  <input
                    className="form-control d-inline"
                    style={{ width: "35%" }}
                    defaultValue={option}
                    onChange={(e) => handleUpdate(i, e.target.value)}
                    id="wd-q3"
                  ></input>
                </>
              )}
              {i === numOptions - 1 && editing && (
                <div className="float-end me-1">
                  <TiTrash
                    className="fs-5"
                    onClick={() => handleRemoveChoice(i)}
                  />
                  <FaPencil className="fs-6" />
                </div>
              )}
            </div>
          </>
        ))}
        {editing && (
          <div className="text-danger text-end" onClick={handleAddAnswer}>
            <GoPlus /> Add Another Answer
          </div>
        )}
      </div>
    </>
  );
}
