import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CreateTopicComponent } from './create-topic/create-topic.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditTopicComponent } from './edit-topic/edit-topic.component';
import { CommentsComponent } from './comments/comments.component';
import { DetailsComponent } from './details/details.component';
import { SharedModule } from '../shared/shared.module';
import { RouterModule } from '@angular/router';
import { ContestRoutingModule } from './contest-routing.module';
import { AllTopicsComponent } from './all-topics/all-topics.component';
import { HomeModule } from '../home/home/home.module';
import { SearchComponent } from './search/search.component';
import { TopicTemplateComponent } from './topic-template/topic-template.component';



@NgModule({
  declarations: [
    CreateTopicComponent,
    DetailsComponent,
    EditTopicComponent,
    CommentsComponent,
    AllTopicsComponent,
    SearchComponent,
    TopicTemplateComponent,
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    FormsModule,
    SharedModule,
    RouterModule,
    ContestRoutingModule,
    HomeModule
  ]
})
export class ContestModule { }
