import { Injectable } from '@angular/core';

export interface PostFormData {
  title: string;
  content: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostFormService {
  private data: PostFormData = { title: '', content: ''};

  getFormData(): PostFormData {
    return this.data;
  }

  setFormData(newData: PostFormData) {
    this.data = newData;
  }

  clearFormData() {
    this.data = { title: '', content: '' };
  }
}
