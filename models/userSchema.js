import mongoose, { Schema } from "mongoose"

const userSchema = new Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  },
  {
    timestamps: true,
  }
)

userSchema.pre("save", async function (next) {
  try {
    const userExist = await UserModel.findOne({
      email: this.email,
    })
    if (userExist) {
      if (userExist._id.toString() !== this._id.toString()) {
        const error = new Error("This user is already Registered.")
        error.statusCode = 422
        throw error
      }
    }
    next()
  } catch (error) {
    return next(error)
  }
})

const UserModel = mongoose.models.User || mongoose.model("User", userSchema)

export { UserModel }
