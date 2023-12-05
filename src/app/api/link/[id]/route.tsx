import LinkModel, { ILinkModel } from '@/data/Links';
import SubTopic, { ISubTopic } from '@/data/SubTopic';
import connect from '@/data/connect';
import mongoose from 'mongoose';

export async function PUT(
  req: Request,
  { params }: { params: { id: string } } //id being the id of the actual link
) {
  try {
    const body: ILinkModel = await req.json();

    await connect();
    const link: ILinkModel | null | undefined = await LinkModel.findById(
      params.id
    );
    if (!link) {
      throw new Error('Unable to find link');
    }

    link.text = body.text;
    link.type = body.type;
    link.url = body.url;

    const savedLink = await link.save();
    await mongoose.disconnect();

    return Response.json(savedLink);
  } catch (err) {
    console.error(err);
    return Response.json(500);
  }
}
export async function GET( //gets links associated with a subtopic
  req: Request,
  { params }: { params: { id: string } }
) {
  // id being the id of the subtopic that we are looking at
  console.log('route getting links for:  ', params.id);
  try {
    await connect();

    const topic: ISubTopic | null | undefined = await SubTopic.findById(
      params.id
    );
    if (!topic) {
      throw new Error('Unable to find sub-topic');
    }

    let links: ILinkModel[] = await LinkModel.find({ parentID: params.id });
    await mongoose.disconnect();

    return Response.json(links);
  } catch (err) {
    console.error(err);
    return Response.json(err, { status: 500 });
  }
}
export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  console.log('deleting: ', params.id);
  try {
    await connect();
    const result = await LinkModel.deleteOne({ _id: params.id });
    await mongoose.disconnect();

    return new Response('Topic deleted successfully', { status: 200 });
  } catch (err) {
    console.error(err);
    return new Response('Internal Server Error', { status: 500 });
  }
}
