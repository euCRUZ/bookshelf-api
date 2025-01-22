import IncorrectReq from "./IncorrectReq.js"

class ValidationError extends IncorrectReq {
  constructor(error) {
    const errorMessages = error && error.errors
      ? Object.values(error.errors)
          .map((error) => error.message)
          .join("; ")
      : "Unknown error"

    super(`The following errors were found: ${errorMessages}`)
  }
}

export default ValidationError