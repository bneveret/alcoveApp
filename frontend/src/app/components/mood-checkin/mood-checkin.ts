import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MoodService } from '../../services/mood.service';
import { FormsModule } from '@angular/forms';

interface MoodStat {
  _id: string; // emoji
  count: number;
}

@Component({
  selector: 'app-mood-checkin',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="panel panel-default">
      <div class="panel-heading">
        <h3>Mood Check-in</h3>
      </div>
      <div class="panel-body">
        <p>How are you feeling right now?</p>
        <div class="btn-group">
          <button *ngFor="let mood of allowedMoods"
                  class="btn btn-default btn-lg"
                  (click)="submitMood(mood)">
            {{ mood }}
          </button>
        </div>

        <div *ngIf="message" class="alert alert-info" style="margin-top:15px;">
          {{ message }}
        </div>

        <hr>

        <div>
          <h4>Mood Statistics (last {{ range }} days)</h4>
          <div *ngIf="stats.length === 0">No data yet.</div>
          <ul class="list-unstyled">
            <li *ngFor="let stat of stats">
              {{ stat._id }}: {{ stat.count }}
            </li>
          </ul>

          <label>Show stats for last
            <input type="number" [(ngModel)]="range" min="1" max="30" style="width:60px;">
            days
          </label>
          <button class="btn btn-default btn-sm" (click)="loadStats()">Refresh</button>
        </div>
      </div>
    </div>
  `
})
export class MoodCheckinComponent implements OnInit {
  allowedMoods = ['😊','😐','😔','😟','😌'];
  stats: MoodStat[] = [];
  message: string | null = null;
  range = 7;

  constructor(private moodService: MoodService) {}

  ngOnInit() {
    this.loadStats();
  }

  submitMood(mood: string) {
  this.moodService.submitMood(mood).subscribe({
    next: () => { this.message = 'Mood recorded!'; this.loadStats(); },
    error: () => { this.message = 'Failed to submit mood'; }
  });
}

  loadStats() {
  this.moodService.getStats(this.range).subscribe({
    next: stats => this.stats = stats,
    error: () => this.stats = []
  });
}
}
