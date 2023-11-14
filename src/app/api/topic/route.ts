import Topic, { ITopic } from "@/data/Topic";
import connect from "@/data/connect";
import mongoose from "mongoose";

export async function POST(request: Request) {
    await connect();

    const body: ITopic = await request.json();
}

export async function GET() {
    await connect();

    const topics = await Topic.find()

    await mongoose.disconnect();

    return Response.json(topics);
}