import { NextRequest, NextResponse } from "next/server";

export default function Middelware(request: NextRequest) {
  const response = NextResponse.next();
  const isLogged = true;

  if (!isLogged) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  return response;
}

export const config = {
  matcher: ["/dashboard"],
};
