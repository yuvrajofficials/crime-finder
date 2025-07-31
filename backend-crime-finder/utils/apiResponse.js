class APIResponse {
  constructor(success, message, data = null) {
    this.success = success;
    this.message = message;
    if (data !== null) {
      this.data = data;
    }
  }

  static success(message, data = null) {
    return new APIResponse(true, message, data);
  }

  static fail(message, data = null) {
    return new APIResponse(false, message, data);
  }
}

export default APIResponse;
