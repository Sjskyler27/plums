import SubTopic, { ISubTopic } from '@/data/SubTopic';
import Topic from '@/data/Topic';
import connect from '@/data/connect';
import mongoose from 'mongoose';

export async function POST(req: Request) {
  try {
    const body: ISubTopic = await req.json();

    await connect();

    let parentTopic = await Topic.findById(body.parentTopicID);
    if (!parentTopic) {
      throw new Error('Unable to find Parent Topic');
    }

    let subTopic = new SubTopic({
      title: body.title,
      description: body.description,
      color: body.color,
      parentTopicID: body.parentTopicID,
    });

    let savedSubTopic: ISubTopic = await subTopic.save();
    await mongoose.disconnect();

    return Response.json(savedSubTopic);
  } catch (err) {
    return Response.json(500);
  }
}
