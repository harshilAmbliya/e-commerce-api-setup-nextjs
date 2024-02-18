import { connectDb } from "@/config/db"
import { errorHelper } from "@/helpers/errorHelper"
import { ProductModel } from "@/models/productSchema"
import { NextResponse } from "next/server"

await connectDb()

export const GET = async (req, { params }) => {
  const id = params.id
  try {
    const Product = await ProductModel.findById(id)
    if (!Product) {
      errorHelper({ message: "No Product found", statusCode: 402 })
    }
    return NextResponse.json(Product, { status: 200 })
  } catch (error) {
    return NextResponse.json(error, { status: 402 })
  }
}
