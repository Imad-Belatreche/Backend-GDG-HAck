import { model, Schema } from "mongoose";
import Joi from 'joi';

export const InternshipSchema = new Schema({
  publisher: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    default: ""
  },
  title: {
    type: String,
    trim: true,
    minlength: 5,
    maxlength: 20,
    required: true
  },
  company: {
    type: String,
    trim: true,
    minlength: 5,
    required: true
  },
  description: {
    type: String,
    trim: true,
    minlength: 5,
    required: true
  },
  link: {
    type: String,
    required: true,
    trim: true,
    minlength: 5
  }
}, { timestamps: true });

export const Internship = model('Internship', InternshipSchema);

export const validateCreateInternship = (obj) => {
  const schema = Joi.object({
    title: Joi.string().trim().min(5).max(20).required(),
    company: Joi.string().trim().min(5).required(),
    description: Joi.string().trim().min(5).required(),
    link: Joi.string().trim().min(5).required()
  });
  return schema.validate(obj);
}

export const validateUpdateInternship = (obj) => {
  const schema = Joi.object({
    title: Joi.string().trim().min(5).max(20),
    company: Joi.string().trim().min(5),
    description: Joi.string().trim().min(5),
    link: Joi.string().trim().min(5)
  });
  return schema.validate(obj);
}