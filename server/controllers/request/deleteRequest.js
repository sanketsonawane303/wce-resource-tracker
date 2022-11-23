import requestSchema from "../../models/requests.js";
import {
  sendFailResponse,
  sendSuccessResponse,
} from "../../utils/responses.js";

const deleteRequest = async (req, res) => {
  const { id } = req.params;

  try {
    const request = requestSchema.findByIdAndDelete(id);

    if (!request)
      sendFailResponse({ res, statusCode: 404, err: "Request not found" });
    else sendSuccessResponse({ res, data: "Request deleted successfully" });
  } catch (err) {
    sendFailResponse({ res, statusCode: 400, err });
  }
};

export default deleteRequest;
