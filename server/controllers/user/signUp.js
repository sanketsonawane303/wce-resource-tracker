import usersSchema from "../../models/users.js";
import {
  sendFailResponse,
  sendSuccessResponse,
} from "../../utils/responses.js";
import { generateHashedPassword } from "../../utils/passwords.js";
import generateAccessToken from "../../utils/generateAccessToken.js";

const signUp = async (req, res) => {
  const user = req?.body;
  try {
    const token = generateAccessToken(user.email);
    const data = await usersSchema.create({ ...user, access_token: token });
    sendSuccessResponse({
      res,
      data: { ...data, token },
    });
  } catch (err) {
    sendFailResponse({
      res,
      err: "User Already Exists",
      statusCode: 500,
    });
  }
};
