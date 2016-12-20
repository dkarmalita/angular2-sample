import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Post } from '../core/models/post.model';
import { PostService } from '../core/post.service';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css']
})
export class EditPostComponent implements OnInit, OnDestroy {
  data: Post = { title: '', body: '' };
  sub: Subscription;
  id: number;

  constructor(
    private postService: PostService,
    private router: Router,
    private route: ActivatedRoute
   ) { }

  save() {
    let _body = { title: this.data.title, body: this.data.body };

    this.postService
      .updatePost(this.id, _body)
      .subscribe(res => this.router.navigate(['', 'posts']));
  }

  ngOnInit() {
    this.sub = this.route.params
      .flatMap(params => {
        this.id = params['id'];
        return this.postService.getPost(this.id);
      })
      .subscribe((res: Post) => this.data = res);
  }

  ngOnDestroy() {
    this.sub.unsubscribe();
  }

  hasChanges() {
    console.log(this.data)
//    console.log(!title.pristine || !home.pristine)
    return true;
  }
}
