const mongoose = require('mongoose');



const contactsSchema = new mongoose.Schema({
    firstname: {type: String, required: true},
    lastname: {type: String, required: true},
    phoneNumber: {type: String, required: true},
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true},
});


mongoose.model('Contact', contactsSchema, 'Contacts');


