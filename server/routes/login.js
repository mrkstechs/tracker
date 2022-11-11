const express = require('express');
const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const user = await User.findByUsername(req.body.username)
        console.log(user)
        if(!user){ throw new Error('No user with this username') }
        const authed = await bcrypt.compare(req.body.password === user.password);
        if (!!authed){
            const payload = {
                user: user.username
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
        res.status(401).json({ err });
    }
}) 