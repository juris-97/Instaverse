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
import {MatButton} from '@angular/material/button';
import {CdkDrag, DragDropModule, moveItemInArray} from '@angular/cdk/drag-drop';
import {MixedCdkDragDropModule, MixedCdkDragSizeHelperDirective} from 'angular-mixed-cdk-drag-drop';
import {PostImage} from "@http-account-images";
import {DataStore} from "@store";
import {combineLatest, map, Observable, take} from "rxjs";

interface PostImagesViewModel {
  postsImages: PostImage[];
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
              >
            </mat-card-content>
          </mat-card>
        }
      </div>
    }
  `,
  styleUrl: './feature-photo-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeaturePhotoListComponent implements OnInit {

  vm$: Observable<PostImagesViewModel> = combineLatest([
    this.dataStore.postImages$,
  ]).pipe(
    map(([postsImages]) => ({
      postsImages
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
}
