import { model, Schema } from "mongoose";
import Joi from 'joi';

export const ScholarshipSchema = new Schema({
  publisher: {
    type: Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    default: ""
  },
  title: {
    type: String,
    trim: true,
    required: true,
    minlength: 5,
    maxlength: 20
  },
  institution: {
    type: String,
    trim: true,
    required: true,
    minlength: 5,
    maxlength: 20
  },
  description: {
    type: String,
    trim: true,
    required: true,
    minlength: 5
  },
  budget: {
    type: String,
    enum: ['fullyFunded', 'partialFunded'],
    required: true
  },
  link: {
    type: String,
    trim: true,
    minlength: 5,
    required: true
  }
}, { timestamps: true });

export const Scholarship = model('Scholarship', ScholarshipSchema);

const budget = ['fullyFunded', 'partialFunded'];

export const validateCreateScholarship = (obj) => {
  const schema = Joi.object({
    title: Joi.string().trim().min(5).max(20).required(),
    institution: Joi.string().trim().min(5).required(),
    description: Joi.string().trim().min(5).required(),
    budget: Joi.string().valid(...budget).required(),
    link: Joi.string().trim().min(5).required()
  });
  return schema.validate(obj);
}

export const validateUpdateScholarship = (obj) => {
  const schema = Joi.object({
    title: Joi.string().trim().min(5).max(20),
    institution: Joi.string().trim().min(5),
    description: Joi.string().trim().min(5),
    budget: Joi.string().valid(...budget),
    link: Joi.string().trim().min(5)
  });
  return schema.validate(obj);
}
