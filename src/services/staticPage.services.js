import { userService } from "./user.services";

const { fetchWrapper } = require("./fetchWrapper");

export const staticPageServices = { fetchPageData };

async function fetchPageData() {
  const key = await userService.getApiKey();

  return await fetchWrapper.get("/staticData/", key.key);
}
