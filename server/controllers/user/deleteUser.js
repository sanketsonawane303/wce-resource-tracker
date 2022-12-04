import usersSchema from "../../models/users.js";
import {
  sendSuccessResponse,
  sendFailResponse,
} from "../../utils/responses.js";

const getUser = async (req, res) => {
  try {
    const id = req.params.id;

    const user = await usersSchema.findByIdAndDelete(id);

    if (!user) throw "User not found";

    sendSuccessResponse({ res, data: "User deleted successfully" });
  } catch (err) {
    sendFailResponse({ res, statusCode: 400, err });
  }
};

export default getUser;
