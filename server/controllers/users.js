const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken")
const User = require('../models/user');

async function login (req, res) {
    try {
        const user = await User.findByUsername(req.body.username)
        console.log(user)
        if(!user){throw new Error('No user with this username')}
        const authed = await bcrypt.compare(req.body.password, user.password);
        console.log(user)
        console.log(authed)
        if (!!authed){
            res.status(200).json({
                succes: true, 
                token: await createToken(user)
            })
        } else {
            throw new Error('User could not be authenticated')  
        }
    } catch (err) {
        res.status(401).json({ err });
    }
};

async function createToken(userData){
    const payload = {
        user: userData.username,
        firstName: userData.firstName
    }
    const secret = process.env["SECRET_PASSWORD"];
    const options = {
        expiresIn: 60 * 60
    }            

    const token = await jwt.sign(payload, secret, options);
    console.log(token)
    return token;
}

async function register (req, res) {
    try {
        const salt = await bcrypt.genSalt(12);
        const hashed = await bcrypt.hash(req.body.password, salt)
        const {email, username} = req.body
        const userExist = await User.checkIfExists(email, username)
        if(userExist){
            res.status(302).json({user: userExist})
        } else {
            await User.create({...req.body, password: hashed})
            res.status(201).json({msg: 'User created'})
        }
    } catch (error) {
        res.status(500).json({ error })
    }
}

async function index (req, res) {
    try {
        const users = await User.all;
        res.status(200).json(users)
    } catch (err) {
        res.status(500).json({err})
    }
}

module.exports = { login, register, index, createToken}