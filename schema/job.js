const Joi = require('joi');
const mongoose = require('mongoose');

const jobSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true,
        minlength:5,
        maxlength:255,
        trim:true,
        required:true,
    },
    Company_name:{
        type:String,
        minlenght:5,
        maxlenght:50,
        trim:true,
        required:true,
    },
    Company_email:{
        type:String,
        minlenght:5,
        maxlenght:255,
        trim:true,
        required:true,

    },
    Job_description:{
        type:String,
        minlenght:5,
        maxlenght:255,
        trim:true,
        required:true,
    },
    Required_qualifications:{
        type:Array,
        required:true,
    },
    Salary:{
        type:String,
        required:true,
    },
    Location:{
        type:String,
        minlenght:5,
        maxlenght:50,
        trim:true,
        required:true,
    },
    Employement_type:{
        type:String,
        enum:['full-time','part-time','Contract'],
    },
    Experience_level:{
        type:String,
        required:true,
    },
    Education_level:{
        type:String,
        required:true,
    },
    Application_deadline:{
        type:Date,  
        required:true,
    },
    Contact_information:{
        type:String,
        required:true,
    }
});
const Jobs = mongoose.model('Jobs', jobSchema );

function validate(job){
    const schema = Joi.object({
        title: Joi.string().min(5).max(255).required(),
        Company_name:Joi.string().min(5).max(50).required(),
        Company_email:Joi.string().min(10).max(255).required().email(),
        Job_description:Joi.string().min(5).max(255).required(),
        Required_qualifications:Joi.array().required(),
        Salary:Joi.string().required(),
        Location:Joi.string().min(5).max(50).required(),
        Employement_type:Joi.string(),
        Experience_level:Joi.string().required(),
        Education_level:Joi.string().required(),
        Application_deadline:Joi.date().required(),
        Contact_information:Joi.string().required(),
   
    });

    return schema.validate(job);
}

exports.validate = validate;
exports.Jobs = Jobs;
exports. jobSchema = jobSchema;
