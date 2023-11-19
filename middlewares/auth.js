const jwt = require('jsonwebtoken');


function auth(req,res,next){
    const token = req.headers.authorization

    jwt.verify(token, 'Gugan', (err,decode)=>{
        if(err){
            return res.send({
                message:"Token is not valid",
                status : 2
            })
        }
        if(decode){
            req.body.user = decode.userId
            next()
        }
        else{
            res.send({
                message:"Token is not valid",
                status : 2
            })
        }
    })
}
module.exports = auth;