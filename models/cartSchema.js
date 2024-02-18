import mongoose, { Schema } from "mongoose"

// const productSchema = new Schema()

// const cartSchema = new Schema(
//   {
//     user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
//     products: [
//       {
//         product: {
//           type: mongoose.Types.ObjectId,
//           ref: "Product",
//           required: true,
//         },
//         numberOfQty: { type: Number, default: 1 },
//       },
//     ],
//     status: {
//       type: String,
//       enum: ["Ordered", "Pending"],
//       default: "Pending",
//     },
//     // totalAmount: { type: Number, required: true },
//   },
//   {
//     timestamps: true,
//   }
// )

const cartSchema = new Schema(
  {
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    products: [
      {
        product: {
          type: mongoose.Types.ObjectId,
          ref: "Product",
          required: true,
        },
        numberOfQty: { type: Number, default: 1 },
      },
    ],
    status: {
      type: String,
      enum: ["Ordered", "Pending"],
      default: "Pending",
    },
    // totalAmount: { type: Number, required: true },
  },
  {
    timestamps: true,
  }
)

const cartModel = mongoose.models.Cart || mongoose.model("Cart", cartSchema)

export { cartModel }
