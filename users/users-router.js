const bcryptjs = require("bcryptjs")
const router = require("express").Router()

const Users = require("./users-model")
const restricted = require('../auth/authenticate-middleware')

router.use(restricted)

router.get('/users', (req, res) => {
    Users.find()
    .then(users => {
        res.status(200).json({data:users, jwt: req.jwt})
    })
    .catch(err => res.send(err))
})

module.exports = router