import { AfterViewInit, Component, EventEmitter, Input, OnChanges, OnInit, Output } from '@angular/core';
import { TopicService } from 'src/app/services/topic.service';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent implements OnChanges {

  @Input() commentId: any;
  @Input() comments: any;
  @Input() user: any;
  @Output() deleteComment = new EventEmitter<string>();

  isOwner: boolean = false;

  ngOnChanges(): void {
    this.isOwner = this.comments[this.commentId].ownerId == this.user?.uid;
  }

  async deleteHandler() {

    const confirmation = confirm(`Are you sure you want to delete your comment?`);
    if (confirmation) {
      this.deleteComment.emit(this.commentId);
    }
  }
}
