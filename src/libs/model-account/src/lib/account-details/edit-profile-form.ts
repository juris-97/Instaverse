import {FormControl} from "@angular/forms";

export interface EditProfileForm {
  accountName: FormControl<string | null>;
  //profileImage: FormControl<File | null>;
  accountDescription: FormControl<string | null>;
}
