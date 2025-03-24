import { body } from 'express-validator';

export const validateSignUp = [
  body('userName')
    .exists().withMessage('Nome de usuário é obrigatório')
    .bail()
    .isString().withMessage('Nome de usuário deve ser uma string')
    .notEmpty().withMessage('Nome de usuário não pode estar vazio')
    .isLength({ min: 5 }).withMessage('Nome de usuário deve ter pelo menos 5 caracteres'),

  body('email')
    .exists().withMessage('E-mail é obrigatório')
    .bail()
    .isEmail().withMessage('E-mail inválido')
    .notEmpty().withMessage('E-mail não pode estar vazio')
    .isLength({ min: 5 }).withMessage('E-mail deve ter pelo menos 5 caracteres'),

  body('password')
    .exists().withMessage('Senha é obrigatória')
    .bail()
    .isString().withMessage('Senha deve ser uma string')
    .notEmpty().withMessage('Senha não pode estar vazia')
    .isLength({ min: 6 }).withMessage('Senha deve ter pelo menos 6 caracteres'),
];

export const validateSignIn = 
  [
    body('email')
      .exists().withMessage('E-mail é obrigatório')
      .bail()
      .isEmail().withMessage('E-mail inválido')
      .notEmpty().withMessage('E-mail não pode estar vazio'),

    body('password')
      .exists().withMessage('Senha é obrigatória')
      .bail()
      .isString().withMessage('Senha deve ser uma string')
      .notEmpty().withMessage('Senha não pode estar vazia'),
  ];

export const validateAddFavorites = [
  body('characterId')
    .exists().withMessage('characterId é obrigatório')
    .bail()
    .isNumeric().withMessage('characterId deve ser um número')
    .notEmpty().withMessage('characterId não pode estar vazio'),
];