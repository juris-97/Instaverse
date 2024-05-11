import {Component} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';

@Component({
  selector: 'inst-profile-stories',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage],
  template: `
    <div class="stories-wrapper">
      <div class="story">
        <img ngSrc="/assets/st1.jpg" alt="story" width="77" height="77" priority>
        <span class="story-title">{{'Alps'}}</span>
      </div>
      <div class="story">
        <img ngSrc="/assets/st2.jpg" alt="story" width="77" height="77" priority>
        <span class="story-title">{{'Milano'}}</span>
      </div>
      <div class="story">
        <img ngSrc="/assets/st3.jpg" alt="story" width="77" height="77" priority>
        <span class="story-title">{{'Como'}}</span>
      </div>
      <div class="story">
        <img ngSrc="/assets/st4.jpg" alt="story" width="77" height="77" priority>
        <span class="story-title">{{'Italy'}}</span>
      </div>
      <div class="story">
        <img ngSrc="/assets/st5.jpg" alt="story" width="77" height="77" priority>
        <span class="story-title">{{'Bergamo'}}</span>
      </div>
      <div class="story">
        <img ngSrc="/assets/st6.jpg" alt="story" width="77" height="77" priority>
        <span class="story-title">{{'Portofino'}}</span>
      </div>
    </div>
  `,
  styleUrl: './feature-profile-stories.component.scss',
})
export class FeatureProfileStoriesComponent {

}
