import {Injectable} from "@angular/core";
import {EMPTY, Observable} from "rxjs";
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFirestore} from "@angular/fire/firestore";

import {User} from "../models/user";
import firebase from "firebase/app";
import {ROLES} from "../models/enums";
import {switchMap} from "rxjs/operators";


@Injectable()
export class AuthService {

  user$: Observable<User | undefined>;

  constructor(private afAuth: AngularFireAuth,
              private afs: AngularFirestore) {
    //// Get auth data, then get firestore user document || null
    this.user$ = this.afAuth.authState.pipe(
      switchMap((user: any) => {
        if (user) {
          return this.afs.doc<User>(`users/${user.uid}`).valueChanges()
        } else {
          return EMPTY;
        }
      }))
  }

  ///// Login/Signup //////

  googleLogin() {
    return this.oAuthLogin(new firebase.auth.GoogleAuthProvider());
  }

  private oAuthLogin(provider: any) {
    return this.afAuth.signInWithPopup(provider)
      .then((credential) => {
        this.updateUserData(credential.user)
      })
  }

  signOut() {
    this.afAuth.signOut().then(() => {
      location.reload();
    });
  }

  private updateUserData(user: any) {
    // Sets user data to firestore on login
    /*const userRef: AngularFirestoreDocument<any> = this.afs.doc(`users/${user.uid}`);
    const data: User = {
      uid: user.uid,
      email: user.email,
      photoURL: user.photoURL,
      displayName: user.displayName,
      roles: {
        subscriber: true
      }
    }
    return userRef.set(data, {merge: true})*/
    const userRef = this.afs.firestore.doc(`users/${user.uid}`);
    userRef.get()
      .then(docSnapshot => {
        const data: User = {
          uid: user.uid,
          email: user.email,
          photoURL: user.photoURL,
          displayName: user.displayName,
          roles: {
            subscriber: true
          }
        }
        if (!docSnapshot.exists) {
          userRef.set(data, {merge: true}).then(() => console.log("Welcome to The Debaters"));
        }
      });
  }

///// Role-based Authorization //////
  canRead(user: any) {
    return this.checkAuthorization(user, [ROLES.ADMIN, ROLES.EDITOR, ROLES.SUBSCRIBER])
  }

  canEdit(user: any): boolean {
    return this.checkAuthorization(user, [ROLES.ADMIN, ROLES.EDITOR])
  }

  canDelete(user: any): boolean {
    return this.checkAuthorization(user, [ROLES.ADMIN])
  }


// determines if user has matching role
  checkAuthorization(user: User, allowedRoles: ROLES[]) {
    if (!user) return false;
    for (const role of allowedRoles) {
      if (user.roles[role]) {
        return true
      }
    }
    return false
  }
}
