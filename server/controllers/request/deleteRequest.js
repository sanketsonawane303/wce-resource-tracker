import requestSchema from "../../models/requests.js";
import {
  sendFailResponse,
  sendSuccessResponse,
} from "../../utils/responses.js";

const deleteRequest = async (req, res) => {
  try {
    const { id } = req.params;

    const request = await requestSchema.findOneAndDelete({
      _id: id,
      applicant: req.user.email,
    });

    if (!request) throw "Given request not found in your submitted requests";

    sendSuccessResponse({ res, data: "Request deleted successfully" });
  } catch (err) {
    sendFailResponse({ res, statusCode: 400, err });
  }
};

export default deleteRequest;
