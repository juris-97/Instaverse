import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {DataStore} from '@store';
import {combineLatest, map, Observable} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {FeatureEditProfileDialogComponent, FeatureNewPostDialogComponent} from '@feature-dialog';
import {AccountDetails} from '@model-account';
import {MatIcon} from '@angular/material/icon';

interface AccountDetailsViewModel {
  accountDetails: AccountDetails;
}

@Component({
  selector: 'inst-profile-header',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, MatButton, MatIcon],
  template: `
    @if (vm$ | async; as vm) {
      <div class="img-wrapper">
        <img class="profile-img" ngSrc="assets/profile1.jpg" alt="profile image" width="150" height="150" priority>
      </div>
      <div class="profile-info-wrapper">
        <div class="profile-name-with-actions">
          <div class="name-with-icon">
            <h2 class="profile-name">{{ vm.accountDetails.accountName }}</h2>
            <mat-icon class="verified-icon" svgIcon="verified"></mat-icon>
          </div>
          <div class="profile-btns">
            <button mat-stroked-button color="secondary" (click)="onOpenEditProfileClicked()">Edit profile</button>
            <button mat-stroked-button color="secondary" (click)="onAddNewImageClicked()">Add image</button>
          </div>
        </div>
        <div class="profile-info">
          <span>Posts: {{ vm.accountDetails.postsCount }}</span>
          <span>{{ vm.accountDetails.followers }} followers</span>
          <span>Following {{ vm.accountDetails.following }}</span>
        </div>
        <div class="description">
          {{ vm.accountDetails.description }}
        </div>
      </div>
    }
  `,
  styleUrl: './feature-profile-header.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureProfileHeaderComponent implements OnInit{

  vm$: Observable<AccountDetailsViewModel> = combineLatest([
    this.dataStore.accountDetails$,
  ]).pipe(
    map(([accountDetails]) => ({
      accountDetails
    }))
  );

  constructor(private dataStore: DataStore,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    this.dataStore.fetchAccountDetails();
  }

  onOpenEditProfileClicked(): void {
    this.dialog.open(FeatureEditProfileDialogComponent, {
      width: '450px',
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '200ms'
    });
  }

  onAddNewImageClicked(): void {
    this.dialog.open(FeatureNewPostDialogComponent, {
      width: '450px',
      enterAnimationDuration: '200ms',
      exitAnimationDuration: '200ms'
    });
  }

}
