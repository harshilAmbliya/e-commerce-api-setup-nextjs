import { errorHelper } from "@/helpers/errorHelper"
import { UserModel } from "@/models/userSchema"
import { NextResponse } from "next/server"
import bcrypt from "bcrypt"
import { connectDb } from "@/config/db"

await connectDb()
export const GET = async () => {
  try {
    const users = await UserModel.find()
    if (!users) {
      errorHelper({ message: "No user  found", statusCode: 402 })
    }
    return NextResponse.json(
      { users, totalRecords: users.length },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(error.message, { status: 402 })
  }
}
export const POST = async (req) => {
  try {
    const { userName, email, password } = await req.json()
    if (!userName || !email || !password) {
      errorHelper({ message: "Invalid Credentials", statusCode: 402 })
    }

    const hashedPassword = await bcrypt.hash(password, 10)
    const newUser = await UserModel.create({
      userName,
      email,
      password: hashedPassword,
    })

    return NextResponse.json(newUser, { status: 201 })
  } catch (error) {
    return NextResponse.json(error.message, { status: 402 })
  }
}
