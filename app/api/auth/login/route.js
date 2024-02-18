import { errorHelper } from "@/helpers/errorHelper"
import { UserModel } from "@/models/userSchema"
import { NextResponse } from "next/server"
import { sign } from "jsonwebtoken"
import bcrypt from "bcrypt"
import { cookies } from "next/headers"
import { connectDb } from "@/config/db"

connectDb()
export const POST = async (req, res) => {
  try {
    const { email, password } = await req.json()

    const user = await UserModel.findOne({ email })

    if (!user) {
      errorHelper({ message: "User Not Found" })
    }

    const isPasswordMatch = await bcrypt.compare(password, user.password)

    if (!isPasswordMatch) {
      errorHelper({ statusCode: 401, message: "Invalid Password" })
    }

    const token = sign({ email, _id: user._id }, process.env.SECRET_KEY)
    const cookieStore = cookies()
    cookieStore.set("auth", token)
    return NextResponse.json({ token, user }, { status: 200 })
  } catch (error) {
    return NextResponse.json(error, { status: 402 })
  }
}
