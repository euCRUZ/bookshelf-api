import IncorrectReq from "./IncorrectReq.js"

class ValidationError extends IncorrectReq {
  constructor(error) {
    const errorMessages = Object.values(error.errors)
      .map((error) => error.message)
      .join("; ")

    super(`The following errors were found: ${errorMessages}`)
  }
}

export default ValidationError
