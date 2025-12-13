import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PostsService, Post } from '../../services/posts.service';
import { SkeletonLoaderComponent } from '../skeleton-loader/skeleton-loader';

@Component({
  selector: 'app-post-list',
  standalone: true,
  imports: [CommonModule, RouterModule, SkeletonLoaderComponent],
  templateUrl: './post-list.html'
})
export class PostListComponent implements OnInit {
  posts: Post[] = [];
  loading = true;
  allowedTags = ['anxiety','depression','burnout','stress','loneliness','grief','self-esteem','other'];
  currentTag = '';

  constructor(private postsService: PostsService) {}

  ngOnInit() {
    this.fetchPosts();
  }

  fetchPosts() {
    this.loading = true;
    this.postsService.getPosts(this.currentTag).subscribe({
      next: (res) => { this.posts = res; this.loading = false; },
      error: () => { this.posts = []; this.loading = false; }
    });
  }

  filterByTag(tag: string) {
    this.currentTag = tag;
    this.fetchPosts();
  }
}