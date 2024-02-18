import { errorHelper } from "@/helpers/errorHelper"
import { cartModel } from "@/models/cartSchema"
import { NextResponse } from "next/server"

export const DELETE = async (req) => {
  try {
    const { cartId } = await req.json()
    if (!cartId) {
      errorHelper({ message: "Cart ID Not Found", statusCode: 422 })
    }

    const deletedCart = await cartModel.deleteMany({ _id: cartId })

    return NextResponse.json(
      {
        message: "cart deleted successfully",
        status: "success",
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(error.message, { status: 402 })
  }
}
