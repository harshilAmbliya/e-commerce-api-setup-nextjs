import { errorHelper } from "@/helpers/errorHelper"
import { OrderModel } from "@/models/orderSchema"
import { NextResponse } from "next/server"
import { connectDb } from "@/config/db"
import { cartModel } from "@/models/cartSchema"

await connectDb()
export const GET = async () => {
  try {
    const Orders = await OrderModel.find().populate(["user", "products"])
    if (!Orders) {
      errorHelper({ message: "No Order  found", statusCode: 402 })
    }
    return NextResponse.json(
      { Orders, totalRecords: Orders.length },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(error.message, { status: 402 })
  }
}
export const POST = async (req) => {
  try {
    const { cartId } = await req.json()
    if (!cartId) {
      errorHelper({ message: "Cart ID Not Found", statusCode: 422 })
    }

    const newOrder = await OrderModel.create({
      cartId,
    })

    if (newOrder) {
      await cartModel.findByIdAndUpdate(cartId, { status: "Ordered" })
    }

    return NextResponse.json(newOrder, { status: 201 })
  } catch (error) {
    return NextResponse.json(error.message, { status: 402 })
  }
}
