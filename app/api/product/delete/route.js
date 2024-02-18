import { connectDb } from "@/config/db"
import { errorHelper } from "@/helpers/errorHelper"
import { ProductModel } from "@/models/productSchema"
import { NextResponse } from "next/server"

await connectDb()

export const DELETE = async (req) => {
  const { id } = await req.json()
  try {
    const Product = await ProductModel.findById(id)
    if (!Product) {
      errorHelper({ message: "No Product found", statusCode: 402 })
    }
    await ProductModel.deleteMany({ _id: id })
    return NextResponse.json(
      { message: "Product deleted successfully..", status: "success" },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(error, { status: 402 })
  }
}
