import keysSchema from "../../models/keys.js";
import {
  sendFailResponse,
  sendSuccessResponse,
} from "../../utils/responses.js";

const getKeys = async (req, res) => {
  try {
    const keys = await keysSchema.find({ department: req.user.department });

    if (!keys) throw "Keys not found";

    sendSuccessResponse({ res, data: keys });
  } catch (err) {
    sendFailResponse({ res, statusCode: 400, err });
  }
};

export default getKeys;
