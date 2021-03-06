import { Component, OnInit, OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';

import { Post } from '../post.model';
import { PostsService } from '../posts.service';

@Component({
  selector: 'app-post-list',
  templateUrl: './post-list.component.html',
  styleUrls: ['./post-list.component.css']
})
export class PostListComponent implements OnInit, OnDestroy {

 /* posts = [
    {title: 'First Post', content: 'this is te first post\'s content'},
    {title: 'Second Post', content: 'this is te second post\'s content'},
    {title: 'Third Post', content: 'this is te third post\'s content'},

  ];*/

 posts: Post[] = [];
 private postsSubscription: Subscription;

  constructor(public postsService: PostsService) { }

  ngOnInit() {
    this.posts = this.postsService.getPosts();
    this.postsSubscription = this.postsService.getPostUpdateListener()
                      .subscribe((posts: Post[]) => {
                        this.posts = posts;
                      });
  }

  ngOnDestroy ( ) {
    this.postsSubscription.unsubscribe();
  }

}
