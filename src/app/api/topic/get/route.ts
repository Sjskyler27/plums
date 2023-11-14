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
    const topics: ITopic[] = await Topic.find();
    await mongoose.disconnect();
    res.status(200).json(topics);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
