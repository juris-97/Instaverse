import {Component} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MatTab, MatTabGroup, MatTabLabel} from "@angular/material/tabs";
import {MatIcon} from "@angular/material/icon";

@Component({
  selector: 'inst-content-selector-tabs',
  standalone: true,
  imports: [CommonModule, MatTabGroup, MatTab, MatIcon, MatTabLabel],
  template: `
    <mat-tab-group class="tab-group" headerPosition="below">
      <mat-tab class="tab">
        <ng-template mat-tab-label>
          <mat-icon class="grid-icon" svgIcon="grid"></mat-icon>
          POSTS
        </ng-template>
        Content 1
      </mat-tab>
      <mat-tab>
        <ng-template mat-tab-label>
          <mat-icon class="reel-icon" svgIcon="reel"></mat-icon>
          REELS
        </ng-template>
        Content 2
      </mat-tab>
      <mat-tab>
        <ng-template mat-tab-label>
          <mat-icon class="tagged-icon" svgIcon="tag"></mat-icon>
          TAGGED
        </ng-template>
        Content 3
      </mat-tab>
    </mat-tab-group>
  `,
  styleUrl: './feature-content-selector-tabs.component.scss',
})
export class FeatureContentSelectorTabsComponent {}
