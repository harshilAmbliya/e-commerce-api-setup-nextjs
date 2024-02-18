import mongoose from "mongoose"

const MONGODB_URI = process.env.MONGODB_URI

export const connectDb = async () => {
  const db = await mongoose
    .connect(MONGODB_URI)
    .then((res) => console.log("MONGODB CONNECTED SUCCESSFULLY"))
    .catch((err) => console.log(err))
  return db
}
