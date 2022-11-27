import resourceSchema from "../../models/resources.js";
import {
  sendFailResponse,
  sendSuccessResponse,
} from "../../utils/responses.js";

const getResources = async (req, res) => {
  const filter = req.body;

  try {
    const resources = await resourceSchema.find(filter);

    sendSuccessResponse({ res, data: resources });
  } catch (err) {
    sendFailResponse({ res, statusCode: 400, err });
  }
};

export default getResources;
