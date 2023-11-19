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
  });

  await link.save();
  await mongoose.disconnect();
}

export async function GET() {
  await connect();

  const links = await LinkModel.find();

  await mongoose.disconnect();

  return Response.json(links);
}
