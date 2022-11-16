import jwt from "jsonwebtoken";
import "../connections/config.js";
import usersSchema from "../models/users.js";
import { sendFailResponse } from "../utils/responses.js";

async function validateToken(req, res, next) {
  const auhorizationHeader = req.headers.authorization;
  let result;

  if (!auhorizationHeader) {
    return sendFailResponse({
      statusCode: 401,
      err: "Access token is missing",
    });
  }

  const token = req.headers.authorization.split(" ")[1];

  const options = {
    expiresIn: "24h",
  };

  try {
    let user = await usersSchema.findOne({
      access_token: token,
    });

    if (!user) {
      return sendFailResponse({
        err: "Authorization Error",
      });
    }

    result = jwt.verify(token, process.env.SECRET_KEY, options);

    if (!user.username === result.username) {
      return sendFailResponse({
        err: "Invalid Token",
      });
    }
    req.decoded = result;
    next();
  } catch (error) {
    console.error(error);

    if (error.name === "TokenExpiredError") {
      return res.status(403).json({
        error: true,
        message: "Token expired",
      });
    }

    return res.status(403).json({
      error: true,
      message: "Authentication error",
    });
  }
}

export default validateToken;
