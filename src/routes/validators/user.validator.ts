import { body, check, validationResult } from "express-validator";

export const userValidationRules = () => [
  check("name").exists().withMessage("Name must be exists"),
  body("name")
    .isLength({ min: 3, max: 100 })
    .withMessage("Name must be between 3 and 100 characters"),
];

export const validateUser = (req: any, res: any, next: any) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }
  next();
};
