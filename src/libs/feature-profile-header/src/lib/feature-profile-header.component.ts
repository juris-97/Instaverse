import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {MatButton} from '@angular/material/button';
import {DataStore} from '@store';
import {AccountDetails} from '@model-account-details';
import {combineLatest, map, Observable} from 'rxjs';
import {MatDialog} from '@angular/material/dialog';
import {FeatureDialogComponent} from '@feature-dialog';

interface AccountDetailsViewModel {
  accountDetails: AccountDetails;
}

@Component({
  selector: 'inst-profile-header',
  standalone: true,
  imports: [CommonModule, NgOptimizedImage, MatButton],
  template: `
    @if (vm$ | async; as vm) {
      <div class="img-wrapper">
        <img class="profile-img" ngSrc="assets/profile.jpg" alt="profile image" width="150" height="150" priority>
      </div>
      <div class="profile-info-wrapper">
        <div class="profile-name-with-actions">
          <h2 class="profile-name">{{ this.INSTA_ACCOUNT_NAME }}</h2>
          <div class="profile-btns">
            <button mat-stroked-button color="secondary">Change profile</button>
            <button mat-stroked-button color="secondary" (click)="openDialog('0ms', '0ms')">Add image</button>
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

  readonly INSTA_ACCOUNT_NAME: string= 'juris_lavs';

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
    console.log(this.INSTA_ACCOUNT_NAME);
    this.dataStore.fetchAccountDetails(this.INSTA_ACCOUNT_NAME);
  }

  openDialog(enterAnimationDuration: string, exitAnimationDuration: string): void {
    this.dialog.open(FeatureDialogComponent, {
      width: '450px',
      enterAnimationDuration,
      exitAnimationDuration,
    });
  }

}
