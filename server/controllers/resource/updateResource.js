import resourcesSchema from "../../models/resources.js";
import {
  sendFailResponse,
  sendSuccessResponse,
} from "../../utils/responses.js";

const createResource = async (req, res) => {
  try {
    const { name, capacity } = req.body;

    const resource = await resourcesSchema.findOneAndUpdate(
      { name },
      { capacity }
    );

    if (!resource) throw "Resource not found";

    sendSuccessResponse({ res, data: { resource, key } });
  } catch (err) {
    sendFailResponse({ res, statusCode: 400, err });
  }
};

export default createResource;
