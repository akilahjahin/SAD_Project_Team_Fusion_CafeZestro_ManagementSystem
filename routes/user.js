const express = require('express');
const connection = require('../connection');
const router = express.Router();

const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer');
require('dotenv').config();

router.post('/signup', (req, res) => {
    let user = req.body;
    query = "select email, password, role, status from user where email=?"
    connection.query(query, [user.email], (err, results) => {
        if (!err) {
            // To check whether email of user already exist in our system
            if (results.length <= 0) {
                query = "insert into user(name, contactNumber, email, password, status, role) values(?, ?, ?, ?, 'false', 'user')";
                connection.query(query, [user.name, user.contactNumber, user.email, user.password], (err, results) => {
                    if (!err) {
                        // Successfully Registered
                        return res.status(200).json({ message: "Successfully Registered" });
                    } else {
                        return res.status(500).json(err);
                    }
                });
            } else {
                return res.status(400).json({ message: "Email Already Exist. " });
            }
        } else {
            return res.status(500).json(err);
        }
    })
})

router.post('/login', (req, res) => {
    const user = req.body;
    query = "select email, password, role, status from user where email=?";
    connection.query(query, [user.email], (err, results) => {
        if (!err) {
            // NOTE: results.length to check whether the email (returned) is invalid(i.e. empty) 
            if (!results[0] || results[0].password != user.password) {
                return res.status(401).json({ message: "Incorrect username or password" });

            }
            // To check if user is having status 'true' or NOT
            else if (results[0].status === 'false') {
                return res.status(401).json({ message: "Wait for Admin Approval" });
            }
            // To generate the 'token'
            else if (results[0].password == user.password) {
                // To generate a token, a secret key is needed to encrypt and decrypt
                const response = { email: results[0].email, role: results[0].role }
                const accessToken = jwt.sign(response, process.env.ACCESS_TOKEN, { expiresIn: '8h' })
                res.status(200).json({ token: accessToken });
            } else {
                return res.status(400).json({ message: "Something went wrong. Please try again later" });
            }
            // Nested if- ends
        } else {
            return res.status(500).json(err);
        }
    })
})

var transporter = nodemailer.createTransport({
    service: 'gmail',
    auth:{
        user: process.env.EMAIL,
        pass: process.env.PASSWORD
    }
})

// Creating a new API
router.post('/forgotPassword', (req,res) => {
    const user = req.body;
    query = " select email, password from user where email=?";
    connection.query(query, [user.email], (err, results) => {
        if(!err) {
            if(!results[0]) {
                return res.status(200).json({message: "Password sent successfully to your email."});
            } else {
                var mailOptions = {
                    from: process.env.EMAIL,
                    to: results[0].email,
                    subject: 'Password by CafeZestro Management System',
                    html: '<p><b>Your login details for CafeZestro Management System</b><br><b>Email: </b>'+results[0].email+'<br><b>Password: </b>'+results[0].password+'<br><a href="https://localhost:4200/">Click here to login</a></p>'
                    // We will run the frontend from 4200
                };
                transporter.sendMail(mailOptions, function(error, info){
                    if(error) {
                        console.log(error);
                    } else {
                        console.log('Email sent:' + info.response);
                    }
                });
                return res.status(200).json({message: "Password sent successfully to your email."});
            }
        } else {
            return res.status(500).json(err);
        }
    })
})

// API to get all the users
router.get('/get', (req,res) => {
    var query = "select id, name, email, contactNumber, status from user where role = 'user'"
    connection.query(query, (err, results) => {
        if(!err) {
            return res.status(200).json(results);
        } else {
            return res.status(500).json(err);
        }
    })
})

// API to change the status of user from the UI
router.patch('/update', (req,res) => {
    let user = req.body;
    var query = "update user set status=? where id=?";
    connection.query(query, [user.status, user.id], (err, results) => {
        if(!err) {
            if(results.affectedRows == 0) {
                return res.status(404).json({message: "User ID does not exist"});
            }
            return res.status(200).json({message: "User Updated Successfully"});
        } else {
            return res.status(500).json(err);
        }
    })
})

// API to check token
router.get('/checkToken', (req,res) => {
    return res.status(200).json({message: "true"});
})

// API to change the password
router.post('/changePassword', (req,res) => {
    //const 
    
})

module.exports = router;