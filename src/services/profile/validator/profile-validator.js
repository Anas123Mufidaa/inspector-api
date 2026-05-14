import Joi from 'joi';
import { InvariantError } from '../../../exceptions/index.js';

const updateProfileSchema = Joi.object({
  name: Joi.string().min(2).max(100).required().messages({
    'string.min':   'Nama minimal 2 karakter',
    'string.max':   'Nama maksimal 100 karakter',
    'any.required': 'Nama wajib diisi',
  }),
});

export const validateUpdateProfile = (req, _res, next) => {
  const { error, value } = updateProfileSchema.validate(req.body);
  if (error) return next(new InvariantError(error.details[0].message));
  req.validated = value;
  return next();
};