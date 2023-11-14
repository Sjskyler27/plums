import { NextApiRequest, NextApiResponse } from 'next';
import SubTopic, { ISubTopic } from '@/data/SubTopic';
import connect from '@/data/connect';
import mongoose from 'mongoose';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connect();
    const subTopics: ISubTopic[] = await SubTopic.find().populate('links'); // Use populate to fetch linked documents
    await mongoose.disconnect();
    res.status(200).json(subTopics);
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
