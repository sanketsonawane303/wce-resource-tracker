import keysSchema from "../../models/keys.js";
import {
  sendFailResponse,
  sendSuccessResponse,
} from "../../utils/responses.js";

const getKeys = async (req, res) => {
  const role = req.user.role;
  const id = req.params.id;

  try {
    // if no id is sent
    if (!id) {
      if (role === "hod" || role === "advisor") {
        const keys = await keysSchema.find({});
        sendSuccessResponse({ res, data: keys });
      } else {
        return sendFailResponse({
          res,
          statusCode: 400,
          err: "Key ID is required",
        });
      }
    }

    // if student
    if (role === "representative") {
      const key = await keysSchema.findById(id, { is_available: 1 });
      return sendSuccessResponse({ res, data: key });
    }

    // if staff advisor
    else if (role === "advisor" || role === "hod") {
      const keys = await keysSchema.findById(id);
      return sendSuccessResponse({ res, data: keys });
    } else {
      sendFailResponse({
        res,
        statusCode: 400,
        err: "Role and key Id required",
      });
    }
  } catch (err) {
    sendFailResponse({ res, statusCode: 400, err });
  }
};

export default getKeys;
