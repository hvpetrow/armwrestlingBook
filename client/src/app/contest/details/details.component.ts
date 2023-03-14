import { AfterViewInit, OnChanges, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { arrayRemove, arrayUnion, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';
import { Observable, from } from 'rxjs';

import { AuthService } from 'src/app/services/auth.service';
import { TopicService } from 'src/app/services/topic.service';
import { NgControl } from '@angular/forms';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  topicRef = collection(this.firestore, 'topics');
  topicId!: string;
  topic!: any;
  user$ = this.authService.currentUser$;
  userId!: any;
  currentUserEmail!: any;
  hasLiked!: Boolean;
  isOwner!: boolean;
  creatorEmail!: string;
  comments!: any;
  objectKeys = Object.keys;
  commentsArr = [];
  commentCount: any;
  isShowedComments: boolean = false;


  constructor(private activatedRoute: ActivatedRoute, private authService: AuthService, public firestore: Firestore, private topicService: TopicService, private router: Router, public toast: HotToastService) { }

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      this.userId = user?.uid;
      this.currentUserEmail = user?.email;
    });

    this.activatedRoute.params.subscribe(params => {
      this.topicId = params['topicId'];
    });

    from(this.topicService
      .getOneTopic(this.topicId))
      .subscribe({
        next: res => {
          this.topic = res.data();
          this.isOwner = this.topic.creator == this.userId;
          this.creatorEmail = this.topic.creatorEmail;
        },
        error: err => {
          console.error(err.message);
        },
        complete: () => this.hasLiked = this.topic?.likes?.find((like: string | undefined) => like === this.userId)
      });

    this.getComments();
  }

  likeHandler() {
    const currentTopicRef = doc(this.firestore, "topics", this.topicId);

    from(updateDoc(currentTopicRef, {
      likes: arrayUnion(this.userId)
    })).subscribe();

    this.toast.success('Topic liked!');

    from(this.topicService.getOneTopic(this.topicId)).subscribe({
      next: data => {
        this.topic = data.data();
      },
      error: err => console.error(err.message)
    });

    this.hasLiked = true;
  }

  cancelLikeHandler() {
    const currentCauseRef = doc(this.firestore, "topics", this.topicId);

    const cancelLike$ = from(updateDoc(currentCauseRef, {
      likes: arrayRemove(this.userId)
    }));

    cancelLike$.subscribe({
      error: err => console.error(err)
    });

    this.toast.success('You have unliked the topic!');

    const getTopic$ = from(this.topicService.getOneTopic(this.topicId));
    getTopic$.subscribe((data) => this.topic = data.data());
    this.hasLiked = false;
  }

  deleteHandler() {
    const answer = confirm('Are you sure you want to delete it?')

    if (answer) {
      const deleteTopic$ = from(this.topicService.deleteTopic(this.topicId));
      deleteTopic$.subscribe({ error: err => console.error(err) });
      let comments: any = from(this.topicService.getCommentsByTopicId(this.topicId)).subscribe({ error: err => console.error(err) });
      Object.keys(comments).forEach(id => {
        this.topicService.removeComment(id);
      });

      this.router.navigate(['/topics']);


      this.toast.success('Topic deleted successfully');
      this.router.navigate(['/']);
    }
  }

  postComment(comment: NgControl) {
    const newComment = {
      content: comment.value,
      createdAt: serverTimestamp(),
      ownerId: this.userId,
      ownerEmail: this.currentUserEmail,
      topicId: this.topicId
    }

    const response = this.topicService.addComment(newComment);
    comment.reset();
    this.getComments();
    this.isShowedComments = true;

  }

  getComments() {
    const getComments$ = from(this.topicService.getCommentsByTopicId(this.topicId));
    getComments$.subscribe((data) => this.comments = data);
  }

  toggleComments() {
    if (this.isShowedComments == true) {
      this.isShowedComments = false;
    } else {
      this.isShowedComments = true;
    }
  }

  deleteComment(commentId: string) {
    const getComments$ = from(this.topicService.getCommentsByTopicId(this.topicId));
    this.topicService.removeComment(commentId);
    getComments$.subscribe((data) => this.comments = data);
  }
}
