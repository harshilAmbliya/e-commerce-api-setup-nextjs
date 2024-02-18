import { createSlice } from "@reduxjs/toolkit"
import { fetchUsers } from "../actions/userAction"

const initialState = {
  value: 0,
}

export const userSlices = createSlice({
  name: "user",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.fulfilled, (state, action) => {
      debugger
      return action.payload.data
    })
    builder.addCase(fetchUsers.rejected, (state, action) => {
      console.log(action.payload)
    })
  },
})

// Action creators are generated for each case reducer function

export default userSlices.reducer
