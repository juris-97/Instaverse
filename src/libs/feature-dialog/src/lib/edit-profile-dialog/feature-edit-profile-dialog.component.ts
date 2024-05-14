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
import {FormBuilder, FormGroup, ReactiveFormsModule} from "@angular/forms";
import {AccountDetails, EditProfileForm} from "@model-account";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";

@Component({
  selector: 'inst-feature-new-post-dialog',
  standalone: true,
  imports: [MatButtonModule, MatDialogActions, MatDialogClose, MatDialogTitle, MatDialogContent, ReactiveFormsModule, MatFormField, MatInput, MatLabel],
  template: `
    <h2 mat-dialog-title class="dialog-title">Edit Profile Details</h2>
    <mat-dialog-content class="content">
      <form [formGroup]="formGroup" class="form">
        <mat-form-field class="form-field">
          <mat-label>Add new account name</mat-label>
          <input matInput formControlName="accountName" class="input"/>
        </mat-form-field>
        <mat-form-field class="form-field">
          <mat-label>Add new account description</mat-label>
          <textarea matInput formControlName="accountDescription" class="textarea"></textarea>
        </mat-form-field>
      </form>
    </mat-dialog-content>
    <mat-dialog-actions class="dialog-actions">
      <button mat-button color="warn" mat-dialog-close class="cancel-button">Cancel</button>
      <button mat-button cdkFocusInitial (click)="onSubmit()" class="edit-button">Edit</button>
    </mat-dialog-actions>
  `,
  styleUrl: './feature-edit-profile-dialog.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FeatureEditProfileDialogComponent {

  formGroup: FormGroup<EditProfileForm> = this.formBuilder.group<EditProfileForm>({
    accountName: this.formBuilder.control<string>(''),
    accountDescription: this.formBuilder.control<string>('')
  });

  constructor(public dialogRef: MatDialogRef<FeatureEditProfileDialogComponent>,
              private dataStore: DataStore,
              private formBuilder: FormBuilder) {
  }

  onSubmit(): void {
    const updateData = new FormData();
    const accountName = this.formGroup.getRawValue().accountName;
    const accountDescription = this.formGroup.getRawValue().accountDescription;
    if (accountName) {
      updateData.append("newAccountName", accountName);
    }
    if (accountDescription) {
      updateData.append("newAccountDescription", accountDescription);
    }
    this.dataStore.updateAccountDetails(updateData);
    this.dialogRef.close();
  }
}
