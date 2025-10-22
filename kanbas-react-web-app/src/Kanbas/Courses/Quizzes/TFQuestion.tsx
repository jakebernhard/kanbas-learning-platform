import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function TFQuestion({
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
  const question_stamp = new Date().getTime().toString();

  function handleSelectChoice(answer: boolean) {
    setQuestion({ ...question, tf_answer: answer });
  }

  return (
    <>
      <div className="mx-3 mt-3">
        {editing && (
          <>
            <p>
              Enter your question text, then select if True or False is the
              correct answer.
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
        <div className="ps-4  mb-4">
          <input
            type="radio"
            value="true"
            id="wd-choice-true"
            name={question_stamp}
            checked={question.tf_answer}
            onClick={() => handleSelectChoice(true)}
            className="me-3 form-check-input mt-1"
          ></input>
          <label className="d-inline me-2" htmlFor="wd-choice-true">
            True
          </label>
        </div>
        <div className="ps-4 mb-4">
          <input
            type="radio"
            name={question_stamp}
            value="false"
            id="wd-choice-false"
            checked={question.tf_answer}
            onClick={() => handleSelectChoice(false)}
            className="me-3 form-check-input mt-1"
          ></input>
          <label className="d-inline me-2" htmlFor="id-choice-false">
            False
          </label>
        </div>
      </div>
    </>
  );
}
