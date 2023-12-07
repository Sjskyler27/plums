import SubTopic, { ISubTopic } from '@/data/SubTopic';
import Topic, { ITopic } from '@/data/Topic';
import connect from '@/data/connect';
import mongoose from 'mongoose';

export async function POST(req: Request, { params }: { params: { topicid: string } }) {
  try {
    const body: ISubTopic = await req.json();

    await connect();

    let parentTopic: ITopic | null | undefined = await Topic.findById(params.topicid);
    if (!parentTopic) {
      throw new Error('Unable to find Parent Topic');
    }

    let subTopic = new SubTopic({
      title: body.title,
      description: body.description,
      color: body.color,
      parentTopicID: parentTopic._id,
    });

    let savedSubTopic: ISubTopic = await subTopic.save();
    await mongoose.disconnect();

    return Response.json(savedSubTopic);
  } catch (err) {
    return Response.json(500);
  }
}

export async function GET(req: Request, { params }: { params: { topicid: string } }) {
  try {
      await connect();

      const topic: ITopic | null | undefined = await Topic.findById(params.topicid);
      if (!topic) {
          throw new Error("Unable to find Topic");
      }

      let subTopics: ISubTopic[] = await SubTopic.find({ parentTopicID: params.topicid });
      await mongoose.disconnect();

      return Response.json(subTopics);
  } catch (err) {
      console.error(err);
      return Response.json(err, { status: 500 });
  }
}
