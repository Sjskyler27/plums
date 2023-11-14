import { NextApiRequest, NextApiResponse } from 'next';
import SubTopic from '@/data/SubTopic';
import connect from '@/data/connect';
import mongoose from 'mongoose';
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  try {
    await connect();
    const id: string = req.query.id as string;

    const deletedSubTopic = await SubTopic.findByIdAndDelete(id);

    if (!deletedSubTopic) {
      return res.status(404).json({ error: 'SubTopic not found' });
    }

    await mongoose.disconnect();
    res.status(200).json({ message: 'SubTopic deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
