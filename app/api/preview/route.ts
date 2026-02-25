import {
  createPreviewGETRouteHandler,
  createPreviewPOSTRouteHandler,
  createPreviewOPTIONSRouteHandler,
} from "@uniformdev/next-app-router/handler";
import { NextRequest, NextResponse } from "next/server";
import { sandboxRedirect } from "@/lib/sandbox";

export const GET = async (request: NextRequest) => {
  const result = await createPreviewGETRouteHandler()(request);

  if (!result) {
    return new NextResponse(null, { status: 500 });
  }

  if (result.status === 307 && process.env.SANDBOX_DOMAIN) {
    const location = result.headers.get("location");
    const original = new URL(location ?? "/", request.url);
    return sandboxRedirect(
      original.pathname + original.search + original.hash,
      request.url
    );
  }

  return result;
};

export const POST = createPreviewPOSTRouteHandler();
export const OPTIONS = createPreviewOPTIONSRouteHandler();
