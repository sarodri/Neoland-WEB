import axios from "axios";
// hace la peticion http
export const axiosUtil = async (options) => {
  return await axios.request(options).then((res) => res.data);
};