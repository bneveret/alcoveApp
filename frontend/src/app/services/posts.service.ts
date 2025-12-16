import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Post {
  _id: string;
  title: string;
  content: string;
  createdAt: string;
}

@Injectable({
  providedIn: 'root'
})
export class PostsService {
  private baseUrl = '/api/posts';

  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.baseUrl);
  }

  getPost(id: string): Observable<Post> {
    return this.http.get<Post>(`${this.baseUrl}/${id}`);
  }

  createPost(data: { title: string; content: string }) {
    return this.http.post<{ id: string; anonymousToken: string }>(
      this.baseUrl,
      data
    );
  }

  updatePost(
    id: string,
    data: { title?: string; content?: string; token: string }
  ) {
    return this.http.put(`${this.baseUrl}/${id}`, data);
  }

  deletePost(id: string, token: string) {
    return this.http.request('delete', `${this.baseUrl}/${id}`, {
      body: { token }
    });
  }
}
