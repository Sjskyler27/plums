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
    const id: string = req.query.id as string;
    const updatedData: ISubTopic = req.body;

    const subTopic: ISubTopic | null = await SubTopic.findById(id);

    if (!subTopic) {
      return res.status(404).json({ error: 'SubTopic not found' });
    }

    subTopic.title = updatedData.title;
    subTopic.description = updatedData.description;
    subTopic.color = updatedData.color;
    subTopic.links = updatedData.links;
    subTopic.parentTopicID = updatedData.parentTopicID;

    await subTopic.save();
    await mongoose.disconnect();

    res.status(200).json({ message: 'SubTopic updated successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
