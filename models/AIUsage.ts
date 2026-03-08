import mongoose, { Schema, model, models } from "mongoose";

const AIUsageSchema = new Schema(
    {
        userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
        date: { type: String, required: true }, // Format: YYYY-MM-DD
        count: { type: Number, default: 0 },
    },
    { timestamps: true }
);

// Compound index to quickly find user's usage for a specific day
AIUsageSchema.index({ userId: 1, date: 1 }, { unique: true });

const AIUsage = models.AIUsage || model("AIUsage", AIUsageSchema);
export default AIUsage;
