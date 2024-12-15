import { body, check, validationResult } from "express-validator";

export const bookValidationRules = () => [
  check("name").exists().withMessage("Book name must be exists"),
  body("name")
    .isLength({ min: 1, max: 255 })
    .withMessage("Book name must be between 3 and 255 characters"),
];

export const validateBook = (req: any, res: any, next: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
