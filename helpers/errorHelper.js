export const errorHelper = ({ message, statusCode }) => {
  const error = new Error()
  error.message = message
  error.statusCode = statusCode

  throw error
}
