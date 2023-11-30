import LinkModel, { ILinkModel } from '@/data/Links';
import connect from '@/data/connect';
import mongoose from 'mongoose';

export async function POST(request: Request) {
  await connect();

  const body: ILinkModel = await request.json();

  const link = new LinkModel({
    text: body.text,
    type: body.type,
    url: body.url,
    parentID: body.parentID,
  });

  console.log('trying to post: ', link);
  await link.save();
  await mongoose.disconnect();

  // Return a response indicating success
  return Response.json(link);
}

export async function GET() {
  await connect();

  const links = await LinkModel.find();

  await mongoose.disconnect();

  return Response.json(links);
}
