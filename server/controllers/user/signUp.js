import usersSchema from "../../models/users.js";
import {
  sendFailResponse,
  sendSuccessResponse,
} from "../../utils/responses.js";
import { hashPassword } from "../../utils/passwords.js";

const signUp = async (req, res) => {
  try {
    const { email, password, role, ...data } = req.body;

    let user = await usersSchema.findOne({ email });
    if (user) throw "User already exists";

    if (role.length > 1) {
      role.sort();
      if (!(role[0] === "advisor" && role[1] === "hod"))
        throw "Invalid role combination";
    }

    const hashedPassword = hashPassword(password);

    await usersSchema.create({
      email,
      password: hashedPassword,
      role,
      ...data,
    });

    sendSuccessResponse({ res, data: "User created successfully" });
  } catch (err) {
    sendFailResponse({ res, err, statusCode: 400 });
  }
};

export default signUp;
