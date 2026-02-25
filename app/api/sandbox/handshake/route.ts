import { cookies, draftMode } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { sandboxRedirect } from "@/lib/sandbox";

export const GET = async (request: NextRequest) => {
  if (!process.env.UNIFORM_PREVIEW_SECRET) {
    return NextResponse.json(
      { error: "UNIFORM_PREVIEW_SECRET is not configured" },
      { status: 500 }
    );
  }

  const secret = request.nextUrl.searchParams.get("secret");

  if (secret !== process.env.UNIFORM_PREVIEW_SECRET) {
    return NextResponse.json({ error: "Invalid secret" }, { status: 401 });
  }

  const draft = await draftMode();
  draft.enable();

  // retrieve the cookie store because we need to rewrite sameSite to none
  const cookieStore = await cookies();

  // get the draft mode cookie that was just set
  const draftCookie = cookieStore.get("__prerender_bypass");

  // extract the cookie value and set it again with sameSite set to none
  // https://github.com/vercel/next.js/issues/49927
  if (draftCookie?.value) {
    cookieStore.set({
      name: "__prerender_bypass",
      value: draftCookie.value,
      httpOnly: true,
      path: "/",
      secure: true,
      sameSite: "none", // Allow cookie in cross-origin iframes
    });
  }

  return sandboxRedirect("/", request.url);
};
