import resourceSchema from "../../models/resources.js";
import {
  sendFailResponse,
  sendSuccessResponse,
} from "../../utils/responses.js";

const getResources = async (req, res) => {
  try {
    const { department } = req.query;

    const resources = await resourceSchema.find({ department });

    sendSuccessResponse({ res, data: resources });
  } catch (err) {
    sendFailResponse({ res, statusCode: 400, err });
  }
};

export default getResources;
