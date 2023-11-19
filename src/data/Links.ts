import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface ILinkModel extends mongoose.Document {
  text: string;
  type: string;
  url: string;
  parentID: string;
}

const LinkModelSchema = new Schema({
  text: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  url: {
    type: String,
    required: true,
  },
  parentID: {
    type: String,
    required: true,
  },
});

const LinkModel =
  mongoose.models.LinkModel ||
  mongoose.model<ILinkModel>('LinkModel', LinkModelSchema);
export default LinkModel;
