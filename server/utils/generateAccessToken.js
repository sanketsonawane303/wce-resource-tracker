import jwt from "jsonwebtoken";
import "../connections/config.js";

const JWT_SECRET = process.env.SECRET_KEY;

// const options = {
//   expiresIn: '24h',
// };

const generateAccessToken = async (payload) => {
  try {
    const token = await jwt.sign(payload, JWT_SECRET); //, options);
    return { error: false, token };
  } catch (error) {
    return { error: true };
  }
};

export default generateAccessToken;
