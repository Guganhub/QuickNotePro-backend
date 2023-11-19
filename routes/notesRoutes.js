const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const auth = require('../middlewares/auth');
const { NotesModel } = require('../models/NotesModel');



const noteRoute = express.Router();

noteRoute.use(auth)


noteRoute.get('/',async(req,res)=>{
    let token = req.headers.authorization
    jwt.verify(token, 'Gugan',async(err,decode)=>{
        try{
        let data = await NotesModel.find({user:decode.userId})
        res.send({
            data: data,
            message:"Success",
            status :1
        })
    }
    catch(error){
        res.send({
            message:error.message,
            status:0
        })
    }
    } )
   
})


noteRoute.post('/create',async(req,res)=>{
    try {
        let note = new NotesModel(req.body)
        await note.save()
        res.send({
            message:"Note Created",
            status:1
        })
    } catch (error) {
        res.send({
            message:"error.message",
            status:0
        })
    }
})

noteRoute.patch('/update',async(req,res)=>{
    let {id}= req.headers
    try {
        await NotesModel.findByIdAndUpdate({_id:id},req.body)
        res.send({
            message:"Note Updated",
            status : 1
        })
    } catch (error) {
        res.send({
            error:error.message,
            status:0
        })
    }
})

noteRoute.delete('/delete',async(req,res)=>{
    let {id}= req.headers
    try {
        await NotesModel.findByIdAndDelete({_id:id},req.body)
        res.send({
            message:"Note Deleted",
            status : 1
        })
    } catch (error) {
        res.send({
            error:error.message,
            status:0
        })
    }
})


module.exports = noteRoute