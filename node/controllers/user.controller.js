const userService = require('../services/user.service')


module.exports = {
    authenticate,
    getAllUsers,
    register,
    setGroup,
    settleUp
};


function authenticate(req, res, next) {
    console.log("Authenticate():", req.body);
       userService.authenticate(req.body)
        .then(user => user ? res.json(user) : res.status(400).json({ message: 'Username or password is incorrect' }))
        .catch(err => next(err));
}

function getAllUsers(req, res, next) {
    //  console.log("getAll", req.body);
    userService.getAllUsers()
        .then(users => res.json(users))
        .catch(err => next(err));
}

function register(req, res, next) {

   userService.addUser(req.body)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function setGroup(req, res, next) {
    userService.setGroup(req.body, req.user.sub)
        .then(() => res.json({}))
        .catch(err => next(err));
}

function settleUp(req, res, next) {
    userService.settleUp(req.params.group)
        .then(rankings=> res.json(rankings))
        .catch(err => next(err));
}