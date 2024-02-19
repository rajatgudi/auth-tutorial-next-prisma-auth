/**
 * Array of routes that are accisble to public users
 * These routes do not require authentication
 * @type {string[]}
 */
export const publicRoutes = ["/", "/auth/new-verification"];
/**
 * Array of routes that are accisble to authenticated users
 * These routes requires authentication
 * @type {string[]}
 */
export const authRoutes = ["/auth/login", "/auth/register", "/auth/error"];

//prefix for API authentication routes
//routes that start with this prefix is used for API authentication
export const apiAuthPrefix = "/api/auth";

//default redirect path after login
export const DEFAULT_LOGIN_REDIRECT = "/settings";
