import { Component, Input, OnInit } from '@angular/core';
import { Topic } from 'src/app/interfaces/topic';

@Component({
  selector: 'app-topic-card',
  templateUrl: './topic-card.component.html',
  styleUrls: ['./topic-card.component.css']
})
export class TopicCardComponent implements OnInit {

  @Input() topic!: any;
  @Input() topicId!: string;

  constructor() { }

  ngOnInit(): void {
  }

}
