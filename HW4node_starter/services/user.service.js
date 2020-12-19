const config = require('../config.json');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const db = require('../_helpers/database');
const User = db.User;
const PARecord = db.PArecord;



module.exports = {
    authenticate,
    getAllUsers,
    getByUsername,
    addUser,
    setGroup,
    settleUp
}

async function authenticate({ username, password }) {

    const user = await User.findOne({ username });
    if (user && bcrypt.compareSync(password, user.hash)) {
        const { hash, ...userWithoutHash } = user.toObject();
        const token = jwt.sign({ sub: user.id, role: user.role }, config.secret);
        return {
            ...userWithoutHash,
            token
        };
    }
}

async function getAllUsers() {
    //Returning the result of the promise.
    return await User.find().select('-hash');
}



async function getByUsername(username) {

    return await User.find({username:username});
}

async function addUser(userParam) {

    // validate
    if (await User.findOne({ username: userParam.username })) {
        throw 'Username "' + userParam.username + '" is already taken';
    }
    else  if (await User.findOne({ email: userParam.email })) {
        throw 'Email "' + userParam.email + '" is already taken';
    }

    const user = new User(userParam);

    // hash password
    if (userParam.password) {
        user.hash = bcrypt.hashSync(userParam.password, 10);
    }

    // save user
    await user.save();

}

async function setGroup(json, username){
    await User.updateOne({_id: username}, {$set:{group: json.group}});
}

async function settleUp(group){
    let groupMembers = await User.find({group}).select('-hash');
    let ranks = [];
    let groupCost = 0;

    for (var i = 0; i < groupMembers.length; i++){
        let totalSpent = 0;
        let expenses = await PARecord.find({createdBy:groupMembers[i], group});

        for (var j = 0; j < expenses.length; j++){
            totalSpent += expenses[j].cost;
        }

        ranks.push({
            firstName: groupMembers[i].firstName,
            lastName: groupMembers[i].lastName,
            totalSpent,
            amountOwed: 0,
            numTransactions: expenses.length,
            username: groupMembers[i].username
        });
        groupCost += totalSpent;
    }

    let share = groupCost / groupMembers.length;

    for (var x = 0; x < ranks.length; x++){
        let memberOwed = (ranks[x].totalSpent - share).toFixed(2);
        ranks[x].amountOwed = memberOwed;
    }
    return ranks;
}