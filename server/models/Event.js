const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const eventSchema = new Schema({
    title: {type: String, required: true},
    longtitude: {type: Number, required: true},
    latitude: {type: Number, required: true},
    description: String,
    photos: [String]
})


const Event = mongoose.model('Event', eventSchema);
module.exports = Event;