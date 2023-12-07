import SubTopic, { ISubTopic } from "@/data/SubTopic";
import Topic, { ITopic } from "@/data/Topic";
import connect from "@/data/connect";
import mongoose from "mongoose";

export async function PUT(req: Request, { params }: { params : { topicid: string, subtopicid: string } }) {
    try {
        let body: ISubTopic = await req.json();
        await connect();

        const topic: ITopic | null | undefined = await Topic.findById(params.topicid);
        if (!topic) {
            throw new Error("Unable to find Topic");
        }

        let subTopic: ISubTopic | null | undefined = await SubTopic.findOne({ _id: params.subtopicid, parentTopicID: params.topicid });
        if (!subTopic) {
            throw new Error("Unable to find Subtopic");
        }

        subTopic.title = body.title || subTopic.title;
        subTopic.description = body.description || subTopic.description;
        subTopic.color = body.color || subTopic.color;

        subTopic = await subTopic.save();
        await mongoose.disconnect();

        return Response.json(subTopic);
    } catch (err) {
        return Response.json(err, { status: 500 });
    }
}

export async function DELETE(req: Request, { params }: { params : { topicid: string, subtopicid: string } }) {
    try {
        const topic: ITopic | null | undefined = await Topic.findById(params.topicid);
        if (!topic) {
            throw new Error("Unable to find Topic");
        }

        let subTopic: ISubTopic | null | undefined = await SubTopic.findOne({ _id: params.subtopicid, parentTopicID: params.topicid });
        if (!subTopic) {
            throw new Error("Unable to find Subtopic");
        }
        
    } catch (err) {
        return Response.json(err, {status: 500});
    }
}