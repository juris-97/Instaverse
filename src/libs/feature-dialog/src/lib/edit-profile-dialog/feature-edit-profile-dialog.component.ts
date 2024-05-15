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
import {EditAccountDetails, EditProfileForm} from "@model-account";
import {MatFormField, MatLabel} from "@angular/material/form-field";
import {MatInput} from "@angular/material/input";
import {Observable} from "rxjs";
import {AsyncPipe} from "@angular/common";

@Component({
  selector: 'inst-feature-new-post-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogTitle,
    MatDialogContent,
    ReactiveFormsModule,
    MatFormField,
    MatInput,
    MatLabel,
    AsyncPipe
  ],
  template: `
    <h2 mat-dialog-title class="dialog-title">Edit profile details</h2>
    <mat-dialog-content class="content">
      <form [formGroup]="formGroup" class="form">
        <mat-form-field class="form-field">
          <mat-label>Edit account name</mat-label>
          <input [ngModel]="this.accountName$ | async" matInput formControlName="accountName" class="input"/>
        </mat-form-field>
        <mat-form-field class="form-field">
          <mat-label>Edit description</mat-label>
          <textarea class="textarea"
                    matInput
                    [ngModel]="this.description$ | async"
                    formControlName="accountDescription">
          </textarea>
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

  readonly accountName$: Observable<string> = this.dataStore.selectAccountName$;
  readonly description$: Observable<string> = this.dataStore.selectAccountDescription$;

  formGroup: FormGroup<EditProfileForm> = this.formBuilder.group<EditProfileForm>({
    accountName: this.formBuilder.control<string>(''),
    accountDescription: this.formBuilder.control<string>('')
  });

  constructor(public dialogRef: MatDialogRef<FeatureEditProfileDialogComponent>,
              private dataStore: DataStore,
              private formBuilder: FormBuilder) {
  }

  onSubmit(): void {
    const newAccountDetails: EditAccountDetails = {
      accountName: this.formGroup.value.accountName,
      description: this.formGroup.value.accountDescription
    }
    this.dataStore.updateAccountDetails(newAccountDetails);
    this.dialogRef.close();
  }
}
