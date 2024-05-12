import {ChangeDetectionStrategy, Component} from '@angular/core';
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

interface Photo {
  id: number;
  src: string;
  alt: string;
  width: number;
  height: number;
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
      <div class="photo-wrapper"
           cdkDropListGroup mixedCdkDragDrop
           (dropped)="dropped($event)">
        @for (photo of photos; track photo.id) {
          <mat-card class="photo-card" cdkDropList mixedCdkDropList>
            <mat-card-content class="photo-content">
              <img mat-card-image
                   cdkDrag
                   mixedCdkDragSizeHelper
                   priority
                   alt="{{photo.alt}}"
                   [ngSrc]="photo.src"
                   [width]="photo.width"
                   [height]="photo.height"
                   (contentBoxSize)="onSizeChange($event)"
              >
            </mat-card-content>
          </mat-card>
        }
      </div>
  `,
  styleUrl: './feature-photo-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeaturePhotoListComponent {

  photos: Photo[] = [
    { id: 0, src: 'https://material.angular.io/assets/img/examples/shiba1.jpg', alt: 'Photo of a Shiba Inu', width: 309, height: 309 },
    { id: 1, src: 'https://material.angular.io/assets/img/examples/shiba2.jpg', alt: 'Photo of a Shiba Inu', width: 309, height: 309 },
    { id: 2, src: 'https://assets.vogue.com/photos/65f04d926294babad5413eb1/master/w_1920,c_limit/GettyImages-1380534040.jpg', alt: 'Photo of a Shiba Inu', width: 309, height: 309 },
    { id: 3, src: 'https://assets.vogue.com/photos/65f04c610039e884638596c4/master/w_1600,c_limit/GettyImages-1358569473.jpg', alt: 'Photo of a Shiba Inu', width: 309, height: 309 },
    { id: 4, src: 'https://assets.vogue.com/photos/65f04c568743fefb851da9c0/master/w_1600,c_limit/GettyImages-869042098.jpg', alt: 'Photo of a Shiba Inu', width: 309, height: 309 },
    { id: 5, src: 'https://imageio.forbes.com/specials-images/imageserve/646b6b45d9b20ac15900fd8a/Oleander-flowers-and-villa-Monastero-in-background--lake-Como--Varenna/960x0.jpg?format=jpg&width=1440', alt: 'Photo of a Shiba Inu', width: 309, height: 309 },
    { id: 6, src: 'https://s3.eu-central-1.amazonaws.com/wps-lakecomotravel.com/wp-content/uploads/2019/07/lake-como-weather-varenna-summer.jpg', alt: 'Photo of a Shiba Inu', width: 309, height: 309 }
  ];

  dropped(event: { previousIndex: number; currentIndex: number }): void {
    moveItemInArray(this.photos, event.previousIndex, event.currentIndex);
  }

  onSizeChange(event: { drag: CdkDrag; containerSize: DOMRectReadOnly }): void {
    MixedCdkDragSizeHelperDirective.defaultEmitter(event, 0, 0);
  }

}
