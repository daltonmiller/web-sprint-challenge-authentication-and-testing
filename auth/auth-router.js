const bcryptjs = require("bcryptjs"); // << add this line
const router = require("express").Router();
const jwt = require('jsonwebtoken')
const Users = require("../users/users-model.js"); // update path


router.post('/register', (req, res) => {
  let creds = req.body;
  const rounds = process.env.HASH_ROUNDS || 4

  const hash = bcryptjs.hashSync(creds.password, rounds)

  creds.password = hash

  Users.add(creds)
  .then(saved => {
      res.status(201).json({ data: saved })
  })
  .catch(error => {
      res.status(500).json({ error: error.message })
  })

});

router.post('/login', (req, res) => {
    const { username, password } = req.body;

    Users.findBy({ username })
        .then(users => {
            const user = users[0];

            if (user && bcryptjs.compareSync(password, user.password)) {
                const token = makeJwt(user)

                res.status(200).json({ message: "welcome!", token });
            } else {
                res.status(401).json({ message: "YOU SHALL NOT PASS" });
            }
          
        })
        .catch(error => {
            res.status(500).json({ error: error.message });
        });
});

function makeJwt(user){
    const payload = {
        subject: user.id,
        username: user.username,
        role: user.role
}
const secret = process.env.JWT_SECRET || 'is it secret'
const options = {
    expiresIn: '1h'
}
return jwt.sign(payload, secret, options)
}


module.exports = router;