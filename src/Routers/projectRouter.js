const express = require('express');

const  upload  = require('../Middleware/fileUpload')
const projectController = require('../controller/project');
const passport = require('passport')

const routes = express.Router();

routes.post('/addProject', passport.authenticate('jwt', { session:false }),upload.single('image') , projectController.putData)
routes.get('/getProjects',projectController.getData)
routes.delete('/deleteProject/:id', passport.authenticate('jwt', { session:false }) , projectController.deleteProject )
routes.patch('/updateProject/:id', passport.authenticate('jwt', { session:false }) , projectController.updateProject )

module.exports = routes;
