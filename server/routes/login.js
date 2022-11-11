const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const user = await User.findByEmail(req.body.email)
        console.log(user)
        if(!user){ throw new Error('No user with this email') }
        const authed = await bcrypt.compare(req.body.password === user.passwordDigest);
        if (!!authed){
            const payload = {
                user: user.username
            }
            const secret = "SUPERSECRETSTRING" // In practice load this from .env file
            const options = {
                expiresIn: 60
            }            

            const token = await jwt.sign(payload, secret, options);
            res.status(200).json({ token: token })
        } else {
            throw new Error('User could not be authenticated')  
        }
    } catch (err) {
        res.status(401).json({ err });
    }
}) 