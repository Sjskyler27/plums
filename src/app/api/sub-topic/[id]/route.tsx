import SubTopic, { ISubTopic } from "@/data/SubTopic";
import Topic, { ITopic } from "@/data/Topic";
import connect from "@/data/connect";
import mongoose from "mongoose";

export async function GET(req: Request, { params }: { params: { id: string } }) {
    try {
        await connect();

        const topic: ITopic | null | undefined = await Topic.findById(params.id);
        if (!topic) {
            throw new Error("Unable to find Topic");
        }

        let subTopics: ISubTopic[] = await SubTopic.find({ parentTopicID: params.id });
        await mongoose.disconnect();

        return Response.json(subTopics);
    } catch (err) {
        console.error(err);
        return Response.json(err, { status: 500 });
    }
}