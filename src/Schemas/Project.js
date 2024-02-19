const mongoose = require('mongoose')

const project = mongoose.Schema({
    image :{
        type : String,
        require:true
    },
    title:{
        type:String,
        required:true
    },
    description:{
        type:String,
        required:true
    },
    link : {
        type:String,
        required:true
    },
    technologies : [{
        type:String,
        required:true
    }]
})

const projectModel = mongoose.model('project' , project)

module.exports = projectModel