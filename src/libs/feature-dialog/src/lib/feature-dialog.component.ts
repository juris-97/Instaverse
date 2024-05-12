import {ChangeDetectionStrategy, Component} from '@angular/core';
import {MatButtonModule} from "@angular/material/button";
import {
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle
} from "@angular/material/dialog";
import {DataStore} from "@store";

@Component({
  selector: 'inst-feature-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent],
  template: `
    <h2 mat-dialog-title>Add new post</h2>
    <mat-dialog-content class="content">
      Browse image you want to upload
      <input class="upload-input" type="file" (change)="onFileSelected($event)">
    </mat-dialog-content>
    <mat-dialog-actions>
      <button mat-button color="warn" mat-dialog-close>Cancel</button>
      <button mat-button cdkFocusInitial (click)="onSubmit()" [disabled]="!selectedFile">Upload</button>
    </mat-dialog-actions>
  `,
  styleUrl: './feature-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureDialogComponent {

  selectedFile: File | null = null;

  onFileSelected(event: Event) {
    const target = event.target as HTMLInputElement;
    const files = target.files as FileList;
    this.selectedFile = files[0];
  }

  onSubmit(): void {
    if (this.selectedFile) {
      this.dataStore.uploadPostImage(this.selectedFile)
      this.dialogRef.close();
    }
  }

  constructor(public dialogRef: MatDialogRef<FeatureDialogComponent>,
              private dataStore: DataStore) {
  }

}
