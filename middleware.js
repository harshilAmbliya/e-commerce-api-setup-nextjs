import { NextResponse } from "next/server"
import { headers } from "next/headers"
import { AuthServices } from "./helpers/authHelpers"

export async function middleware(request) {
  return NextResponse.next()
}

export const config = {
  matcher: "/((?!api|_next/static|_next/image|favicon.ico).*)",
}
