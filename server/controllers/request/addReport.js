import requestsSchema from "../../models/requests.js";
import {
  sendFailResponse,
  sendSuccessResponse,
} from "../../utils/responses.js";

const addReport = async (req, res) => {
  try {
    const { report, id } = req.body;

    const data = await requestsSchema.findByOneAndUpdate(
      { _id: id, applicant: req.user.email },
      { report },
      { new: true }
    );

    if (!request) throw "Given request not found in your submitted requests";

    sendSuccessResponse({ res, data });
  } catch (err) {
    sendFailResponse({ res, err, statusCode: 400 });
  }
};

export default addReport;
