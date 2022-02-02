const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require("../model/userschema")

const addRegisterData = async (req, res) => {
    try{
        const { email, password, cpassword } = req.body;
        if(!email || !password || !cpassword){
            return res.status(400).json({
                data: "Email and password is required",
                success: false
            })
        }
        const alreadyExistEmail = await User.findOne({email: email})
        if(alreadyExistEmail){
            return res.status(422).json({
                data: "Email already exist",
                success: false
            })
        } else if (password != cpassword){
            return res.status(422).json({
                data: "Password not match",
                success: false
            })            
        }
        const addRecord = new User(req.body);
        const user = await addRecord.save();
        console.log(`${addRecord} Record inserted`);
        console.log(user);
        res.status(201).send("Record inserted");
    } catch(err) {
        res.status(400).send(err.message);
    }
}

const addLoginData = async (req, res) => {
    try{
        let token;
        const { email, password } = req.body;
        if (!email || !password ) {
        return res.status(400).json({error: "Email and password is required" });
    }
    const userLogin = await User.findOne({ email: email });
    if(userLogin){
        const isMatch = await bcrypt.compare(password, userLogin.password);
        if(!isMatch){
            res.status(400).json({message: "user login error"});
        } else {  
            token = await userLogin.genrateAuthToken();
            res.status(200).send(userLogin);
            console.log(userLogin);
        } 
        } else {
            res.status(400).json({message: "user login error"});
        }
    } catch (err) {
        console.log(err);
    }
}

module.exports = {addRegisterData, addLoginData }
