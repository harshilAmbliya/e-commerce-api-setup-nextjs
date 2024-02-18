import { errorHelper } from "@/helpers/errorHelper"
import { cartModel } from "@/models/cartSchema"
import { NextResponse } from "next/server"

export const PUT = async (req) => {
  try {
    const { cartId, products, numberOfQty } = await req.json()
    if (!cartId || !products) {
      errorHelper({ message: "Cart ID Not Found", statusCode: 422 })
    }

    await cartModel.updateMany(
      { _id: cartId },
      {
        $set: {
          products: [
            {
              products,
            },
          ],
          numberOfQty,
        },
      }
    )

    return NextResponse.json(
      {
        message: "cart updated successfully",
        status: "success",
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(error.message, { status: 402 })
  }
}
