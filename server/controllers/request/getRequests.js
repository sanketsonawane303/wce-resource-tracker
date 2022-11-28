import requestsSchema from "../../models/requests.js";
import {
  sendSuccessResponse,
  sendFailResponse,
} from "../../utils/responses.js";

const getRequests = async (req, res) => {
  const requests = await requestsSchema.find(req.body);

  if (!requests)
    return sendFailResponse({
      res,
      statusCode: 404,
      err: "Requests not found",
    });

  sendSuccessResponse({ res, data: requests });
};

export default getRequests;
