import LinkModel from "./LinkModel";

export default interface TopicModel {
  title: string;
  description: string;
  linkList: LinkModel[];
  color: string;
}
