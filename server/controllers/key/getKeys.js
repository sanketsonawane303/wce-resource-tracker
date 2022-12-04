import keysSchema from "../../models/keys.js";
import {
  sendFailResponse,
  sendSuccessResponse,
} from "../../utils/responses.js";

const getKeys = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      const keys = await keysSchema.find({ department: req.user.department });
      if (!keys) throw "Keys not found";

      sendSuccessResponse({ res, data: keys });
    } else {
      const key = await keysSchema.findById(id);
      if (!key) throw "Key not found";

      sendSuccessResponse({ res, data: key });
    }
  } catch (err) {
    sendFailResponse({ res, statusCode: 400, err });
  }
};

export default getKeys;
