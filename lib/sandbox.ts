import { NextResponse } from "next/server";

/**
 * Redirects to the given path, rewriting the origin to SANDBOX_DOMAIN when configured.
 * Without SANDBOX_DOMAIN the redirect targets the same origin as the incoming request.
 */
export function sandboxRedirect(path: string, requestUrl: string): NextResponse {
  const base = process.env.SANDBOX_DOMAIN ?? new URL(requestUrl).origin;
  return NextResponse.redirect(new URL(path, base));
}
