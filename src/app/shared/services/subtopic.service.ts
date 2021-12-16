import {Injectable} from "@angular/core";
import {TableName} from "../models/table-name.model";
import {AngularFirestore} from "@angular/fire/firestore";
import {Subtopic} from "../models/subtopic";
import {Observable} from "rxjs";
import {map} from "rxjs/operators";
import {DatabaseInstance} from "../helper/database-instance";

@Injectable({
  providedIn: 'root'
})
export class SubtopicService {

  public dbInstance: DatabaseInstance;

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

}
