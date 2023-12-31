import Topic, { ITopic } from '@/data/Topic';
import connect from '@/data/connect';
import mongoose from 'mongoose';

export async function POST(req: Request) {
  try {
    const body: ITopic = await req.json();
    await connect();
    console.log('body: ', body);

    console.log('body tags: ', body.tags);
    const tags = body.tags || [];
    console.log('assign tags', tags);

    let topic = new Topic({
      title: body.title,
      image: body.image,
      color: body.color,
      tags: tags,
    });
    console.log('topic tags: ', topic.tags);

    topic = await topic.save();
    await mongoose.disconnect();
    return Response.json(topic, { status: 201 });
  } catch (err) {
    return Response.json(err, { status: 500 });
  }
}

export async function GET() {
  try {
    await connect();

    const topics = await Topic.find();

    await mongoose.disconnect();
    return Response.json(topics, { status: 200 });
  } catch (err) {
    return Response.json(err, { status: 500 });
  }
}
