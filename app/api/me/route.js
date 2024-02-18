import { AuthServices } from "@/helpers/authHelpers"
import { NextResponse } from "next/server"
import { cookies } from "next/headers"

export const GET = async (req) => {
  try {
    AuthServices(req)

    const me = cookies().get("auth")
    return NextResponse.json(me, { status: 200 })
  } catch (error) {
    return NextResponse.json(error.message, { status: 402 })
  }
}
