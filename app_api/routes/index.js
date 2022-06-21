var express = require('express');
var router = express.Router();


const { expressjwt: jwt } = require('express-jwt');
const auth = jwt({
  secret: "secret",
  userProperty: 'payload',
  algorithms: ['HS256']
});

const ctrlAuth = require('../controllers/authentication');
const ctrlUsers = require('../controllers/users.js');
const ctrlContacts = require('../controllers/contacts.js')


router.get('/users',
    ctrlUsers.seznamUporabnikov);


/* Authentication */
router.post('/register', ctrlAuth.register);
router.post('/login', ctrlAuth.login);


router.get('/contacts', ctrlContacts.listOfContactsForUser);
router.post('/contacts', ctrlContacts.createContact);
router.get('/contacts/:contactId', ctrlContacts.getSingleContact);
router.put('/contacts/:contactId', ctrlContacts.updateContact);


module.exports = router;