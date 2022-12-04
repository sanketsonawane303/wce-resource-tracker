import requestSchema from "../../models/requests.js";
import {
  sendSuccessResponse,
  sendFailResponse,
} from "../../utils/responses.js";

const updateRequest = async (req, res) => {
  try {
    const { id, link } = req.body;

    const request = await requestSchema.findOne({
      _id: id,
      applicant: req.user.email,
    });
    if (!request) throw "Given request not found in your submitted requests";

    if (request.status !== "changes required")
      throw 'You are only allowed to update when status is "changes required"';

    request.letter = link;

    const lastApproval = request.approvals[request.approvals.length - 1];
    if (lastApproval.role === "advisor") request.status = "pending";
    else request.status = "approved by advisor";

    await request.save();

    sendSuccessResponse({ res, data: request });
  } catch (err) {
    sendFailResponse({ err, res, statusCode: 400 });
  }
};

export default updateRequest;
