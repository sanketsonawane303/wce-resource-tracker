import { sendFailResponse } from "../utils/responses.js";

const role = (roles) => {
  return (req, res, next) => {
    if (req.user.role.some((role) => roles.includes(role))) next();
    else
      sendFailResponse({
        res,
        statusCode: 403,
        err: "You are not allowed to access this resource",
      });
  };
};

export default role;
