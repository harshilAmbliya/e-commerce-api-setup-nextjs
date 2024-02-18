import { connectDb } from "@/config/db"
import { errorHelper } from "@/helpers/errorHelper"
import { UserModel } from "@/models/userSchema"
import { NextResponse } from "next/server"

await connectDb()

export const GET = async (req, { params }) => {
  const id = params.id
  try {
    const user = await UserModel.findById(id)
    if (!user) {
      errorHelper({ message: "No user found", statusCode: 402 })
    }
    return NextResponse.json(user, { status: 200 })
  } catch (error) {
    return NextResponse.json(error, { status: 402 })
  }
}
