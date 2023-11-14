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
    const data: ISubTopic = req.body;

    const subTopic = new SubTopic({
      title: data.title,
      description: data.description,
      color: data.color,
      links: data.links,
      parentTopicID: data.parentTopicID,
    });

    await subTopic.save();
    await mongoose.disconnect();

    res.status(201).json({ message: 'SubTopic created successfully' });
  } catch (error) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
}
