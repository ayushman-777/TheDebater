import {Timeline} from "./timeline";

export class Article {
  id: string;
  timeline: Timeline[];

  constructor(args: any) {
    this.id = args.id;
    this.timeline = args.timeline ? args.timeline.map((item: any) => new Timeline(item)) : new Array<Timeline>();
  }

  static toJson(article: Article) {
    return {
      id: article.id,
      timeline: article.timeline.map(order => Timeline.toJson(order))
    }
  }
}
