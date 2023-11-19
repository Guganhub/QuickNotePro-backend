const express = require('express');

const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken')
const { UserModel } = require('../models/UserModel');

const userRoutes = express.Router();

userRoutes.get('/',(req,res)=>{
    res.send("Users")
})

userRoutes.post('/register',async(req,res)=>{
    const {name, email, password} = req.body
    bcrypt.hash(password,5, async function(err, hash){
        if(err) return res.send({message: "Something went wrong", status:0})
        try {
            let user = new UserModel({name, email, password:hash})
            await user.save()
            res.send({
                message:"User Created",
                status :1
            })
        } catch (error) {
            res.send({
                message :error.message,
                status:0
            })
        }
    })
})

userRoutes.post('/login',async(req,res)=>{
    const {email,password}= req.body

    let expire = {
        expiresIn: "10m"
    }
    try {
        let data = await UserModel.find({email})
        console.log(data)
        if(data.length>0){
            let token = jwt.sign(
                {
                    userId : data[0]._id
                }, 'Gugan',expire
            )
            bcrypt.compare(password, data[0].password , function(err, result){
                if(err){
                    return res.send({
                        message : "Something went wrong",
                        status : 0
                    })
                }
                if(result){
                    res.send({
                        message :"User Logged In",
                        token : token,
                        status : 1,
                    })
                }
                else{
                    res.send({
                        message:"Incorrect Password",
                        status : 0
                    })
                }
            })
        }
        else{
            res.send({
                message : "User Does Not Exist",
                status :0
            })
        }
    } catch (error) {
        res.send({
            message : error.message,
            status :0
        })
    }
    
})


module.exports = userRoutes