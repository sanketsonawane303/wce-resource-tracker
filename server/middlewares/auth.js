import jwt from "jsonwebtoken";
import usersSchema from "../models/users.js";
import { sendFailResponse } from "../utils/responses.js";

// async function validateToken(req, res, next) {
//   const auhorizationHeader = req.headers.authorization;
//   let result;

//   if (!auhorizationHeader) {
//     return sendFailResponse({
//       statusCode: 401,
//       err: 'Access token is missing',
//     });
//   }

//   const token = req.headers.authorization.split(' ')[1];

//   const options = {
//     expiresIn: '24h',
//   };

//   try {
//     let user = await usersSchema.findOne({
//       access_token: token,
//     });

//     if (!user) {
//       return sendFailResponse({
//         err: 'Authorization Error',
//       });
//     }

//     result = jwt.verify(token, process.env.SECRET_KEY, options);

//     if (!user.username === result.username) {
//       return sendFailResponse({
//         err: 'Invalid Token',
//       });
//     }
//     req.user = result;
//     next();
//   } catch (error) {
//     console.error(error);

//     if (error.name === 'TokenExpiredError') {
//       return res.status(403).json({
//         error: true,
//         message: 'Token expired',
//       });
//     }

//     return res.status(403).json({
//       error: true,
//       message: 'Authentication error',
//     });
//   }
// }

const JWT_SECRET = process.env.SECRET_KEY;

const auth = async (req, res, next) => {
  const token = req.header("x-auth-token");
  if (!token)
    return sendFailResponse({
      res,
      statusCode: 401,
      err: "Auth token not provided",
    });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded;

    next();
  } catch (err) {
    sendFailResponse({ res, statusCode: 400, err: "Invalid auth token" });
  }
};

export default auth;
