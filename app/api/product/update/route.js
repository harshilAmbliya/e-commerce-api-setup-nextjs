import { connectDb } from "@/config/db"
import { errorHelper } from "@/helpers/errorHelper"
import { ProductModel } from "@/models/productSchema"
import { NextResponse } from "next/server"

connectDb()

export const PUT = async (req) => {
  try {
    const { id, name, description, price } = await req.json()
    if ((!id || !name || !description, !price)) {
      errorHelper({ message: "Invalid Credentials", statusCode: 402 })
    }

    const updatedProduct = await ProductModel.updateOne(
      { _id: id },
      { $set: { name, description, price } }
    )

    return NextResponse.json(updatedProduct, { status: 200 })
  } catch (error) {
    return NextResponse.json(error.message, { status: 402 })
  }
}
