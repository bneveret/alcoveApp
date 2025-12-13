import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class SupportService {
  private baseUrl = '/api/support/post';

  constructor(private http: HttpClient) {}

  supportPost(postId: string): Observable<{ supportCount: number }> {
    let sessionId = localStorage.getItem(`support_${postId}`);
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      localStorage.setItem(`support_${postId}`, sessionId);
    }

    return this.http.post<{ supportCount: number }>(
      `${this.baseUrl}/${postId}`,
      {},
      { headers: { 'X-Session-Id': sessionId } }
    );
  }
}
