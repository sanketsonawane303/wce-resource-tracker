import usersSchema from "../../models/users.js";
import {
  sendSuccessResponse,
  sendFailResponse,
} from "../../utils/responses.js";

const getUser = async (req, res) => {
  const id = req.params.id;

  const user = await usersSchema.findByIdAndDelete(id);

  if (!user)
    return sendFailResponse({ res, statusCode: 404, err: "User not found" });

  sendSuccessResponse({ res, data: "User deleted successfully" });
};

export default getUser;
