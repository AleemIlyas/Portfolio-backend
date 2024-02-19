const mongoose = require('mongoose')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')

const UserModel = mongoose.Schema({
    email:{
        type:String,
        required:true,
        unique : true
    },
    password:{
        type:String,
        required:true ,
        trim : true
    },
    tokens : [{
        token : {
        type : String,
        required : true
        }
    }]
})

UserModel.pre('save' ,async function(next){
    const user = this
    const SALT_ROUND = 10
    if( user.isModified('password') ){
       user.password = await bcrypt.hash( user.password , SALT_ROUND )
       next()
    }
} )


UserModel.methods.createToken = async function(){
    const user = this
    const token = jwt.sign({_id:user._id.toString()}, process.env.SECERT_KEY , { expiresIn : 604800 } )
    user.tokens = user.tokens.concat({ token : token})
    await user.save()
    return token
}

const User = mongoose.model('User' , UserModel );
module.exports = User;