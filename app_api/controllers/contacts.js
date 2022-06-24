const mongoose = require('mongoose');
const Contact = mongoose.model('Contact');
const atob = require('atob');

const listOfContactsForUser = (req, res) => {
    var token = req.headers.authorization;
    console.log(token);
    const {_id, userName } = JSON.parse(atob(token.split('.')[1]));
    Contact
        .find({ 'user': _id})
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
    var token = req.headers.authorization;
    console.log(token);
    const {_id, userName } = JSON.parse(atob(token.split('.')[1]));
    Contact
        .create({
            firstname: req.body.firstname,
            lastname: req.body.lastname,
            phoneNumber: req.body.phoneNumber,
            user: _id
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


const deleteContact = (req, res) => {
        Contact
            .findByIdAndRemove(req.params.contactId)
            .exec((error) => {
                if(error){
                    return res.status(500).json(error);
                }
                res.status(204).json(null);
            });
}

module.exports = {
    listOfContactsForUser,
    getSingleContact,
    createContact,
    updateContact,
    deleteContact
};
