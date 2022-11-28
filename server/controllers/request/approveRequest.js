import requestSchema from "../../models/requests.js";
import userSchema from "../../models/users.js";
import {
  sendFailResponse,
  sendSuccessResponse,
} from "../../utils/responses.js";

const approveRequest = async (req, res) => {
  const { id, action, remarks } = req.body;

  try {
    const request = await requestSchema.findById(id);

    const approveByAdvisor = async () => {
      const user = await userSchema.findOne({ email: req.user.email });
      if (!user.advisor_club.includes(request.club))
        return sendFailResponse({
          res,
          statusCode: 400,
          err: "You are not allowed to approve this request",
        });

      request.approvals.push({
        status: action,
        approver: req.user.email,
        role: "advisor",
        remarks,
      });
      if (action !== "approved") request.status = action;

      await request.save();
    };

    const approveByHod = async () => {
      const user = await userSchema.findOne({ email: req.user.email });
      if (user.department !== request.resources.department)
        return sendFailResponse({
          res,
          statusCode: 400,
          err: "You are not allowed to approve this request",
        });

      request.approvals.push({
        status: action,
        approver: req.user.email,
        role: "hod",
        remarks,
      });
      request.status = action;

      await request.save();
    };

    if (req.user.role.includes("advisor")) {
      if (req.user.role.includes("hod")) {
        if (
          request.approvals.find(
            (approval) =>
              approval.status === "approved" && approval.role === "advisor"
          )
        ) {
          await approveByAdvisor();
        } else {
          approveByHod();
        }
      } else {
        await approveByAdvisor();
      }
    } else if (req.user.role.includes("hod")) {
      await approveByHod();
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
