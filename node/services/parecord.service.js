const db = require('../_helpers/database');
const PArecord = db.PArecord;


module.exports = {
    getAllPArecords,
    addPArecord,
    deletePArecord,
    updatePArecord,
    deleteGroup
}


async function addPArecord(parecord, username) {

    console.log("username: " + username);
    // validate
    if (await PArecord.findOne({createdBy: username, createdDate: parecord.createdDate})) {
        throw 'Parecord created by"' + parecord.createdBy + " on " + parecord.createdDate + '" already exists';
    } else if (!username) {
        throw 'Error with the user submitting the request. User information missing. Malformed request.';
    }
    //populate missing fields in the parecord object
    let newrecord = parecord;
    parecord.createdBy = username;
    //parecord.createdDate =  Date.now();
    dbrecord = new PArecord(newrecord);


    // save the record
    await dbrecord.save();

}

async function getAllPArecords() {
    return await PArecord.find().populate({path: "createdBy", select: "username"});
}

async function deletePArecord(username, date) {
    if (await PArecord.findOne({createdBy: username, createdDate: date})) {
        await PArecord.deleteOne({createdBy: username, createdDate: date});
    } else {
        throw 'Deleted: 0';
    }
}

async function updatePArecord(parecord, username) {
    if (await PArecord.findOne({createdBy: username, createdDate: parecord.newCreatedDate})) {
        return await db.PArecord.updateOne({createdBy: username, createdDate: parecord.newCreatedDate},
            {$set: {cost: parecord.newCost, category: parecord.newCategory, name: parecord.newName}});
    } else {
        throw 'Edit unsuccessful, PArecord not found';
    }
}

async function deleteGroup(group) {
    return await PArecord.deleteMany({group});
}
