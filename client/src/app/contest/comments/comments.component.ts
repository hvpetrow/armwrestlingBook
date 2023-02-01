import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnInit {

  @Input() commentId: any;
  @Input() comments: any;
  @Input() user: any;
  @Output() deleteComment = new EventEmitter<string>();

  isOwner: boolean = false;

  ngOnInit(): void {
    setTimeout(() => {
      this.isOwner = this.comments[this.commentId].ownerId == this.user?.uid;
    }, 150);
  }



  async deleteHandler() {

    const confirmation = confirm(`Are you sure you want to delete your comment?`);
    if (confirmation) {
      this.deleteComment.emit(this.commentId);
    }
  }
}
