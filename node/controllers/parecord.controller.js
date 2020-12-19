const parecordService = require('../services/parecord.service')

module.exports = {
    createPArecord,
    getPArecords,
    deletePArecord,
    updatePArecord,
    deleteGroup
};


function createPArecord(req, res, next) {
    parecordService.addPArecord(req.body, req.user.sub)
        .then(() => res.json({}))
        .catch(err => next(err));

}

function getPArecords(req,res,next){
    parecordService.getAllPArecords()
        .then(parecords => res.json(parecords))
        .catch(err => next(err));
    }


function deletePArecord(req,res,next){
    parecordService.deletePArecord(req.user.sub, req.params.date)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function updatePArecord(req, res, next){
    parecordService.updatePArecord(req.body, req.user.sub)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function deleteGroup(req, res, next){
    parecordService.deleteGroup(req.params.group)
        .then(()=> res.json({}))
        .catch(err => next(err));
}
