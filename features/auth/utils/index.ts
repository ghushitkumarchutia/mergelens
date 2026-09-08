export const SIGN_IN_PATH = "/sign-in";
export const DEFAULT_AUTH_CALLBACK = "/dashboard";

export function getSafeCallbackPath(
  callbackUrl: string | null | undefined,
): string {
  if (
    callbackUrl?.startsWith("/") &&
    !callbackUrl.startsWith("//") &&
    !callbackUrl.startsWith("/\\") &&
    callbackUrl !== SIGN_IN_PATH
  ) {
    return callbackUrl;
  }
  return DEFAULT_AUTH_CALLBACK;
}
