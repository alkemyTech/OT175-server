const { response } = require("express");

class HttpStatus {
  HTTP_OK(res = response, value) {
    const status_code = 201;
    res.status(status_code);
    res.json(value);
  }

  HTTP_ERROR_INTERNAL(err, res) {
    const status_code = 500;
    console.log(err);
    res.status(status_code);
    res.json({ error: err, message: "An internal server error occurred" });
  }

  HTTP_CREATE(res = response, value) {
    const status_code= 201;
    res.status(status_code);
    res.json(value);
  }

  HTTP_BAD_REQUEST(res) {
    const status_code = 400;
    res.status(status_code);
    res.json({ message: "incorrect request, check your data" });
  }

  HTTP_NOT_FOUND(res) {
    const status_code = 404;
    res.status(status_code);
    res.json({ message: "Not Found, unregistered ID" });
  }
}

module.exports = new HttpStatus();
