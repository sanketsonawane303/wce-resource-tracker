import requestSchema from "../../models/requests.js";
import {
  sendSuccessResponse,
  sendFailResponse,
} from "../../utils/responses.js";

const updateRequest = async (req, res) => {
  const { id, link } = req.body;
  try {
    const request = await requestSchema.findByIdAndUpdate(
      id,
      {
        status: "pending",
        letter: link,
      },
      { new: true }
    );
    sendSuccessResponse({
      res,
      data: request,
    });
  } catch (err) {
    sendFailResponse({ err, res, statusCode: 400 });
  }
};

export default updateRequest;
