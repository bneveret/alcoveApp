import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  ReactiveFormsModule,
  FormGroup,
  FormControl,
  Validators
} from '@angular/forms';
import { PostsService } from '../../services/posts.service';

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './post-create.html'
})
export class PostCreateComponent {
  postForm: FormGroup;
  successToken: string | null = null;
  errorMessage: string | null = null;
  isSubmitting = false;

  constructor(private postsService: PostsService) {
    this.postForm = new FormGroup({
      title: new FormControl('', [
        Validators.required,
        Validators.minLength(3),
        Validators.maxLength(100)
      ]),
      content: new FormControl('', [
        Validators.required,
        Validators.minLength(10),
        Validators.maxLength(2000)
      ])
    });
  }

  submit() {
    if (this.postForm.invalid || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = null;

    const payload = {
      title: this.postForm.value.title.trim(),
      content: this.postForm.value.content.trim()
    };

    this.postsService.createPost(payload).subscribe({
      next: (res) => {
        this.successToken = res.anonymousToken;
        this.postForm.reset();
        this.isSubmitting = false;
      },
      error: (err) => {
        this.errorMessage =
          err.error?.error || 'Failed to create post';
        this.isSubmitting = false;
      }
    });
  }
}
