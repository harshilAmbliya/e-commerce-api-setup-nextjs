import { createAsyncThunk } from "@reduxjs/toolkit"
import axios from "axios"

export const fetchUsers = createAsyncThunk(
  "user/fetchUsers",
  async (payload, { dispatch }) => {
    debugger
    const { data } = payload
    const response = await axios.post("/api/auth/login", {
      email: data.email,
      password: data.password,
    })

    return response
  }
)
