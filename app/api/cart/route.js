import { errorHelper } from "@/helpers/errorHelper"
import { cartModel } from "@/models/cartSchema"
import { NextResponse } from "next/server"
import { connectDb } from "@/config/db"
import { AuthServices } from "@/helpers/authHelpers"
import mongoose from "mongoose"

await connectDb()

export const GET = async (req) => {
  try {
    AuthServices(req)
    const userId = new mongoose.Types.ObjectId(req.user._id)
    const populate = [{ path: "user" }, { path: "products.product" }]
    const filter = { user: userId, status: { $ne: "Ordered" } }
    const Cart = await cartModel.findOne(filter).populate(populate).lean()

    if (!Cart) {
      return NextResponse.json(
        {
          cart: null,
        },
        { status: 200 }
      )
    }
    return NextResponse.json(
      { Cart, totalRecords: Cart.length },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(error.message, { status: 402 })
  }
}

export const POST = async (req) => {
  try {
    AuthServices(req)
    const { product, numberOfQty } = await req.json()
    if (!product || !numberOfQty) {
      errorHelper({ message: "Cart Items Or Users Not Found", statusCode: 422 })
    }
    const Cart = await cartModel.findOne({ user: req.user._id })
    let productsInCart = Cart?.products ?? []
    productsInCart.push({ product, numberOfQty })
    console.log("productsInCart", productsInCart)
    const newCart = await cartModel.create({
      products: productsInCart,
      user: req.user._id,
    })

    return NextResponse.json(newCart, { status: 201 })
  } catch (error) {
    return NextResponse.json(error.message, { status: 402 })
  }
}
