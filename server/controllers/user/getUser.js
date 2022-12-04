import usersSchema from "../../models/users.js";
import {
  sendSuccessResponse,
  sendFailResponse,
} from "../../utils/responses.js";

const getUser = async (req, res) => {
  try {
    const info = req.body;

    const user = await usersSchema.find(info, "-password");

    if (!user) throw "User not found";

    sendSuccessResponse({ res, data: user });
  } catch (err) {
    sendFailResponse({ res, statusCode: 400, err });
  }
};

export default getUser;
