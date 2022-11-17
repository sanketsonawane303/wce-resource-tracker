import { sendFailResponse } from "../utils/responses.js";

const role = (roles) => {
  return (req, res, next) => {
    if (roles.includes(req.user.role)) next();
    else
      sendFailResponse({
        res,
        statusCode: 403,
        err: "You are not allowed to access this resource",
      });
  };
};

export default role;
