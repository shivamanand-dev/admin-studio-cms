import { rsa_secretKey } from "@/utils/constants/app_config";

const CryptoJS = require("crypto-js");

export const encrypt = (data) => {
  return CryptoJS.AES.encrypt(data, rsa_secretKey).toString();
};

export const encryptAll = (data) => {
  const entries = Object.entries(data);

  const encryptedData = entries.map((e) => {
    let arr = e;
    const value = encrypt(arr.pop());
    arr.push(value);
    return arr;
  });

  return Object.fromEntries(encryptedData);
};
