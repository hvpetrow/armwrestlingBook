import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-topic-template',
  templateUrl: './topic-template.component.html',
  styleUrls: ['./topic-template.component.css']
})
export class TopicTemplateComponent implements OnInit {

  @Input() topic!: any;
  @Input() topicId!: string;
  @Input() topics!: any;


  constructor() { }

  ngOnInit(): void {
    console.log(this.topics);
    console.log(this.topic);


  }

}
