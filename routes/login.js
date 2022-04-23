let User = require("../controllers/userControllers");
const { body, validationResult } = require("express-validator");
const httpStatusCodes = require("../common/httpCodes");

app.post("/", body("email").isEmail(), body("password").isLength({ min: 1 }), async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      throw new Error("Invalid email or password");
    }

    let user = await User.findUserByEmail(req.body.email);

    if (user === null) {
      throw new Error("User/email not found");
    } else {
      let passwordIsOk = bcrypt.compareSync(req.body.password, user.password);

      if (passwordIsOk) {
        //Si todo está bien

        res.json(user);
      } else {
        throw new Error("Invalid password");
      }
    }
  } catch (error) {
    res.status(httpStatusCodes.NOT_FOUND).send({ ok: false });
  }
});
