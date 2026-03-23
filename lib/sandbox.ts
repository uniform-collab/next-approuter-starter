import { IN_CONTEXT_EDITOR_QUERY_STRING_PARAM } from "@uniformdev/canvas";
import { NextResponse } from "next/server";

/**
 * Redirects to the given path, rewriting the origin to SANDBOX_DOMAIN when configured.
 * Without SANDBOX_DOMAIN the redirect targets the same origin as the incoming request.
 */
export function sandboxRedirect(
  path: string,
  requestUrl: string
): NextResponse {
  const base = process.env.SANDBOX_DOMAIN ?? new URL(requestUrl).origin;
  const url = new URL(path, base);
  url.searchParams.set(IN_CONTEXT_EDITOR_QUERY_STRING_PARAM, "true");
  return NextResponse.redirect(url);
}
