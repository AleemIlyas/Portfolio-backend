require('dotenv').config()
const express = require('express')

require('./src/db/db')
const app = express()
const cookieParser = require('cookie-parser')
const bodyParser = require('body-parser')
const session = require('express-session')
const cors = require('cors')
const passport = require('passport')

const projectRouters = require('./src/Routers/projectRouter')
const AdminRouter = require('./src/Routers/Admin')

const port = process.env.PORT

app.use( cors({
    origin : 'http://localhost:5173',
    credentials : true
}) )
app.use(express.json());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended:false}))
app.use('/Images' , express.static('Images') )
app.use(passport.initialize())
require('./src/Auth/Auth.js')
app.use(projectRouters)
app.use(AdminRouter)

// app.use('/',(req,res)=>{
//   res.send('Hello World')
// })

app.listen(port , ()=>{
    console.log(`listening at http://localhost:${port}`)
})