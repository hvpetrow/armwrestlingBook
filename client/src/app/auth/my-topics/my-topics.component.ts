import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-my-topics',
  templateUrl: './my-topics.component.html',
  styleUrls: ['./my-topics.component.css']
})
export class MyTopicsComponent implements OnInit {

  currentUser$: Observable<any> = this.authService.currentUser$;
  userId!: string;
  objectKeys = Object.keys;
  topics: any;

  constructor(
    private topicService: TopicService,
    private authService: AuthService
  ) { }

  ngOnInit(): void {
    this.currentUser$.subscribe(user => this.userId = user?.uid);
    this.getMyTopics();
  }

  async getMyTopics() {
    setTimeout(async () => {
      this.topics = await this.topicService.getTopicsByOwnerId(this.userId);
    }, 50);
  }

}
