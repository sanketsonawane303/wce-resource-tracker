import requestSchema from "../../models/requests.js";
import {
  sendFailResponse,
  sendSuccessResponse,
} from "../../utils/responses.js";

const approveRequest = async (req, res) => {
  const { id, action, remarks } = req.body;
  try {
    const request = await requestSchema.findById(id);

    if (req.user.role === "advisor") {
      request.approvals.push({
        status: action,
        approver: req.user.email,
        remarks,
      });
      if (action !== "approved") request.status = action;

      await request.save();
    } else {
      // role === hod
      request.approvals.push({
        status: action,
        approver: req.user.email,
        remarks,
      });
      request.status = action;

      await request.save();
    }
    sendSuccessResponse({ res, data: request });
  } catch (err) {
    sendFailResponse({
      res,
      err,
      statusCode: 400,
    });
  }
};

export default approveRequest;
