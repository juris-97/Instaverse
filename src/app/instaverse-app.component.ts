import {ChangeDetectionStrategy, Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';
import {FeatureProfileHeaderComponent} from "@feature-profile-header";
import {FeatureProfileStoriesComponent} from "@feature-profile-stories";
import {FeatureContentSelectorTabsComponent} from "@feature-content-selector-tabs";
import {MatIconRegistry} from "@angular/material/icon";
import {DomSanitizer} from "@angular/platform-browser";

@Component({
  selector: 'instaverse-app',
  standalone: true,
  imports: [
    RouterOutlet,
    FeatureProfileHeaderComponent,
    FeatureProfileStoriesComponent,
    FeatureContentSelectorTabsComponent
  ],
  template: `
    <header class="app-header">
      <h1 class="app-title">{{ title }}</h1>
    </header>
    <main class="main-content">
      <inst-profile-header></inst-profile-header>
      <inst-profile-stories></inst-profile-stories>
      <inst-content-selector-tabs></inst-content-selector-tabs>
    </main>
  `,
  styleUrl: './instaverse-app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class InstaverseAppComponent {
  title: string = 'instaverse';

  constructor(private matIconRegistry: MatIconRegistry,
              private domSanitizer: DomSanitizer) {
    this.matIconRegistry.addSvgIcon('grid',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/grid.svg'))
    this.matIconRegistry.addSvgIcon('reel',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/reel.svg'))
    this.matIconRegistry.addSvgIcon('tag',
      this.domSanitizer.bypassSecurityTrustResourceUrl('../assets/icons/tag.svg'))
  }
}
