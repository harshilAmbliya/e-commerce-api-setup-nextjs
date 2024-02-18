import { headers } from "next/headers"
import { verify } from "jsonwebtoken"
export const AuthServices = async (req) => {
  const token = headers().get("Authorization")
  const decodeToken = token?.split(" ")[1]
  const data = verify(decodeToken, process.env.SECRET_KEY)
  req.user = data
  return token
}
