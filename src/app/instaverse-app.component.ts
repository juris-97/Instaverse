import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FeatureProfileHeaderComponent} from "../libs/feature-profile-header/src";

@Component({
  selector: 'instaverse-app',
  standalone: true,
  imports: [
    RouterOutlet,
    FeatureProfileHeaderComponent
  ],
  template: `
    <inst-profile-header></inst-profile-header>
  `,
  styleUrl: './instaverse-app.component.scss'
})
export class InstaverseAppComponent {
  title = 'instaverse';
}
