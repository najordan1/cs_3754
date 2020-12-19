//THIS will be used once we connect MongoDB   console.log("UnauthorizedError req:",req.url);
const mongoose = require('mongoose');
const Schema = mongoose.Schema;


//https://mongoosejs.com/docs/populate.html#populate_an_existing_mongoose_document


const schema = new Schema({
    cost: { type: Number, required: true },
    category: { type: Number, required: true},
    createdBy: { type: Schema.Types.ObjectId, ref: 'User' },
    createdDate: { type: Date, default: Date.now },
    name: { type: String, required: true},
    group: {type: String, required: true}
    });

schema.index({createdDate:1, createdBy:1}, { unique: true });

schema.set('toJSON', { virtuals: true });

module.exports = mongoose.model('PArecord', schema);


