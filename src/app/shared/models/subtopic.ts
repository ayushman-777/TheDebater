import {TopicName} from "./enums";

export class Subtopic {
  topicName: TopicName[];
  subtopicName: string;
  imageUrl: string;
  description: string;
  dateAdded: Date;
  id: string;
  dateRelatedToTopic: Date;

  constructor(args: any) {
    this.topicName = args.topicName;
    this.subtopicName = args.subtopicName;
    this.imageUrl = args.imageUrl;
    this.description = args.description;
    this.dateAdded = args.dateAdded;
    this.id = args.id;
    this.dateRelatedToTopic = args.dateRelatedToTopic;
  }

  static toJson(subtopic: Subtopic) {
    return {
      topicName: subtopic.topicName,
      subtopicName: subtopic.subtopicName,
      imageUrl: subtopic.imageUrl,
      description: subtopic.description,
      dateAdded: subtopic.dateAdded,
      id: subtopic.id,
      dateRelatedToTopic: subtopic.dateRelatedToTopic
    }
  }
}
