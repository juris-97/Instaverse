import {ChangeDetectionStrategy, Component} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MatButton} from "@angular/material/button";

@Component({
  selector: 'inst-profile-header',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, MatButton],
  template: `
    <div class="img-wrapper">
      <img class="profile-img" ngSrc="assets/profile.jpg" alt="profile image" width="150" height="150" priority>
    </div>
    <div class="profile-info-wrapper">
      <div class="profile-name-with-actions">
        <h2 class="profile-name">{{'juris_lavs'}}</h2>
        <div class="profile-btns">
          <button mat-stroked-button color="secondary">Change profile</button>
          <button mat-stroked-button color="secondary">Add image</button>
        </div>
      </div>
      <div class="profile-info">
        <span>{{'Posts: 155'}}</span>
        <span>{{'413 followers'}}</span>
        <span>{{'Following: 255'}}</span>
      </div>
      <div class="description">
        {{"'Welcome to my world of captured moments! 📸 As a passionate photography enthusiast and avid traveler, I'm constantly on the lookout for the next breathtaking vista or hidden gem to immortalize through my lens. Join me on my journey as I explore the beauty of landscapes, cultures, and the simple joys of life. Let's wander together and discover the extraordinary in the ordinary. ✈️ #AdventureAwaits'"}}
      </div>
    </div>
  `,
  styleUrl: './feature-profile-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureProfileHeaderComponent {}
