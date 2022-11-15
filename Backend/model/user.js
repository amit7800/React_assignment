import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    first_name: {
        type: String,

    },
    last_name: {
        type: String,

    },
    address: {
        add_Line1: {
            type: String,

        },
        add_Line2: {
            type: String,

        },
        state: {
            type: String,
    
        },
    
        city: {
            type: String,
    
        },
    },
   
    phone: {
        type: Number,

    },

    email: {
        type: String,

    },

    password: {
        type: String,

    }

})

const user = mongoose.model("user", userSchema);

export default user;