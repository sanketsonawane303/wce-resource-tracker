import usersSchema from "../../models/users.js";
import {
  sendFailResponse,
  sendSuccessResponse,
} from "../../utils/responses.js";

const updateUser = async (req, res) => {
  try {
    const { email, password, access_token, role, ...info } = req.body;

    let user = await usersSchema.findOne({ email });
    if (!user) throw "User not found";

    if (role.length > 1) {
      role.sort();
      if (!(role[0] === "advisor" && role[1] === "hod"))
        throw "Invalid role combination";
    }

    await usersSchema.findOneAndUpdate({ email }, { role, ...info });

    sendSuccessResponse({ res, data: "User created successfully" });
  } catch (err) {
    sendFailResponse({ res, err, statusCode: 400 });
  }
};

export default updateUser;
