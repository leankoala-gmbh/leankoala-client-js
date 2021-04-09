class BadRequestError extends Error {
  constructor(errorData) {
    super(errorData.message)
    this.url = errorData.url
    this.data = errorData.data

    if(errorData.identifier) {
      this.identifier = errorData.identifier
    }
  }
}

module.exports = BadRequestError
