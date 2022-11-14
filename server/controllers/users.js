const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const User = require('../models/user');

async function login (req, res) {
    try {
        const user = await User.findByUsername(req.body.username)

        if(!user){throw new Error('No user with this username')}
        const authed = await bcrypt.compare(req.body.password, user.password);
        console.log(user)
        console.log(authed)
        if (!!authed){
            const payload = {
                user: user.username,
                firstName: user.firstName
            }
            // const secret =  Load this from .env file
            const options = {
                expiresIn: 60
            }            

            const token = await jwt.sign(payload, secret, options);
            res.status(200).json({ token: token })
        } else {
            throw new Error('User could not be authenticated')  
        }
    } catch (err) {
        res.status(401).send({ err });
    }
};

async function register (req, res) {
    try {
        const salt = await bcrypt.genSalt(12);
        const hashed = await bcrypt.hash(req.body.password, salt);
        await User.create({...req.body, password: hashed})
        res.status(201).json({msg: 'User created'})
    } catch (err) {
        res.status(500).json({ err });
    }
};

async function index (req, res) {
    try {
        const users = await User.all;
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({err})
    }
}

module.exports = { login, register, index}