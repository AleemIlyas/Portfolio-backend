const express = require('express')
const Project = require('../Schemas/Project')

class projectController {


    async putData(req, res) {
        try {
            const project = new Project({
                image: req.file.filename,
                ...req.body
            })
            await project.save()
            res.status(200).json('Project Added successfully!')
        }
        catch (e) {
            res.status(400).send(e)
        }
    }

    async getData(req, res) {
        try {
            const projects = await Project.find()
            res.status(200).send(projects)
        }
        catch (e) {
            res.status(400).send(e)
        }
    }

    async deleteProject(req, res) {
        try {
            const project = await Project.findByIdAndDelete(req.params.id)
            if (!project) throw new Error("No project found!")
            res.status(200).send("Project deleted successfully!")
        }
        catch (e) {
            res.status(400).send(e)
        }
    }

    async updateProject(req, res) {

        try {
            const project = await Project.findByIdAndUpdate(req.params.id, req.body)
            if (!project) throw new Error("No project found!")
            res.status(200).send({ success: 'Project Updated Successfully!' })
        }
        catch (e) {
            res.status(400).send(e.message)
        }
    }

}

module.exports = new projectController();