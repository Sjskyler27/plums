import mongoose from 'mongoose';

const Schema = mongoose.Schema;

export interface ISubTopic extends mongoose.Document {
  title: string;
  description: string | undefined | null;
  color: string;
  parentTopicID: string;
}

const subTopicSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  color: {
    type: String,
    required: true,
  },
  parentTopicID: {
    type: String,
    required: true
  }
});

const SubTopic =
  mongoose.models.SubTopic ||
  mongoose.model<ISubTopic>('SubTopic', subTopicSchema);
export default SubTopic;
