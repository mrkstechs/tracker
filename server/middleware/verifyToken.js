const jwt = require("jsonwebtoken");

function verifyToken (req, res, next) {
    const header = req.headers["authorization"];
    if (header) {
        jwt.verify(token, process.env["SECRET_PASSWORD"], (err, decoded) => {
            if (err){
                res.status(401).json({success: false,
                    message: "This route requires authorization"})
            } else {
                next();
            }
        })
    } else {
        res.status(401).json({success: false,
                            message: "This route requires authorization"})
    }
}