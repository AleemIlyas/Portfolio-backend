const mongoose = require('mongoose')
 
mongoose.set('strictQuery' , false)
mongoose.connect(process.env.DB_URL ,(err,client)=>{
    if(err){
        console.log(err)
    }else{
        console.log('connected to db')
    }
})