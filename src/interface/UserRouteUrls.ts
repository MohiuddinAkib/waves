enum UserRouteUrls {
  loginUrl = "/login",
  loginRouteName = "users:login",

  registerUrl = "/register",
  registerRouteName = "users:register",

  refreshTokenUrl = "/refresh-token",
  refreshTokenRouteName = "users:refresh-token",
  revokeRefreshTokenUrl = "/revoke-refresh-token",
  revokeRefreshTokenRouteName = "users:revoke-refresh-token",

  authUrl = "/auth",
  authRouteName = "users:auth",

  logoutUrl = "/logout",
  logoutRouteName = "users:logout"
}

export default UserRouteUrls;
