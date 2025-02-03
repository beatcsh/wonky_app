import { Schema, model } from "mongoose";

const userSchema = new Schema({
    name: { type: String, required: true },
    apePat: { type: String, required: true },
    apeMat: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    numberPhone: { type: String, required: true, unique: true },
    
    address: {
        streetName: { type: String, required: true },
        subdivision: { type: String, required: true },
        number: { type: Number, required: true }
    },

    emerContact: {
        name: { type: String, required: true },
        email: { type: String, required: true },
        numberPhone: { type: String, required: true }
    }
});

export default model("User", userSchema);
