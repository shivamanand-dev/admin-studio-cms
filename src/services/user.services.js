import Router from "next/router";
import { BehaviorSubject } from "rxjs";

import { fetchWrapper } from "./fetchWrapper";

const userSubject = new BehaviorSubject(
  typeof window !== "undefined" && JSON.parse(localStorage.getItem("user"))
);

export const userService = {
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
  login,
  logout,
  signup,
  updateUserCountry,
  updateProfile,
};

async function login(data) {
  return await fetchWrapper.post("/auth/login", data).then(async (res) => {
    if (res.success) {
      await fetch("/api/login", {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(res.authToken),
      });

      userSubject.next(res.userDetails);
      localStorage.setItem("user", JSON.stringify(res.userDetails));
    }
    return res;
  });
}

async function signup(data) {
  return await fetchWrapper.post("/auth/signup", data).then(async (res) => {
    if (res.success) {
      if (res.success) {
        await fetch("/api/login", {
          method: "post",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(res.authToken),
        });
        userSubject.next(res.userValue);
        localStorage.setItem("user", JSON.stringify(res.userDetails));
      }
      return res;
    }
  });
}

async function logout() {
  userSubject.next({});
  localStorage.clear();
  await fetch("/api/logout");
  return Router.reload();
}

async function updateProfile(data) {
  return await fetchWrapper.put("/profile/update", data).then((res) => {
    userSubject.next(res);
  });
}

async function updateUserCountry(api_key) {
  try {
    if (!userService?.userValue?.country) {
      const country = await fetch(`https://api.ipdata.co/?api-key=${api_key}`, {
        method: "GET",
      }).then((res) => res.json());

      await userService.updateProfile({
        liveCountry: country,
      });
    }
  } catch (error) {
    // eslint-disable-next-line no-console
    console.log({ error });
    return error;
  }
}
