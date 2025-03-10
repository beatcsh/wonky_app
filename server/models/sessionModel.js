import { Schema, model } from "mongoose";

const sessionSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    jwt: { type: String, required: true },
    createdAt: { type: Date, default: Date.now, expires: "1d" } 
});

export const sessionModel = new model("sessions", sessionSchema);
