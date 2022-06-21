const mongoose = require('mongoose');
const User = mongoose.model('User');



const seznamUporabnikov = (req, res) => {
    User
        .find({}, (error, users) => {
            if(error){
                res.status(500).json(error);
            }
            res.status(200).json(users);
        })
};

/*
const preberiUporabnika = (req, res) => {
    Uporabnik
        .findById(req.params.idUporabnika)
        .exec((napaka, uporabnik) => {
            if(!uporabnik){
                return res.status(400).json({
                    "sporočilo":
                        "Ne najdem uporabnika s podanim id-jem idUporabnika."
                });
            } else if (napaka) {
                return res.status(500).json(napaka);
            }
            res.status(200).json(uporabnik);
        });
};
*/



module.exports = {
    seznamUporabnikov
}