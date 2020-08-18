class BadRequestError extends Error {
  constructor(errorData) {
    super(errorData.message)
    this.url = errorData.url
    this.data = errorData.data
  }
}

module.exports = BadRequestError
