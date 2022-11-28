import { getMongoDuplicateKeyError } from "./errors.js";

const sendSuccessResponse = ({ res, data }) => {
  res.status(200).send({
    status: "success",
    data,
  });
};

const sendFailResponse = ({ res, statusCode = 400, err }) => {
  let errorToSend = err;

  // if (err.code === 11000) {
  //   let keyValues = getMongoDuplicateKeyError(err.keyValue);
  //   errorToSend = {
  //     message: `${keyValues.key}(${keyValues.value}) already exists.`,
  //   };
  //   statusCode = 409;
  // }

  res.status(statusCode).send({
    status: "failure",
    err: errorToSend,
  });
};

export { sendSuccessResponse, sendFailResponse };
