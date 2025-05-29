export function authorizeUser(req, res, next) {
  if (global.user) {
    next();
  } else {
    next({
      status: 403,
      message: "You must be logged in to access this route",
    });
  }
}
