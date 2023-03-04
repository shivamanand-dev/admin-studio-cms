const { fetchWrapper } = require("./fetchWrapper");

export const staticPageServices = { fetchPageData };

async function fetchPageData() {
  return await fetchWrapper.get(
    "/staticData/",
    "b9b2886bbb7d99c5193b4a749d044634"
  );
}
