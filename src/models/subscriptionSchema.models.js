import mongoose, {Schema} from "mongoose";

const subscriptionSchema = new Schema({
    subscriber: {
        type: Schema.Types.ObjectId, // jo subscribe krega
        ref: "User",
    },

    channel: {
        type: Schema.Types.ObjectId, // jisko sb subscribe krega
        ref: "User",
    }
}, {timestamps: true})