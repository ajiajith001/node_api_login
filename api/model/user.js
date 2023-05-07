const mongoose=require('mongoose');

// const projectSchema=new mongoose.Schema({

//     _id:mongoose.Schema.Types.ObjectId,
 
//     username:String,
//     password:String,
    

// })


const UsersSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: [1, 2],
        required: true
    }

});

module.exports = mongoose.model('User', UsersSchema);
