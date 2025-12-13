import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface MoodStat {
  _id: string; // emoji
  count: number;
}

@Injectable({
  providedIn: 'root'
})
export class MoodService {
  private baseUrl = '/api/mood';

  constructor(private http: HttpClient) {}

  submitMood(mood: string): Observable<any> {
    let sessionId = localStorage.getItem('moodSessionId');
    if (!sessionId) {
      sessionId = crypto.randomUUID();
      localStorage.setItem('moodSessionId', sessionId);
    }

    return this.http.post(this.baseUrl, { mood, sessionId });
  }

  getStats(range: number = 7): Observable<MoodStat[]> {
    return this.http.get<MoodStat[]>(`${this.baseUrl}?range=${range}`);
  }
}
