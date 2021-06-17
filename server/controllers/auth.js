const bcrypt = require('bcryptjs');

const users = [];

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        if (users[i].username === username && bcrypt.compareSync(password, users[i].passwordHash)) {
          res.status(200).send(users[i])
          return
        }
        else res.status(400).send("User not found.")
        return
      }
      // res.status(400).send("User not found.")
    },
    register: (req, res) => {
        console.log('Registering User')
        console.log(req.body)

      const { username, email, firstName, lastName, password } = req.body
      for (i = 0; i < users.length; i++) {;
       
      const existing = bcrypt.compareSync(password, users[i].passwordHash)
      
      if (existing) {
        users[i].passwords.push(password);
        let passwordToReturn = {...users[i]};
        delete passwordToReturn.passwordHash;
        res.status(200).send(passwordToReturn);
        return
      }
     }
     const salt = bcrypt.genSaltSync(5);
     const passwordHash = bcrypt.hashSync(password, salt)

     let userObj = {
       username,
       email,
       firstName,
       lastName,
       passwordHash
       
     }
     users.push(userObj);
     console.log(users);
     let passwordToReturn = {...userObj};
     delete passwordToReturn.passwordHash;
     res.status(200).send(passwordToReturn);
     return

        // users.push(req.body)
        // res.status(200).send(req.body)
    }
    
    

}