const mongoose  = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require ('bcryptjs');

const userSchema = new mongoose.Schema({
    name:{type:String,trim:true},
    email:{type:String,trim:true},
    phone:{type:String,trim:true},
    password:{type:String,trim:true},
    cpassword:{type:String,trim:true},
    tokens:[
        {
            token:{
                type:String,
                require:true
            }
        }
    ]
})

//password hashing
userSchema.pre('save', async function (next){
    if (this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
})

userSchema.methods.genrateAuthToken = async function (){
    try{
        let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token: token});
        await this.save();
        return token;
    } catch (err){
        console.log(err);
    }
}

const User = mongoose.model('User', userSchema);
module.exports = User;
