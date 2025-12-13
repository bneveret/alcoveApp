import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-post-create',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './post-create.html',
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
      if (!this.selectedTags.includes(tag)) this.selectedTags.push(tag);
    } else {
      this.selectedTags = this.selectedTags.filter(t => t !== tag);
    }
    this.postForm.controls['tags'].setValue(this.selectedTags);
  }

  submit() {
    if (this.postForm.invalid) {
      alert('Please fill all fields correctly');
      return;
    }

    const payload = {
      title: this.postForm.value.title?.trim(),
      content: this.postForm.value.content?.trim(),
      tags: this.postForm.value.tags || []
    };

    this.http.post<{id: string, anonymousToken: string}>('/api/posts', payload)
    .subscribe({
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
