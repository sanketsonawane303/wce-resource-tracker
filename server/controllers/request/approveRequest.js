import requestSchema from "../../models/requests.js";
import userSchema from "../../models/users.js";
import {
  sendFailResponse,
  sendSuccessResponse,
} from "../../utils/responses.js";

const approveRequest = async (req, res) => {
  try {
    const { id, action, remarks } = req.body;

    const request = await requestSchema.findById(id);
    const user = await userSchema.findOne({ email: req.user.email });

    if (
      user.role.includes("hod") &&
      user.department === request.resources.department &&
      action === "declined"
    ) {
      // hod can decline anything anytime
      if (request.status === "declined") throw "Request is already declined";

      request.approvals.push({
        status: "declined",
        approver: user.email,
        role: "hod",
        remarks,
      });

      request.status = "declined";

      // gap for readability
    } else if (
      request.status === "pending" &&
      user.role.includes("advisor") &&
      user.advisor_club.includes(request.club)
    ) {
      request.approvals.push({
        status: action,
        approver: user.email,
        role: "advisor",
        remarks,
      });

      if (action === "approved") request.status = "approved by advisor";
      else request.status = action;

      // gap for readability
    } else if (
      request.status === "approved by advisor" &&
      user.role.includes("hod") &&
      user.department === request.resources.department
    ) {
      request.approvals.push({
        status: action,
        approver: user.email,
        role: "hod",
        remarks,
      });

      request.status = action;

      // gap for readability
    } else throw "You are not allowed to approve this request";

    await request.save();

    sendSuccessResponse({ res, data: request });
  } catch (err) {
    sendFailResponse({ res, statusCode: 400, err });
  }
};

export default approveRequest;
