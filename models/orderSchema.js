import mongoose, { Schema } from "mongoose"

const orderSchema = new Schema(
  {
    cart: { type: mongoose.Types.ObjectId, ref: "Cart" },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Delivered"],
      default: "Pending",
    },
  },
  {
    timestamps: true,
  }
)

const OrderModel = mongoose.models.Order || mongoose.model("Order", orderSchema)

export { OrderModel }
