import usersSchema from "../../models/users.js";
import {
  sendFailResponse,
  sendSuccessResponse,
} from "../../utils/responses.js";
import { hashPassword } from "../../utils/passwords.js";
import generateAccessToken from "../../utils/generateAccessToken.js";

const signIn = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await usersSchema.findOne({ email });
    if (!user) throw "Invalid email or password";

    const hashedPassword = hashPassword(password);
    if (hashedPassword !== user.password) throw "Invalid email or password";

    const payload = user.toObject();
    delete payload._id;
    delete payload.access_token;
    delete payload.password;

    const token = await generateAccessToken(payload);

    sendSuccessResponse({ res, data: token });
  } catch (err) {
    sendFailResponse({ res, statusCode: 400, err });
  }
};

export default signIn;
