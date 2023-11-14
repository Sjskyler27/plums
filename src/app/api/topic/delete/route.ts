import { NextApiRequest, NextApiResponse } from 'next';
import Topic from '@/data/Topic';
import connect from '@/data/connect';
import mongoose from 'mongoose';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connect();
    const id: string = req.query.id as string;

    const deletedTopic = await Topic.findByIdAndDelete(id);

    if (!deletedTopic) {
      return res.status(404).json({ error: 'Topic not found' });
    }

    await mongoose.disconnect();
    res.status(200).json({ message: 'Topic deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
