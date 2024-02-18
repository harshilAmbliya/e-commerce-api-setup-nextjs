import { connectDb } from "@/config/db"
import { errorHelper } from "@/helpers/errorHelper"
import { UserModel } from "@/models/userSchema"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"

connectDb()

export const PUT = async (req) => {
  try {
    const { id, userName, email, password } = await req.json()
    if ((!id || !userName || !email, !password)) {
      errorHelper({ message: "Invalid Credentials", statusCode: 402 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const updatedUser = await UserModel.updateOne(
      { _id: id },
      { $set: { userName, email, password: hashedPassword } }
    )

    return NextResponse.json(updatedUser, { status: 200 })
  } catch (error) {
    return NextResponse.json(error.message, { status: 402 })
  }
}
