import { body, validationResult } from "express-validator";
import { BadRequestError } from "../errors/customErrors.js";
import User from "../model/User.js";

const withValidationErrors = (validateValues) => {
  return [
    validateValues,
    (req, res, next) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        const errorMessages = errors.array().map((error) => error.msg);
        throw new BadRequestError(errorMessages);
      }
      next();
    },
  ];
};

export const validateRegisterInput = withValidationErrors([
  body("userName")
    .notEmpty()
    .withMessage("Username is required")
    .custom(async (userName) => {
      const user = await User.findOne({ userName });
      if (user) throw new BadRequestError("Username already exists");
    }),
  body("email")
    .notEmpty()
    .withMessage("Email is required")
    .isEmail()
    .withMessage("Invalid email format")
    .custom(async (email) => {
      const user = await User.findOne({ email });
      if (user) throw new BadRequestError("Email already exists");
    }),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .isLength({ min: 8 })
    .withMessage("Password must be at least 8 characters"),
]);

export const validateLoginInput = withValidationErrors([
  body().custom((value, { req }) => {
    if (!req.body.userName && !req.body.email) {
      throw new BadRequestError("Either email or username is required");
    }
    return true;
  }),
  body("password")
    .notEmpty()
    .withMessage("Password is required")
    .custom(async (password, { req }) => {
      const { userName, email } = req.body;
      const user = await User.findOne({
        $or: [userName ? { userName } : {}, email ? { email } : {}],
      });
      if (!user) {
        throw new BadRequestError(`Invalid credentials`);
      }
    }),
]);