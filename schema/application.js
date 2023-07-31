const Joi = require('joi');
const mongoose = require('mongoose');
const {userSchema} = require('../schema/users')


const applicationSchema = new mongoose.Schema({
    job: {
      type: mongoose.Schema.Types.ObjectId,
      ref:'jobSchema'

    },
    applicant: {
      type:userSchema,
      required: true

    },
    resume: {
      type: String,
      required: true
    },
    status: {
      type: String,
      enum: ['pending', 'reviewed', 'rejected', 'accepted'],
      default: 'pending'
    },
    createdAt: {
      type: Date,
      default: Date.now
    }});
const Applications = mongoose.model('Applications', applicationSchema );

const objectId = (value, helpers) => {
    if (!mongoose.Types.ObjectId.isValid(value)) {
      return helpers.error('any.invalid');
    }
    return value;
  };

function validate(application){
    const schema = Joi.object({
        job:Joi.object(),
        applicant:Joi.object(),
        applicantId:Joi.custom(objectId, 'Object Id'),
        jobId:Joi.custom(objectId, 'Object Id'),
        resume:Joi.string().required(),  
        status:Joi.string().required(),   
        createdAt:Joi.date(),

    });

    return schema.validate(application);
}

exports.validateapp = validate;
exports.Applications = Applications;
exports. applicationSchema = applicationSchema;
