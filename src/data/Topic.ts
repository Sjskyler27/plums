import mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface ITopic extends mongoose.Document {
    title: string;
    image: string;
    color: string;
}

const topicSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    color: {
        type: String,
        required: true
    }
});

const Topic = mongoose.model<ITopic>("Topic", topicSchema);
export default Topic;