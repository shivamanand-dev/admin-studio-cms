export const app_routes = {
  login: "/login",
  signup: "/signup",
  profile: "/profile",
  staticPage: "/staticPageData",
};

export const lockedRoutes = [
  app_routes.profile,
  `/${app_routes.profile}/[pid]`,
  `/${app_routes.staticPage}/[pid]`,
];
