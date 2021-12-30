import {Injectable} from "@angular/core";
import {TableName} from "../models/table-name.model";
import {AngularFirestore} from "@angular/fire/firestore";
import {Subtopic} from "../models/subtopic";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {DatabaseInstance} from "../helper/database-instance";
import {Article} from "../models/article";

@Injectable({
  providedIn: 'root'
})
export class SubtopicService {

  dbInstance: DatabaseInstance;
  subtopic: any;

  constructor(private firestore: AngularFirestore) {
    this.dbInstance = new DatabaseInstance();
    this.dbInstance.setTableName(TableName.SUBTOPICS, firestore);
  }

  addSubtopic(subtopic: Subtopic) {
    return this.dbInstance.create(subtopic.id, Subtopic.toJson(subtopic));
  }

  updateSubtopic(subtopic: Subtopic) {
    return this.dbInstance.update(subtopic.id, Subtopic.toJson(subtopic));
  }

  deleteSubtopic(subtopicId: any) {
    return this.dbInstance.delete(subtopicId);
  }

  getAllSubtopics(): Observable<any> {
    return this.dbInstance.readAllNC();
  }

  getSubtopic(subtopicId: any): Observable<any> {
    return this.dbInstance.readAll(ref => ref
      .where('id', '==', subtopicId))
      .pipe(map(data => data.map(art => new Article(art))));
  }
}
