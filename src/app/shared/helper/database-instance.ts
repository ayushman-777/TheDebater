import {Injectable} from '@angular/core';
import {AngularFirestore, QueryFn} from '@angular/fire/firestore';
import {Observable} from 'rxjs';

@Injectable(
  {
    providedIn: 'root'
  }
)
export class DatabaseInstance {

  tableName: any;
  firestore: any;

  constructor() {
  }

  setTableName(tableName: string, firestore: AngularFirestore) {
    this.tableName = tableName;
    this.firestore = firestore;
  }

  create(documentReference: string, data: any) {
    // this.setAuditFields(data, true);
    return this.firestore.collection(this.tableName).doc(documentReference).set(data);
  }

  read(documentReference: string): Observable<any> {
    return this.firestore.collection(this.tableName).doc(documentReference).valueChanges();
  }

  readAll(query?: QueryFn): Observable<any[]> {
    return this.firestore.collection(this.tableName, query).valueChanges();
  }

  update(documentReference: string, data: any) {
    // this.setAuditFields(data);
    return this.firestore.collection(this.tableName).doc(documentReference).update(data);
  }

  delete(documentReference: string) {
    return this.firestore.collection(this.tableName).doc(documentReference).delete();
  }

  // protected setAuditFields(data: any, setCreatedBy?: boolean) {
  //     data.modifiedBy = this.contextService.currentUser
  //         ? this.contextService.currentUser.email : `Customer@${this.contextService.merchant
  //             ? this.contextService.merchant.name : 'TheDebater'}`;
  //     data.modifiedOn = new Date();
  //     if (setCreatedBy) {
  //       data.createdBy = this.contextService.currentUser
  //         ? this.contextService.currentUser.email : `Customer@${this.contextService.merchant
  //           ? this.contextService.merchant.name : 'TheDebater'}`;
  //       data.createdOn = new Date();
  //     }
  // }

}
