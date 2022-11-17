import usersSchema from "../../models/users.js";
import {
  sendFailResponse,
  sendSuccessResponse,
} from "../../utils/responses.js";
import { hashPassword } from "../../utils/passwords.js";
import generateAccessToken from "../../utils/generateAccessToken.js";

// const signIn = async (req, res) => {
//   const { email, password } = req.body;

//   try {
//     const user = await usersSchema.findOne({ email: email });

//     if (!user || user == null) {
//       sendFailResponse({
//         res,
//         err: "User Not Found",
//         code: 404,
//       });
//       return null;
//     }

//     const p = user.password;
//     const token = generateAccessToken(user.email);
//     if (generateHashedPassword(password) == p) {
//       sendSuccessResponse({
//         res,
//         data: token,
//       });
//     } else {
//       sendFailResponse({
//         res,
//         err: "Invalid Credentials",
//       });
//     }
//   } catch (error) {
//     sendFailResponse({
//       res,
//       err: "Internal Error",
//     });
//   }
// };

const signIn = async (req, res) => {
  const { email, password } = req.body;

  const user = await usersSchema.findOne({ email });
  if (!user)
    return sendFailResponse({
      res,
      statusCode: 400,
      err: "Invalid email or password",
    });

  const hashedPassword = hashPassword(password);
  if (hashedPassword !== user.password)
    return sendFailResponse({
      res,
      statusCode: 400,
      err: "Invalid email or password",
    });

  const token = await generateAccessToken({ email, role: user.role });
  sendSuccessResponse({ res, data: token });
};

export default signIn;
