import requestsSchema from "../../models/requests.js";
import {
  sendFailResponse,
  sendSuccessResponse,
} from "../../utils/responses.js";

const addRequest = async (req, res) => {
  const {
    resources,
    time: { from, to },
    ...data
  } = req.body;

  if (Date(from) > Date(to)) {
    return sendFailResponse({
      res,
      statusCode: 400,
      err: "Invalid time period",
    });
  }
  const request = await requestsSchema.find({
    resource: { $in: resources },
    $and: [{ "time.to": { $gt: from } }, { "time.from": { $lt: to } }],
  });
  console.log(request);

  if (request.length > 0) {
    return sendFailResponse({
      res,
      statusCode: 400,
      err: "Resources already occupied for given time period",
    });
  } else {
    try {
      const response = await requestsSchema.create({
        ...data,
        time: { from, to },
        resources,
      });
      sendSuccessResponse({
        res,
        data: response,
      });
    } catch (err) {
      sendFailResponse({
        res,
        err: err,
        statusCode: 400,
      });
    }
  }
};

export default addRequest;
