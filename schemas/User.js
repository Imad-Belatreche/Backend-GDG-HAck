import { model, Schema } from "mongoose";
import Joi from 'joi';

export const UserSchema = new Schema({
  name: {
    type: String,
    trim: true,
    required: true,
    minlength: 3,
    maxlength: 50
  },
  role: {
    type: String,
    enum: ['admin', 'student', 'professor', 'alumni'],
    trim: true,
    required: true,
    default: 'guest'
  },
  email: {
    type: String,
    trim: true,
    required: true,
    unique: true
  },
  password: {
    type: String,
    trim: true,
    required: true,
    minlength: 6
  },
  university: {
    type: String,
    trim: true,
    required: true,
    minlength: 6
  },
  major: {
    type: String,
    trim: true,
    required: true,
    minlength: 4
  },
  skills: {
    type: [String],
    required: false,
    default: []
  },
  interests: {
    type: [String],
    required: false,
    default: []    
  },
  fypPosts: {
    type: [Schema.Types.ObjectId],
    ref: 'Fyp',
    required: false,
    default: []
  },
  internshipPosts: {
    type: [Schema.Types.ObjectId],
    ref: 'Internship',
    required: false,
    default: []
  },
  scholarshipPosts: {
    type: [Schema.Types.ObjectId],
    ref: 'Scholarship',
    required: false,
    default: []
  }
}, { timestamps: true });

export const User = model('User', UserSchema);

export const validateLoginUser = (obj) => {
  const schema = Joi.object({
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().min(6).required()
  });
  return schema.validate(obj);
}

const role = ['admin', 'student', 'professor', 'alumni'];

export const validateRegisterUser = (obj) => {
  const schema = Joi.object({
    name: Joi.string().trim().min(3).max(50).required(),
    email: Joi.string().trim().email().required(),
    password: Joi.string().trim().min(6).required(),
    role: Joi.string().valid(...role).required(),
    university: Joi.string().trim().min(6).required(),
    major: Joi.string().trim().min(4).required()
  });
  return schema.validate(obj);
}

export const validateUpdateUser = (obj) => {
  const schema = Joi.object({
    name: Joi.string().trim().min(3).max(50),
    email: Joi.string().trim().email(),
    password: Joi.string().trim().min(6),
    role: Joi.string().valid(...role),
    university: Joi.string().trim().min(6),
    major: Joi.string().trim().min(4)
  })
  return schema.validate(obj);
}

export const validateForgotPasswordUser = (obj) => {
  const schema = Joi.object({
    email: Joi.string().trim().email().required(),
  });
  return schema.validate(obj);
}

export const validateResetPasswordUser = (obj) => {
  const schema = Joi.object({
    password: Joi.string().trim().min(6).required(),
  })
  return schema.validate(obj);
}
