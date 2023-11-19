const mongoose = require('mongoose');

const notesSchema = mongoose.Schema({
    title : {
        type : String,
        required : true
    },
    body :{
        type : String,
        required : true
    },
    user:{
        type : String,
        required : true
    }
},
{
    versionKey : false
})

const NotesModel = mongoose.model('notes', notesSchema) 


module.exports = {
    NotesModel
}