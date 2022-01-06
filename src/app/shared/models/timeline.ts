export class Timeline {
  articleDate: Date;
  websiteUrl: string;
  imageUrl: string;
  summary: string;
  id: string;
  addedToTimeline: Date;

  constructor(args: any) {
    this.articleDate = args.articleDate;
    this.websiteUrl = args.websiteUrl;
    this.imageUrl = args.imageUrl;
    this.summary = args.summary;
    this.id = args.id;
    this.addedToTimeline = args.addedToTimeline;
  }

  static toJson(subtopic: Timeline) {
    return {
      articleDate: subtopic.articleDate,
      websiteUrl: subtopic.websiteUrl,
      imageUrl: subtopic.imageUrl,
      summary: subtopic.summary,
      id: subtopic.id,
      addedToTimeline: subtopic.addedToTimeline
    }
  }

  static toJsonArray(timelines: Timeline[]) {
    return timelines.map(timeline => this.toJson(timeline));
  }
}
