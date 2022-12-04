import resourceSchema from "../../models/resources.js";
import {
  sendFailResponse,
  sendSuccessResponse,
} from "../../utils/responses.js";

const getResources = async (req, res) => {
  try {
    const { name, department } = req.query;
    let resources;

    if (name) resources = await resourceSchema.findOne({ name });
    else if (department) resources = await resourceSchema.find({ department });
    else resources = await resourceSchema.find({});

    sendSuccessResponse({ res, data: resources });
  } catch (err) {
    sendFailResponse({ res, statusCode: 400, err });
  }
};

export default getResources;
