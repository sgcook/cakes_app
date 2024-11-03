import { body } from 'express-validator'

export const cakeValidator = [
  body('name',)
    .notEmpty()
    .withMessage('Name must not be empty.'),
  body('comment')
    .notEmpty()
    .withMessage('Comment must not be empty.')
    .isLength({ min: 5, max: 200 })
    .withMessage('Comment must be between 5 and 200 characters.'),
  body('imageUrl')
    .notEmpty()
    .withMessage('ImageUrl must not be empty.'),
  body('yumFactor')
    .notEmpty()
    .withMessage('Yum factor must not be empty.'),
]
