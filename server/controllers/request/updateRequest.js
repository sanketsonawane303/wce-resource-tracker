import requestSchema from "../../models/requests.js";
import {
  sendSuccessResponse,
  sendFailResponse,
} from "../../utils/responses.js";

const updateRequest = async (req, res) => {
  const { id, link } = req.body;
  try {
    const request = await requestSchema.findByOneAndUpdate(
      { _id: id, applicant: req.user.email },
      {
        status: "pending",
        letter: link,
      },
      { new: true }
    );

    if (!request)
      return sendFailResponse({
        res,
        statusCode: 404,
        err: "Given request not found in your submitted requests",
      });
    else
      sendSuccessResponse({
        res,
        data: request,
      });
  } catch (err) {
    sendFailResponse({ err, res, statusCode: 400 });
  }
};

export default updateRequest;
