import { Schema, model } from "mongoose";

const zoneSchema = new Schema({
    danger_level: { type: String, required: true, enum: ["low", "medium", "high"] },
    description: { type: String, required: true },
    location: {
        type: { type: String, default: "Point" },
        coordinates: { type: [Number], required: true }
    },
    user_id: {type: String, default: ""}
});

// Índice geoespacial para consultas eficientes
// zoneSchema.index({ location: "2dsphere" });

export const zoneModel = new model("zones", zoneSchema);
