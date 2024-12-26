import { ResponseStatus } from "./types";

const handleResponse = ({ code, data, count }: ResponseStatus) => {
  if (code === 404) {
    return {
      code: 404,
      message: "Task with requested ID not found",
    };
  }

  return {
    code: 200,
    message: "Operation is successful",
    ...(isNaN(Number(count)) ? null : { count }),
    data: data,
  };
};

export default handleResponse;
