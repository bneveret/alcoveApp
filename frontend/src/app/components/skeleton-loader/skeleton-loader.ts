import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-skeleton-loader',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="skeleton-loader" *ngFor="let n of [1,2,3,4]">
      <div class="skeleton-title"></div>
      <div class="skeleton-content"></div>
    </div>
  `,
  styles: [`
    .skeleton-loader {
      margin-bottom: 20px;
      padding: 10px;
      border: 1px solid #ddd;
      border-radius: 4px;
      background: #f7f7f7;
      animation: pulse 1.5s infinite ease-in-out;
    }
    .skeleton-title {
      height: 20px;
      width: 50%;
      background: #e0e0e0;
      margin-bottom: 10px;
      border-radius: 4px;
    }
    .skeleton-content {
      height: 10px;
      width: 90%;
      background: #e0e0e0;
      border-radius: 4px;
    }
    @keyframes pulse {
      0% { opacity: 1; }
      50% { opacity: 0.5; }
      100% { opacity: 1; }
    }
  `]
})
export class SkeletonLoaderComponent {}
