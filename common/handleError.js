const { response } = require("express");

class HttpStatus {
  HTTP_OK(res = response, value) {
    const status_code = 200;
    res.status(status_code);
    res.json(value);
  }

  HTTP_ERROR_INTERNAL(err, message = "An internal server error occurred", res) {
    const status_code = 500;
    console.log(err);
    res.status(status_code);
    res.json({ error: err, message });
  }

  HTTP_CREATE(res = response, value) {
    const status_code = 201;
    res.status(status_code);
    res.json(value);
  }

  HTTP_BAD_REQUEST(res, message = "incorrect request, check your data") {
    const status_code = 400;
    res.status(status_code);
    res.json({ message });
  }

  HTTP_NOT_FOUND(res, message = "Not Found") {
    const status_code = 404;
    res.status(status_code);
    res.json({ message });
  }
}

module.exports = new HttpStatus();


