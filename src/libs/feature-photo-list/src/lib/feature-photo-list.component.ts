import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {CommonModule, NgOptimizedImage} from '@angular/common';
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardImage,
  MatCardSubtitle,
  MatCardTitle
} from '@angular/material/card';
import {MatButton, MatIconButton} from '@angular/material/button';
import {CdkDrag, DragDropModule, moveItemInArray} from '@angular/cdk/drag-drop';
import {MixedCdkDragDropModule, MixedCdkDragSizeHelperDirective} from 'angular-mixed-cdk-drag-drop';
import {DataStore} from '@store';
import {combineLatest, map, Observable, take} from 'rxjs';
import {PostImage, UploadImageStatus} from '@model-account';
import {MatIcon} from '@angular/material/icon';
import {MatDialogClose} from '@angular/material/dialog';
import {MatProgressSpinner} from '@angular/material/progress-spinner';

interface PostImagesViewModel {
  postsImages: PostImage[];
  uploadImageStatus: UploadImageStatus;
}

@Component({
  selector: 'inst-feature-photo-list',
  standalone: true,
  imports: [
    CommonModule,
    MatCard,
    MatCardHeader,
    MatCardContent,
    MatCardActions,
    MatButton,
    MatCardImage,
    NgOptimizedImage,
    MatCardSubtitle,
    MatCardTitle,
    DragDropModule,
    MixedCdkDragDropModule,
    MatIcon,
    MatIconButton,
    MatDialogClose,
    MatProgressSpinner,
  ],
  template: `
    @if (vm$ | async; as vm) {
      <div class="photo-wrapper"
           cdkDropListGroup mixedCdkDragDrop
           (dropped)="dropped($event)">
        @for (postImage of vm.postsImages; track postImage.id) {
          <mat-card class="photo-card" cdkDropList mixedCdkDropList>
            <mat-card-content class="photo-content">
              <img mat-card-image
                   cdkDrag
                   mixedCdkDragSizeHelper
                   width="309"
                   height="309"
                   alt="{{postImage.altName}}"
                   [src]="'data:image/png;base64,' + postImage.fileBytes"
                   (contentBoxSize)="onSizeChange($event)"
                   (cdkDragStarted)="onDragStarted()"
                   (cdkDragEnded)="onDragEnded()"
              >
              <button class="remove-button"
                      mat-icon-button
                      [class.remove-hidden]="isDragging"
                      (click)="removeImage(postImage.id)">
                <mat-icon>close</mat-icon>
              </button>
            </mat-card-content>
          </mat-card>
        }
        @if (vm.uploadImageStatus === UploadImageStatus.LOADING) {
          <mat-spinner class="spinner"></mat-spinner>
        }
      </div>
    }
  `,
  styleUrl: './feature-photo-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeaturePhotoListComponent implements OnInit {

  isDragging = false;
  UploadImageStatus: typeof UploadImageStatus = UploadImageStatus;

  vm$: Observable<PostImagesViewModel> = combineLatest([
    this.dataStore.postImages$,
    this.dataStore.uploadStatus$
  ]).pipe(
    map(([postsImages, uploadImageStatus]) => ({
      postsImages,
      uploadImageStatus
    }))
  );

  constructor(private dataStore: DataStore) {
  }

  ngOnInit(): void {
    this.dataStore.fetchAllPosts();
  }

  dropped(event: { previousIndex: number; currentIndex: number }): void {
    this.vm$.pipe(take(1)).subscribe(vm => {
      const newPostImages = [...vm.postsImages];
      moveItemInArray(newPostImages, event.previousIndex, event.currentIndex);
      this.dataStore.patchState({ postImages: newPostImages });
    });
  }

  onSizeChange(event: { drag: CdkDrag; containerSize: DOMRectReadOnly }): void {
    MixedCdkDragSizeHelperDirective.defaultEmitter(event, 0, 0);
  }

  removeImage(id: number): void {
    this.dataStore.deletePostImage(id);
  }

  onDragStarted(): void {
    this.isDragging = true;
  }

  onDragEnded(): void {
    this.isDragging = false;
  }
}
