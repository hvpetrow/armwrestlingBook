import { Component, OnInit } from '@angular/core';
import { tap } from 'rxjs';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-all-topics',
  templateUrl: './all-topics.component.html',
  styleUrls: ['./all-topics.component.css']
})
export class AllTopicsComponent implements OnInit {

  objectKeys = Object.keys;
  topics = this.topicService.getAllTopics();

  constructor(
    private topicService: TopicService
  ) { }

  ngOnInit(): void {
  }

}
