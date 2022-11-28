import usersSchema from "../../models/users.js";
import {
  sendSuccessResponse,
  sendFailResponse,
} from "../../utils/responses.js";

const getUser = async (req, res) => {
  const info = req.body;

  const user = await usersSchema.find(info, "-password");

  if (!user)
    return sendFailResponse({ res, statusCode: 404, err: "User not found" });

  sendSuccessResponse({ res, data: user });
};

export default getUser;
