export class Timeline {
  articleDate: Date;
  websiteUrl: string;
  summary: string;

  constructor(args: any) {
    this.articleDate = args.articleDate;
    this.websiteUrl = args.websiteUrl;
    this.summary = args.summary;
  }

  static toJson(subtopic: Timeline) {
    return {
      topicName: subtopic.articleDate,
      subtopicName: subtopic.websiteUrl,
      imageUrl: subtopic.summary
    }
  }

  static toJsonArray(orderItems: Timeline[]) {
    return orderItems.map(item => this.toJson(item));
  }
}
