/* eslint-disable sonarjs/no-duplicate-string */
import { backendUri } from "@/utils/constants/app_config";

import { userService } from "./user.services";

export const fetchWrapper = {
  post,
  get,
  put,
  handleResponse,
};

const getCombinedUrl = (url) => backendUri + url;

async function post(url, body) {
  const requestOption = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    origin: "*",
    body: JSON.stringify(body),
  };
  return await fetch(getCombinedUrl(url), requestOption).then(handleResponse);
}

async function get(url) {
  const requestOption = {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    origin: "*",
  };
  return await fetch(getCombinedUrl(url), requestOption).then(handleResponse);
}

async function put(url, body) {
  const requestOption = {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    origin: "*",
    body: JSON.stringify(body),
  };
  return await fetch(getCombinedUrl(url), requestOption).then(handleResponse);
}

function handleResponse(response) {
  return response.text().then((text) => {
    const data = text && JSON.parse(text);
    if (!response.ok) {
      if ([401].includes(response.status) && userService.userValue) {
        // auto logout if 401 Unauthorized or 403 Forbidden response returned from api
        userService.logout();
      }
      return data;
    }

    return data;
  });
}