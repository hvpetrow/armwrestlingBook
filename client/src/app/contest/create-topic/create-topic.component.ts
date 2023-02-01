import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HotToastService } from '@ngneat/hot-toast';
import { serverTimestamp } from 'firebase/firestore';
import { AuthService } from 'src/app/services/auth.service';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-create-topic',
  templateUrl: './create-topic.component.html',
  styleUrls: ['./create-topic.component.css']
})
export class CreateTopicComponent implements OnInit {

  createContestForm!: FormGroup;
  user$ = this.authService.currentUser$;
  userId!: any;
  userEmail!: any;

  constructor(private fb: FormBuilder, private authService: AuthService, private topicService: TopicService, private router: Router, public toast: HotToastService) { }

  ngOnInit(): void {
    this.user$.subscribe((user) => {
      this.userId = user?.uid;
      this.userEmail = user?.email;
    });

    this.createContestForm = this.fb.group({
      title: new FormControl('', [Validators.required]),
      photoUrl: new FormControl(''),
      description: new FormControl('', [Validators.required]),
    });
  }

  async onSubmit() {
    console.log(this.createContestForm.value);

    const newContest = {
      ...this.createContestForm.value,
      photoUrl: this.createContestForm.value.photoUrl ? this.createContestForm.value.photoUrl : 'https://t4.ftcdn.net/jpg/03/00/72/73/360_F_300727300_Ka42rZjGY5xqq6cOp89bzagXWx3bVfwg.jpg',
      creator: this.userId,
      comments: [],
      likes: [],
      creatorEmail: this.userEmail,
      createdAt: serverTimestamp()
    }

    console.log(newContest);

    try {
      const response = await this.topicService.addTopic(newContest);
      console.log(response);

    } catch (error) {
      this.toast.error('Something went wrong!')
    }

    this.toast.success('Contest added successfully');
    this.router.navigate(['/']);
  }
}
