import usersSchema from "../../models/users.js";
import {
  sendFailResponse,
  sendSuccessResponse,
} from "../../utils/responses.js";
import { hashPassword } from "../../utils/passwords.js";

const updatePassword = async (req, res) => {
  try {
    const { currentPassword, newPassword } = req.body;

    const user = await usersSchema.findOne({ email: req.user.email });

    if (user.password !== hashPassword(currentPassword))
      throw "Incorrect current password";

    user.password = hashPassword(newPassword);
    await user.save();

    sendSuccessResponse({ res, data: "Password updated successfully" });
  } catch (err) {
    sendFailResponse({ res, statusCode: 400, err });
  }
};

export default updatePassword;
