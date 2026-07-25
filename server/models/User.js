const mongoose = require('mongoose');
const bcrypt = require('bcrypt');



const userSchema = new mongoose.Schema({
    name: {type : String, required : true},
    email: {type : String, required : true, unique : true, lowercase : true},
    password: {type: String, required: true, minlength: 8},
    role: {type: String, enum: ['user', 'admin'], default: 'user'},
    resetPasswordToken: { type: String },
    resetPasswordExpire: { type: Date },
},{timestamps: true});



userSchema.pre('save', async function(){
    if(!this.isModified('password')) return;
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    
});



userSchema.methods.matchPassword = function(enteredPassword){
    return bcrypt.compare(enteredPassword, this.password);
};



module.exports = mongoose.model('User', userSchema);