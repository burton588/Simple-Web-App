const mongoose = require('mongoose');
const Contact = mongoose.model('Contact');

const listOfContactsForUser = (req, res) => {
    console.log(req.body.userId);
    Contact
        .find({ 'user': req.body.userId})
        .populate('user')
        .exec((error, contacts) => {
            if(error){
                res.status(500).json(error);
            }
            
            res.status(200).json(contacts);
        
        });
};

const getSingleContact = (req, res) => {
    Contact
        .findById(req.params.contactId)
        .populate('user')
        .exec((error, contact) => {
            if(error){
                res.status(500).json(error);
            }
            
            res.status(200).json(contact);
        
        });
};

const createContact = (req, res) => {
    Contact
        .create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phoneNumber: req.body.phoneNumber,
            user: req.body.userId
        }, (error, contact) => {
            if(error){
                res.status(500).json(error);
            }
            res.status(201).json(contact);
        });
};


const updateContact = (req, res) => {
    Contact
        .findById(req.params.contactId)
        .populate('user')
        .exec((error, contact) => {
            if(error){
                res.status(500).json(error);
            }
            contact.firstname = req.body.firstname;
            contact.lastname = req.body.lastname;
            contact.phoneNumber = req.body.phoneNumber;
            contact.save((error, contact) => {
                if(error){
                    res.status(500).json(error);
                }
                res.status(200).json(contact);
            });
        });
};

module.exports = {
    listOfContactsForUser,
    getSingleContact,
    createContact,
    updateContact
};
