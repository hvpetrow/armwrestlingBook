import { AfterContentInit, AfterViewInit, Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { arrayRemove, arrayUnion, collection, doc, serverTimestamp, updateDoc } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';

import { Topic } from 'src/app/interfaces/topic';
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

      this.topicService
        .getOneTopic(this.topicId)
        .then((data) => {
          this.topic = data.data();
          this.isOwner = this.topic.creator == this.userId;
          this.creatorEmail = this.topic.creatorEmail;
        });
    });

    this.getComments();

    setTimeout(() => {
      this.hasLiked = this.topic?.likes?.find((like: string | undefined) => like === this.userId);
    }, 400);
  }



  async likeHandler() {
    const currentTopicRef = doc(this.firestore, "topics", this.topicId);

    try {
      await updateDoc(currentTopicRef, {
        likes: arrayUnion(this.userId)
      });
      this.toast.success('Topic liked!');
      setTimeout(() => {
        this.topicService.getOneTopic(this.topicId).then((data) => {
          this.topic = data.data();
        })
      }, 220);

    } catch (error) {
      console.error(error);
    }

    this.hasLiked = true;
  }

  async cancelLikeHandler() {
    const currentCauseRef = doc(this.firestore, "topics", this.topicId);

    try {
      await updateDoc(currentCauseRef, {
        likes: arrayRemove(this.userId)
      });
      this.toast.success('You have unliked the topic!');
      setTimeout(() => {
        this.topicService.getOneTopic(this.topicId).then((data) => {
          this.topic = data.data();
        })
      }, 220);

    } catch (error) {
      console.error(error);
    }

    this.hasLiked = false;

  }

  async deleteHandler() {
    const answer = confirm('Are you sure you want to delete it?')

    if (answer) {
      try {
        await this.topicService.deleteTopic(this.topicId);
        let comments: any = await this.topicService.getCommentsByTopicId(this.topicId);
        Object.keys(comments).forEach(id => {
          this.topicService.removeComment(id);
        });

        this.router.navigate(['/topics']);
      } catch (error) {
        this.toast.error('Something went wrong!')
      }

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

    try {
      const response = this.topicService.addComment(newComment);
      comment.reset();
      setTimeout(() => {
        this.getComments();
      }, 300);
      this.isShowedComments = true;

    } catch (error) {
      console.error(error);
    }
  }

  async getComments() {
    setTimeout(async () => {
      this.comments = await this.topicService.getCommentsByTopicId(this.topicId);
    }, 10);
  }

  toggleComments() {
    if (this.isShowedComments == true) {
      this.isShowedComments = false;
    } else {
      this.isShowedComments = true;
    }
  }

  deleteComment(commentId: string) {
    try {
      this.topicService.removeComment(commentId);
      setTimeout(async () => {
        this.comments = await this.topicService.getCommentsByTopicId(this.topicId);
      }, 180);

    } catch (error) {
      console.error(error);
    }
  }
}
