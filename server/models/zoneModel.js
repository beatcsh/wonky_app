import { Schema, model } from "mongoose";

const zoneSchema = new Schema({
    dangerLevel: { type: String, required: true, enum: ["low", "medium", "high"] },
    description: { type: String, required: true },

    location: {
        type: { type: String, default: "Point" },
        coordinates: { type: [Number], required: true }
    }
});

// Índice geoespacial para consultas eficientes
// zoneSchema.index({ location: "2dsphere" });

export default model("zones", zoneSchema);
