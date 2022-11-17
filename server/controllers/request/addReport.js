import requestsSchema from "../../models/requests.js";
import {
  sendFailResponse,
  sendSuccessResponse,
} from "../../utils/responses.js";

const addReport = async (req, res) => {
  const { report, id } = req.body;
  try {
    const data = await requestsSchema.findByIdAndUpdate(id, { report });
    sendSuccessResponse({ res, data });
  } catch (err) {
    sendFailResponse({ res, err, statusCode: 400 });
  }
};

export default addReport;
