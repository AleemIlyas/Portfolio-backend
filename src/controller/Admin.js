const express = require('express')
const User = require('../Schemas/User')
const bcrypt = require('bcrypt')

class AdminController {

    async loginAdmin(req, res) {
        try {
            const { email, password } = req.body;
            const user = await User.findOne({ email });
            if (!user) {
                throw new Error('Invalid Username or password!');
            }
            const verifyPassword = await bcrypt.compare(password, user.password);
            if (!verifyPassword) {
                throw new Error('Invalid Username or password!');
            }
            const token = await user.createToken();
            res.status(201).send({ user, token });
        } catch (error) {
            console.error(error);
            res.status(401).send(error.message);  // Sending only the error message for security reasons
        }
    }

    async protectedRoot(req, res) {
        try {
            res.status(200).send({ hello: 'hello!' })
        }
        catch (err) {
            res.status(300).send('Error occured')
        }
    }

    async registerAdmin(req, res) {
        try {
            const user = new User(req.body)
            const token = await user.createToken()
            await user.save()
            res.status(200).send({ user, token })
        }
        catch (e) {
            res.status(400).send(e)
        }
    }

    async logUserOut(req, res) {
        try {
            console.log(req.user)
        }
        catch (err) {
            res.status(501).send(err)
        }
    }


}


module.exports = new AdminController();
