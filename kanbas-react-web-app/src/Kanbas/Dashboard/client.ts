import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
export const REMOTE_SERVER = process.env.REACT_APP_REMOTE_SERVER;
export const ENROLLMENTS_API = `${REMOTE_SERVER}/api/enrollments`;
export const USERS_API = `${REMOTE_SERVER}/api/users`;

export const createEnrollment = async ({
  cid,
  userid,
}: {
  cid: any;
  userid: any;
}) => {
  const { data } = await axiosWithCredentials.post(`${ENROLLMENTS_API}`, {
    cid,
    userid,
  });
  return data;
};

export const removeEnrollment = async ({ cid }: { cid: string }) => {
  const response = await axiosWithCredentials.delete(
    `${USERS_API}/current/courses/${cid}`
  );
  return response.data;
};

export const addEnrollment = async ({ cid }: { cid: string }) => {
  const response = await axiosWithCredentials.post(
    `${USERS_API}/current/courses/${cid}`
  );
  return response.data;
};

export const findAllEnrollments = async () => {
  const { data } = await axiosWithCredentials.get(`${ENROLLMENTS_API}`);
  return data;
};
