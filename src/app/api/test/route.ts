import Topic from "@/data/Topic";
import connect from "@/data/connect";
import mongoose from "mongoose";

export async function POST() {
    await connect();
    const data = {
        title: 'English',
        image: 'math.jpg',
        color: '#123456',
    };

    const topic = new Topic({
        title: data.title,
        image: data.image,
        color: data.color
    });

    await topic.save();
    await mongoose.disconnect();

    return Response.json(201);
}
