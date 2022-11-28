import requestsSchema from "../../models/requests.js";
import {
  sendFailResponse,
  sendSuccessResponse,
} from "../../utils/responses.js";

const addReport = async (req, res) => {
  const { report, id } = req.body;
  try {
    const data = await requestsSchema.findByOneAndUpdate(
      { _id: id, applicant: req.user.email },
      { report },
      { new: true }
    );
    if (!request)
      sendFailResponse({
        res,
        statusCode: 404,
        err: "Given request not found in your submitted requests",
      });
    else sendSuccessResponse({ res, data });
  } catch (err) {
    sendFailResponse({ res, err, statusCode: 400 });
  }
};

export default addReport;
