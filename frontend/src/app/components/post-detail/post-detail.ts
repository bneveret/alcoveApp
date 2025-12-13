import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { PostsService } from '../../services/posts.service';
import { SupportService } from '../../services/support.service';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { HttpClient } from '@angular/common/http';

interface Post {
  _id: string;
  title: string;
  content: string;
  tags: string[];
  supportCount: number;
  createdAt: string;
}

@Component({
  selector: 'app-post-detail',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule],
  templateUrl: './post-detail.html'
})
export class PostDetailComponent implements OnInit {
  post: Post | null = null;
  loading = true;
  editForm: FormGroup;
  message: string | null = null;
  supported = false;

  constructor(
    private postsService: PostsService,
    private supportService: SupportService,
    private route: ActivatedRoute,
    private router: Router,
    private http: HttpClient
  ) {
      this.editForm = new FormGroup({
        title: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
        content: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(2000)]),
        token: new FormControl('', Validators.required)
      });
    }

  ngOnInit() {
    const postId = this.route.snapshot.paramMap.get('id');
    if (postId) this.fetchPost(postId);
  }

  fetchPost(postId: string) {
    this.loading = true;
    this.http.get<Post>(`/api/posts/${postId}`).subscribe({
      next: (res) => {
        this.post = res;
        this.editForm.patchValue({ title: res.title, content: res.content });
        this.loading = false;
      },
      error: () => {
        this.message = 'Failed to load post';
        this.loading = false;
      }
    });
  }

  updatePost() {
  if (!this.post) return;
  const payload = this.editForm.value;
  this.postsService.updatePost(this.post._id, payload).subscribe({
    next: () => { this.message = 'Post updated successfully'; this.fetchPost(this.post!._id); },
    error: err => { this.message = 'Update failed: ' + (err.error?.error || err.message); }
  });
}

  deletePost() {
  if (!this.post) return;
  const token = this.editForm.value.token;
  if (!token) { this.message = 'Anonymous token required'; return; }
  this.postsService.deletePost(this.post._id, token).subscribe({
    next: () => { this.message = 'Post deleted'; setTimeout(() => this.router.navigate(['/posts']), 1000); },
    error: err => { this.message = 'Delete failed: ' + (err.error?.error || err.message); }
  });
}

  supportPost() {
  if (!this.post) return;
  this.supportService.supportPost(this.post._id).subscribe({
    next: res => { this.post!.supportCount = res.supportCount; this.supported = true; },
    error: () => { this.message = 'You have already supported this post'; this.supported = true; }
  });
}
}
