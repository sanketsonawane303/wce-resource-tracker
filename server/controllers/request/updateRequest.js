import requestSchema from "../../models/requests.js";
import {
  sendSuccessResponse,
  sendFailResponse,
} from "../../utils/responses.js";

const updateRequest = async (req, res) => {
  const { id } = req.body;
  try {
    const request = requestSchema.findByIdAndUpdate(id, { status: "pending" });
    sendSuccessResponse({
      res,
      data: request,
    });
  } catch (err) {
    sendFailResponse({ err, res, statusCode: 400 });
  }
};

export default updateRequest;
