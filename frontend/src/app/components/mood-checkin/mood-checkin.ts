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
  templateUrl: './mood-checkin.html'
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
