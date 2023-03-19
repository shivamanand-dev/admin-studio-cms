import { userService } from "./user.services";

const { fetchWrapper } = require("./fetchWrapper");

export const staticPageServices = { fetchPageData, updateData };

async function fetchPageData() {
  const key = await userService.getApiKey();

  return await fetchWrapper.get("/staticData/", key.key);
}
async function updateData(id, body) {
  // const data = fetchWrapper.put(`/staticData/saveData/${id}`, body);

  console.log(id);
  // return data;
}
