import Topic, { ITopic } from '@/data/Topic';
import connect from '@/data/connect';
import mongoose from 'mongoose';

export async function PUT(
  req: Request,
  { params }: { params: { topicid: string } }
) {
  try {
    const body: ITopic = await req.json();

    await connect();
    let topic: ITopic | null | undefined = await Topic.findById(params.topicid);
    if (!topic) {
      throw new Error('Unable to find data');
    }

    topic.title = body.title;
    topic.image = body.image;
    topic.color = body.color;

    topic = await topic.save();
    await mongoose.disconnect();

    return Response.json(topic);
  } catch (err) {
    console.error(err);
    return Response.json(500);
  }
}

export async function DELETE(
  req: Request,
  { params }: { params: { topicid: string } }
) {
  console.log('deleting: ', params.topicid);
  try {
    await connect();
    const result = await Topic.deleteOne({ _id: params.topicid });
    await mongoose.disconnect();

    return new Response('Topic deleted successfully', { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response('Internal Server Error', { status: 500 });
  }
}
