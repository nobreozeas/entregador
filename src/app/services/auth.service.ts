import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/auth';
import { User } from '../interfaces/user';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  constructor(private afa: AngularFireAuth, private afs: AngularFirestore) { }

  login(user: User) {
    return this.afa.auth.signInWithEmailAndPassword(user.email, user.password);
  }

  async register(user: User) {
    try{
      const newUser = await this.afa.auth.createUserWithEmailAndPassword(user.email, user.password);

      const newUserObject = Object.assign({}, user);
      delete newUserObject.password;
      await this.afs.collection('usuarios').doc(newUser.user.uid).set(newUserObject);
      console.log('Usuario com sucesssssss')
    }catch(error){
      console.error(error);
    }
  }

  logout() {
    return this.afa.auth.signOut();
  }

  getAuth() {
    return this.afa.auth;
  }
}