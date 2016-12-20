import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Post } from '../core/models/post.model';
import { PostService } from '../core/post.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, OnDestroy {
  q: string = '';
  posts: Post[];
  sub: Subscription;

  constructor(private postService: PostService) {
  }

  search() {
    this.sub = this.postService.getPosts({ q: this.q }).subscribe(
      res => this.posts = res
    );
  }

  ngOnInit() {
    this.search();
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}
/*
import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Post } from '../core/post.model';
import { PostService } from '../core/post.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'app-posts',
  templateUrl: './posts.component.html',
  styleUrls: ['./posts.component.css']
})
export class PostsComponent implements OnInit, OnDestroy {
  q:FormControl;
  posts: Post[];
  sub: Subscription;

  constructor(private postService: PostService) {
    this.q.valueChanges
           .debounceTime(500)
           .distinctUntilChanged()
           .flatMap(term => this.postService.getPosts({ q: term }))
           .subscribe((res: Array<Post>) => this.posts = res);
  }

  ngOnInit() {
     this.sub = this.postService.getPosts(null).subscribe(
      res => this.posts = res
    );
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }
}

*/
