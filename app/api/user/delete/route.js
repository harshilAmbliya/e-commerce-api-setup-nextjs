import { connectDb } from "@/config/db"
import { errorHelper } from "@/helpers/errorHelper"
import { UserModel } from "@/models/userSchema"
import { NextResponse } from "next/server"

await connectDb()

export const DELETE = async (req) => {
  const { id } = await req.json()
  try {
    const user = await UserModel.findById(id)
    if (!user) {
      errorHelper({ message: "No user found", statusCode: 402 })
    }
    await UserModel.deleteMany({ _id: id })
    return NextResponse.json(
      { message: "user deleted successfully..", status: "success" },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(error, { status: 402 })
  }
}
