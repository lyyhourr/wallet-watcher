import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";
import { NextRequest, NextResponse } from "next/server";

export default async function Middelware(req: NextRequest) {
  const res = NextResponse.next();
  const supabase = createMiddlewareClient({ req, res });

  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    return NextResponse.rewrite(new URL("/login", req.url));
  }
  return res;
}

export const config = {
  matcher: ["/dashboard", "/history", "/overview", "/setting", "/user"],
};
