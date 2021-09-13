module.exports = class HttpResponse {
  constructor(code = 'unknown_error', httpCode = 400, message = "Bad Request", data = null) {
    this.code = code;
    this.httpCode = httpCode;
    this.message = message;
    this.data = data;
  }
};
