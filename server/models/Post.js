const mongoose = require('moongoose');

const Schema = moongose.Schema
const PostSchema =  new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        require: true
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updateAt: {
        type: Date,
        default: Date.now
    },
});

module.exports = mongoose.model('Post', PostSchema);

