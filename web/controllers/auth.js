const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const config = require("config");
const jwt = require("jsonwebtoken");
const authorizeToken = require("../middleware/authorizeToken");

const User = require("../models/user.js");

// LOGIN ROUTE //
/////////////////
router.post("/", (req, res) => {
  const { email, password } = req.body;

  //Simple Validation
  if (!email || !password) {
    return res.status(400).json({ 
      message: "Please Enter All Fields" 
    });
  }

  //Check for existing user
  User.findOne({ email }).then((user) => {
    if (!user) {
      return res.status(400).json({ 
        message: "User Does Not Exist" 
      });
    }
    //Validate password with bcrypt
    bcrypt.compare(password, user.password).then((isMatch) => {
      if (!isMatch) return res.status(400).json({ message: "Incorrect Password" });

      if (isMatch) {
        jwt.sign(
          { id: user.id },
          config.get("jwtSecret"),
          { expiresIn: 3600 },
          (err, token) => {
            if (err) throw err;
            res.json({
              token,
              user: {
                id: user.id,
                name: user.name,
                email: user.email,
              },
            });
          }
        );
      }
    });
  });
});

//GET authorizeToken route
router.get("/user", authorizeToken, (req, res) => {
  User.findById(req.user.id)
    .select("-password")
    .then((user) => res.json(user));
});

// let createAuthToken = user => {
//   return jwt.sign(
//     { id: user.id },
//     config.get("jwtSecret"),
//     { expiresIn: 3600 },
//     (err, token) => {
//       if (err) throw err;
//       res.json({
//         token,
//         user: {
//           id: user.id,
//           name: user.name,
//           email: user.email,
//         },
//       });
//     }
//   );
// }

let createRefreshToken = user => {
  let refreshToken = jwt.sign({
    type: 'refresh'
  }, config.get("jwtSecret"), {
    expiresIn: '20s'
  });

  return Users.findOneAndUpdate({
    email: user.email
  }, {
    refreshToken: refreshToken
  }).then(() => {
    return refreshToken;
  }).catch(err => {
    throw err;
  })
}


module.exports = router;