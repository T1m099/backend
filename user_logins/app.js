const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user');
const encryptUtils = require('./cryptography/utils')
const jwt = require('./jwt/Jwt');

const app = express();
app.use(express.json({type: 'application/json'}));

//connect to DB
mongoose
    .connect(
        'mongodb://user_db/test',{ useNewUrlParser: true,useUnifiedTopology: true}
    )
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

//object needed in body: {name: ..., password: ..., mail: ...}
app.post('/register', (req, res) => {
    let saltAndHash = encryptUtils.genPassHash(req.body.password);
    let hash = saltAndHash.hash;
    let salt = saltAndHash.salt;

    const user = new User({
        name: req.body.name,
        mail: req.body.mail,
        hash: hash,
        salt: salt
    });

    user.save()
        .then((user) => {
            const jwtToken = jwt.issueJWT(user);
            console.log('User created');
            //respond with a token and a succcess message
            res.status(201).json({success: true, token: jwtToken.token, expiresIn: jwtToken.expiresIn});
        })
        .catch((err) => {
            console.log(err)
        });
});

app.post('/login', function (req, res, next){
   User.findOne({mail: req.body.mail})
       .then((user) => {

           if(!user){
               res.status(401).json({success: false, msg: "Could not find any user with that mail"})
           }
           const pwIsValid = encryptUtils.validatePw(req.body.password, user.hash, user.salt);

           if(pwIsValid){
               const jwtToken = jwt.issueJWT(user);
               res.status(200).json({success: true, token: jwtToken.token, expiresIn: jwtToken.expiresIn});
           }
           else{
               res.status(401).json({success: false, msg: "Wrong password has been entered"});
           }
       })
       .catch((err)=>{
           console.log(err);
       });
});



//2 login endpoints, die mit den username und passwort, bzw. den hash akzeptiert

/*
app.get('/', (req, res) => {
    const user = new User({
        name: 'Nelly',
        hash: '12234',
        salt: 'fno34oh'
    });
    user.save()
        .then((result) => {
        res.send(result)
        })
        .catch((err) => {
            console.log(err)
        });
});
*/

app.get('/login', (req, res) => {
    console.log(req.body);
    res.send(req.body);
});

console.log("sdfsgsdfgdsrfvlkhsaelfiu vaherqohfpeqidov dpfogh!!!!!!!");


app.listen(80);