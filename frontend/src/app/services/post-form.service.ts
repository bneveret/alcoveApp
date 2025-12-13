// src/app/services/post-form.service.ts
import { Injectable } from '@angular/core';

export interface PostFormData {
  title: string;
  content: string;
  tags: string[];
}

@Injectable({
  providedIn: 'root'
})
export class PostFormService {
  private data: PostFormData = { title: '', content: '', tags: [] };

  getFormData(): PostFormData {
    return this.data;
  }

  setFormData(newData: PostFormData) {
    this.data = newData;
  }

  clearFormData() {
    this.data = { title: '', content: '', tags: [] };
  }
}
