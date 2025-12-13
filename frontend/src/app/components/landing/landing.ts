import { Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [RouterLink],
  template: `
    <div class="jumbotron text-center">
      <h2>You are not alone</h2>
      <p class="lead">
        A quiet, anonymous space to share and support.
      </p>
      <a class="btn btn-primary btn-lg" routerLink="/posts">
        Read posts
      </a>
    </div>
  `
})
export class LandingComponent {}
