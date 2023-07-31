module.exports = function(req, res, next){
    if(req.body.role !== 'recruiter'){
        res.status(403).send('Access denied.');
        next();
    }
}