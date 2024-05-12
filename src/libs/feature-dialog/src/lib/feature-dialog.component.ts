import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {ImageUploadHttpService} from "@http-image-upload";

@Component({
  selector: 'inst-feature-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  template: `
    <h2 mat-dialog-title>Add new post</h2>
    <mat-dialog-content>
      Browse image you want to upload
      <input type="file" (change)="onFileSelected($event)">
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button mat-dialog-close>Cancel</button>
      <button mat-button cdkFocusInitial (click)="onSubmit()">Upload</button>
    </mat-dialog-actions>
  `,
  styleUrl: './feature-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureDialogComponent {

  selectedFile: File | null = null;
  fileName = '';
  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    this.selectedFile = files[0];
    //this.dialogRef.close();
  }

  onSubmit(): void {
    if (this.selectedFile) {
      this.imageUploadHttpService.uploadImage(this.selectedFile, this.selectedFile?.name);
    }
  }

  constructor(public dialogRef: MatDialogRef<FeatureDialogComponent>,
              private imageUploadHttpService: ImageUploadHttpService) {
  }

}
