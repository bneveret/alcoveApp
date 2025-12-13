import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  template: `
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3>Create a New Post</h3>
      </div>
      <div class="panel-body">
        <form [formGroup]="postForm" (ngSubmit)="submit()">
          <div class="form-group">
            <label for="title">Title</label>
            <input id="title" type="text" class="form-control" formControlName="title">
            <div *ngIf="postForm.controls['title'].invalid && postForm.controls['title'].touched" class="text-danger">
              Title is required (3-100 characters)
            </div>
          </div>

          <div class="form-group">
            <label for="content">Content</label>
            <textarea id="content" class="form-control" rows="5" formControlName="content"></textarea>
            <div *ngIf="postForm.controls['content'].invalid && postForm.controls['content'].touched" class="text-danger">
              Content is required (10-2000 characters)
            </div>
          </div>

          <div class="form-group">
            <label>Tags</label>
            <div class="checkbox" *ngFor="let tag of allowedTags">
              <label>
                <input type="checkbox" [value]="tag" (change)="toggleTag(tag, $event)"> {{ tag }}
              </label>
            </div>
          </div>

          <button type="submit" class="btn btn-primary" [disabled]="postForm.invalid">Post</button>
        </form>

        <div *ngIf="successToken" class="alert alert-success" style="margin-top:15px;">
          Post created successfully! Your anonymous token is:
          <strong>{{ successToken }}</strong>
          <br>
          Keep it safe to edit/delete your post later.
        </div>
      </div>
    </div>
  `
})
export class PostCreateComponent {
  postForm: FormGroup;
  selectedTags: string[] = [];
  successToken: string | null = null;

  allowedTags = ['anxiety','depression','burnout','stress','loneliness','grief','self-esteem','other'];

  constructor(private http: HttpClient) {
    this.postForm = new FormGroup({
      title: new FormControl('', [Validators.required, Validators.minLength(3), Validators.maxLength(100)]),
      content: new FormControl('', [Validators.required, Validators.minLength(10), Validators.maxLength(2000)]),
      tags: new FormControl([])
    });
  }

  toggleTag(tag: string, event: any) {
    if (event.target.checked) {
      this.selectedTags.push(tag);
    } else {
      this.selectedTags = this.selectedTags.filter(t => t !== tag);
    }
    this.postForm.controls['tags'].setValue(this.selectedTags);
  }

  submit() {
    if (this.postForm.invalid) return;

    this.http.post<{id: string, anonymousToken: string}>('/api/posts', this.postForm.value).subscribe({
      next: (res) => {
        this.successToken = res.anonymousToken;
        this.postForm.reset();
        this.selectedTags = [];
      },
      error: (err) => {
        alert('Failed to create post: ' + (err.error?.error || err.message));
      }
    });
  }
}
