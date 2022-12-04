import usersSchema from "../../models/users.js";
import {
  sendSuccessResponse,
  sendFailResponse,
} from "../../utils/responses.js";

const getUsers = async (req, res) => {
  try {
    const users = await usersSchema.find({}, "-password -access_token");

    if (users.length === 0) throw "No users found";

    sendSuccessResponse({ res, data: users });
  } catch (err) {
    sendFailResponse({ res, statusCode: 400, err });
  }
};

export default getUsers;
