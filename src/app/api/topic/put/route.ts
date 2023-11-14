import { NextApiRequest, NextApiResponse } from 'next';
import Topic, { ITopic } from '@/data/Topic';
import connect from '@/data/connect';
import mongoose from 'mongoose';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connect();
    const id: string = req.query.id as string;
    const updatedData: ITopic = req.body;

    const topic: ITopic | null = await Topic.findById(id);

    if (!topic) {
      return res.status(404).json({ error: 'Topic not found' });
    }

    topic.title = updatedData.title;
    topic.image = updatedData.image;
    topic.color = updatedData.color;

    await topic.save();
    await mongoose.disconnect();

    res.status(200).json({ message: 'Topic updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
