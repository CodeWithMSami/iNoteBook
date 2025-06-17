const express = require('express');
const User = require('../models/Auth')
const router = express.Router();
const {body,validationResult} = require('express-validator')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const fetchuser = require('../middleware/fetch')

const JWT_SCRET = 'ab7o12$4^cd%sa6@1'
let Success = false;
// Register Router
router.post('/register',[
    body('name','Enter a valid name').isLength({min : 3}),
    body('email','Enter a valid email').isEmail(),
    body('password','Password must be eight character long.').isLength({min : 8})
],async (req,res)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({Error: error.array(),Success});
    }
    try {
        let user = await User.findOne({email: req.body.email});
        if(user){
            return res.status(400).json({Error: 'Sorry a user with this email already exists!',Success})
        }
        const salt = await bcrypt.genSalt(10)
        const secPass = await await bcrypt.hash(req.body.password, salt);
        user = await User.create({
            name: req.body.name,
            email: req.body.email,
            password: secPass
        })
        const data = {
            user : {
                id: user.id
            }
        }
        Success = true
        const authtocken = jwt.sign(data,JWT_SCRET)
        res.json({authtocken,Success})
    } catch (error) {
        console.log(error.message)
        res.status(500).json({error:'Internal Server Error',Success})
    }
})
// Login Router
router.post('/login',[
    body('email','Enter a valid email.').isEmail(),
    body('password','Password cannot be blancked.').exists()
], async (req,res)=>{
    const error = validationResult(req);
    if(!error.isEmpty()){
        return res.status(400).json({Error: error.array(),Success});
    }
    const {email,password}= req.body;
    try {
        let user = await User.findOne({email: req.body.email});
        if(!user){
            return res.status(400).json({Error: 'Sorry a user with this email already exists!',Success})
        }
        const passCompair = bcrypt.compare(password,user.password);
        if(!password){
            return res.status(400).json({Error: 'Please try to login with correct credentials',Success})
        }
        const data = {
            user : {
                id: user.id
            }
        }
        const authtocken = jwt.sign(data,JWT_SCRET)
        Success=true;
        res.json({authtocken,Success})
    } catch (error) {
        console.log(error.message)
        res.status(500).send('Internal Server Error')
    }

})
// Get User Router
router.post('/getuser',fetchuser, async (req,res)=>{
    try {
        let userId = req.user.id;
        const user = await User.findById(userId).select("-password");
        res.send(user)
    } catch (error) {
        console.error(error.message);
        res.status(500).send("Internal Server Error");
      }
})

module.exports = router;