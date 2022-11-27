import usersSchema from "../../models/users.js";
import {
  sendFailResponse,
  sendSuccessResponse,
} from "../../utils/responses.js";
import { hashPassword } from "../../utils/passwords.js";
// import generateAccessToken from '../../utils/generateAccessToken.js';

// const signUp = async (req, res) => {
//   const user = req?.body;
//   try {
//     const token = generateAccessToken(user.email);
//     const data = await usersSchema.create({ ...user, access_token: token });
//     sendSuccessResponse({
//       res,
//       data: { ...data, token },
//     });
//   } catch (err) {
//     sendFailResponse({
//       res,
//       err: 'User Already Exists',
//       statusCode: 500,
//     });
//   }
// };

const signUp = async (req, res) => {
  const { email, password, role, ...data } = req.body;

  let user = await usersSchema.findOne({ email });
  if (user)
    return sendFailResponse({
      res,
      statusCode: 400,
      err: "User already exists",
    });

  if (role.length > 1) {
    role.sort();
    if (!(role[0] === "advisor" && role[1] === "hod"))
      return sendFailResponse({
        res,
        statusCode: 400,
        err: "Invalid role combination",
      });
  }

  const hashedPassword = hashPassword(password);

  try {
    await usersSchema.create({ email, password: hashedPassword, ...data });

    sendSuccessResponse({ res, data: "User created successfully" });
  } catch (err) {
    sendFailResponse({ res, err, statusCode: 400 });
  }
};

export default signUp;
