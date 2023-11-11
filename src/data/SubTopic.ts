import mongoose from "mongoose";

const Schema = mongoose.Schema;

export interface ILinkModel extends mongoose.Document {
    text: string;
    type: string;
    url: string;
}

const LinkModelSchema = new Schema({
    text: {
        type: String,
        required: true
    },
    type: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    }
});

export interface ISubTopic extends mongoose.Document {
    title: string;
    description: string | undefined | null;
    color: string;
    links: ILinkModel[];
}

const subTopicSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    description: String,
    color: {
        type: String,
        required: true
    },
    links: [LinkModelSchema]
});

const SubTopic = mongoose.model<ISubTopic>("SubTopic", subTopicSchema);
export default SubTopic;