import mongoose, { Schema, models } from "mongoose";
import mongooseAggregatePaginate from "mongoose-aggregate-paginate-v2";

const videoSchema = new Schema({
    videoFile:{
        Type: String,
        required: true,
    },
    thumbnail:{
        Type: String,
        required: true,
    },
    owner:{
        Type: Schema.Types.ObjectId,
        ref: "User",
    },
    title:{
        Type:String,
        required: true,
        trim: true,
        index: true,
    },
    discription:{
        Type:String,
        trim:true,        
    },
    duration:{
        Type: Number, // cloud se
        required: true,
    },
    views:{
        Type: Number,
        default: 0,
    },
    isPublished:{
        Type: Boolean,
        required: true,
    },
}, {timestamps: true})

videoSchema.plugin(mongooseAggregatePaginate)

export const Video = models("Video", videoSchema)