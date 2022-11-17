import usersSchema from "../../models/users.js";
import {
  sendSuccessResponse,
  sendFailResponse,
} from "../../utils/responses.js";

const getUser = async (req, res) => {
  const users = await usersSchema.find({ role: { $ne: "admin" } }, "-password");

  if (users.length === 0)
    return sendFailResponse({ res, statusCode: 404, err: "No user found" });

  sendSuccessResponse({ res, data: users });
};

export default getUser;
