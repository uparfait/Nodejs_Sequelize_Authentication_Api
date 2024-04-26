module.exports = function HandleError (req,res){
    
    let error = req.AttachedError;
    delete req.AttachedError;
    if(error.isServerError) {
        res.status(500).json({error: error.error});
    }
    res.status(403).json({error: error.error});
}