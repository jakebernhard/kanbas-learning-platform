import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
const QUESTIONS_API = `${REMOTE_SERVER}/api/questions`;

export const updateQuestions = async (questions: any) => {
  const { data } = await axiosWithCredentials.put(
    `${QUESTIONS_API}`,
    questions
  );
  return data;
};
