const asyncHandler = require('express-async-handler');
const {Jobs,validate}= require('../schema/job');
const mongoose = require('mongoose');

const getJob = asyncHandler(async(req,res) =>{
    const {id} = req.params;
    if (!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(400).send('Invalid job ID')};
    const job = await Jobs.findById(id);
    if(!job) return res.status(404).send('Job not found!');
    res.status(200).json(job);
});
const getJobs = asyncHandler(async(req,res) =>{
    const job = await Jobs.find();
    if(!job) res.status(400).send('No jobs!');
    res.status(200).json(job);

});
const createJob =asyncHandler(
    async(req,res) =>{
        const {error} =validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        const job = new Jobs(req.body);
        res.status(200).json(await job.save());  
    
    });

const editJob =asyncHandler(
    async(req,res) =>{
        const {id} = req.params;
        const {error} =validate(req.body);
        if(error) return res.status(400).send(error.details[0].message);
        const job = await Jobs.findByIdAndUpdate(id,req.body,{new:true,});
        if(!job) res.status(404).send('job not found')
        res.status(200).json(job);
    });
const deleteJob =asyncHandler(
    async(req,res) =>{
        const {id} = req.params;
        const job = await Jobs.findByIdAndDelete(id);
        if(!job) res.status(400).send('job not found!')
        res.status(200).json(job)
    });

    
    
module.exports ={getJob,getJobs,createJob,editJob,deleteJob}



