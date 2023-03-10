import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { TopicService } from 'src/app/services/topic.service';
import { from } from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  user$ = this.authService.currentUser$;
  userId!: any;
  objectKeys = Object.keys;
  topics: any;
  constructor(public authService: AuthService, private topicService: TopicService, private router: Router) { }


  ngOnInit(): void {
    this.user$.subscribe((user) => {
      this.userId = user?.uid

    });

    this.getTopics();
  }

  getTopics() {
    const getTopicsHome$ = from(this.topicService.getThreeTopics());
    getTopicsHome$.subscribe((data) => this.topics = data);
  }
}
