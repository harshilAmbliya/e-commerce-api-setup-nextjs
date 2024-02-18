import { errorHelper } from "@/helpers/errorHelper"
import { ProductModel } from "@/models/productSchema"
import { NextResponse } from "next/server"
import { connectDb } from "@/config/db"
import { headers } from "next/headers"
import { AuthServices } from "@/helpers/authHelpers"

await connectDb()

export const GET = async (req) => {
  try {
    AuthServices(req)
    const Products = await ProductModel.find()
    if (!Products) {
      errorHelper({ message: "No Product  found", statusCode: 402 })
    }
    return NextResponse.json(
      { Products, totalRecords: Products.length },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(error.message, { status: 402 })
  }
}
export const POST = async (req) => {
  try {
    const { name, price, description } = await req.json()
    if (!name || !price || !description) {
      errorHelper({ message: "Invalid Credentials", statusCode: 402 })
    }

    const newProduct = await ProductModel.create({
      name,
      price,
      description,
    })

    return NextResponse.json(newProduct, { status: 201 })
  } catch (error) {
    return NextResponse.json(error.message, { status: 402 })
  }
}
