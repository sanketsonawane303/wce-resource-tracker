import CryptoJS from "crypto-js";
// import generator from 'generate-password';

export const hashPassword = (password) => {
  const hashKey = process.env.HASH_KEY;
  return CryptoJS.SHA512(password + hashKey).toString();
};

// export const generateHashedPassword = (password) => {
//   let generatedPassword = password
//     ? [password]
//     : generator.generateMultiple(1, {
//         length: 10,
//         uppercase: true,
//         numbers: true,
//       });

//   console.log(password, generatedPassword);

//   let cipher = CryptoJS.AES.encrypt(
//     generatedPassword[0].toString(),
//     process.env.CRYPTO_JS_KEY
//   );
//   let hashedPassword = cipher.toString();

//   return hashedPassword;
// };

// export const decryptPassword = (password) => {
//   let decryptedPassword = CryptoJS.AES.decrypt(
//     password,
//     process.env.CRYPTO_JS_KEY
//   );
//   decryptedPassword = decryptedPassword.toString(CryptoJS.enc.Utf8);
//   return decryptedPassword;
// };
