import {Injectable} from "@angular/core";
import {DatabaseInstance} from "../helper/database-instance";
import {AngularFirestore} from "@angular/fire/firestore";
import {TableName} from "../models/table-name.model";
import {Observable} from "rxjs";
import {Article} from "../models/article";
import {map} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class ArticleService {
  public dbInstance: DatabaseInstance;

  constructor(private firestore: AngularFirestore) {
    this.dbInstance = new DatabaseInstance();
    this.dbInstance.setTableName(TableName.ARTICLE, firestore);
  }

  addArticle(article: Article) {
    return this.dbInstance.create(article.id, Article.toJson(article));
  }

  updateArticle(article: Article) {
    return this.dbInstance.update(article.id, Article.toJson(article));
  }

  deleteArticle(articleId: any) {
    return this.dbInstance.delete(articleId);
  }

  getArticle(articleId: any): Observable<any> {
    return this.dbInstance.readAll(ref => ref
      .where('id', '==', articleId))
      .pipe(map(data => data.map(art => new Article(art))));
  }
}
