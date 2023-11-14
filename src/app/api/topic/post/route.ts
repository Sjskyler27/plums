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
    const data: ITopic = req.body;

    const topic = new Topic({
      title: data.title,
      image: data.image,
      color: data.color,
    });

    await topic.save();
    await mongoose.disconnect();

    res.status(201).json({ message: 'Topic created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
