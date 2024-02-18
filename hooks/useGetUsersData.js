"use client"
import { fetchUsers } from "@/store/actions/userAction"
import React, { useEffect, useState } from "react"
import { useSelector, useDispatch } from "react-redux"
const GetUsersData = () => {
  const [data, setData] = useState([])
  const { user } = useSelector((state) => state)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(
      fetchUsers({
        data: {
          email: "harshil@gmail.com",
          password: "123456",
        },
      })
    )
  }, [])

  useEffect(() => {
    setData(user)
  }, [user])

  console.log("data", data)

  return (
    <>
      <h1>User List</h1>
    </>
  )
}

export default GetUsersData
