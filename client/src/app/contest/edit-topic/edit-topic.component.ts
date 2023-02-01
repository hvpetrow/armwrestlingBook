import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-edit-topic',
  templateUrl: './edit-topic.component.html',
  styleUrls: ['./edit-topic.component.css']
})
export class EditTopicComponent implements OnInit {
  editTopicForm: FormGroup = this.formBuilder.group({
    'title': new FormControl('', [Validators.required, Validators.minLength(4)]),
    'description': new FormControl('', [Validators.required, Validators.minLength(10)]),
    'photoUrl': new FormControl('')
  });

  showErrorInControl(controlName: string, sourceGroup: FormGroup = this.editTopicForm) {
    return sourceGroup.controls[controlName].touched && sourceGroup.controls[controlName].invalid;
  }

  currentUser$ = this.authService.currentUser$;
  userId!: any;
  oldTopic!: any;
  topicId!: string;


  constructor(
    private activatedRoute: ActivatedRoute,
    private formBuilder: FormBuilder,
    private topicService: TopicService,
    private router: Router,
    private authService: AuthService) { }


  ngOnInit(): void {
    this.currentUser$.subscribe(user => this.userId = user?.uid);

    this.activatedRoute.params.subscribe(params => {
      this.topicId = params['topicId'];
    });

    this.topicService.getOneTopic(this.topicId).then((data) => {
      this.oldTopic = data.data();
      this.editTopicForm.controls['title'].setValue(this.oldTopic.title);
      this.editTopicForm.controls['description'].setValue(this.oldTopic.description);
      this.editTopicForm.controls['photoUrl'].setValue(this.oldTopic.photoUrl);
      if (this.oldTopic.creator !== this.userId) {
        this.router.navigate(['/login']);
      }

    });



  }

  async onSubmit() {
    const newTopic = {
      title: this.editTopicForm.value.title,
      description: this.editTopicForm.value.description,
      photoUrl: this.editTopicForm.value.photoUrl ? this.editTopicForm.value.photoUrl : '/assets/topic.jpg',
    }
    try {
      await this.topicService.updateTopic(newTopic, this.topicId);
      this.router.navigate([`/topics/${this.topicId}/details`]);

    } catch (error) {
      console.error(error);
    }
  }
}
