import { Injectable } from '@angular/core';
import { collectionData, Firestore } from '@angular/fire/firestore';
import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, limit, orderBy, query, updateDoc, where } from 'firebase/firestore';
import { getAll } from 'firebase/remote-config';
import { Observable } from 'rxjs';
import { Topic } from '../interfaces/topic';
import { AngularFireObject, AngularFireDatabase } from '@angular/fire/compat/database'

@Injectable({
  providedIn: 'root'
})
export class TopicService {
  topicRef = collection(this.firestore, 'topics');
  commentRef = collection(this.firestore, 'comments');

  constructor(private firestore: Firestore) { }

  addTopic(newTopic: Topic) {
    return addDoc(this.topicRef, newTopic);
  }

  async getAllTopics() {

    const res = {} as any;
    const q = query(this.topicRef, orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const id = doc.id;
      res[id] = doc.data();
    });
    return res;
  }

  getOneTopic(topicId: string) {
    return getDoc(doc(this.firestore, `topics/${topicId}`));
  }

  async getThreeTopics() {
    const result = {} as any;
    const q = query(this.topicRef, orderBy('createdAt', 'desc'), limit(3));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const id = doc.id;
      result[id] = doc.data();
    });


    return result;
  }

  deleteTopic(id: string) {
    return deleteDoc(doc(this.firestore, `topics/${id}`));
  }

  updateTopic(updatedTopic: any, oldTopicId: string) {
    return updateDoc(doc(this.firestore, `topics/${oldTopicId}`), updatedTopic);
  }

  addComment(comment: any) {
    const res = addDoc(this.commentRef, comment);
    return res;
  }

  async getTopicsByOwnerId(ownerId: any) {
    const result = {} as any;
    const q = query(this.topicRef, where("creator", "==", ownerId), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const id = doc.id;
      result[id] = doc.data();
    });

    return result;
  }

  async getCommentsByTopicId(topicId: string) {
    const result = {} as any;
    const q = query(this.commentRef, where("topicId", "==", topicId), orderBy('createdAt', 'desc'));
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
      const id = doc.id;
      result[id] = doc.data();
    });

    return result;
  }


  removeComment(commentId: string) {
    return deleteDoc(doc(this.firestore, `comments/${commentId}`));
  }

}