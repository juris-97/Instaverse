import {Injectable} from '@angular/core';
import {ComponentStore, tapResponse} from '@ngrx/component-store';
import {Observable, switchMap} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {AccountDetailsHttpService} from '@http-account-details';
import {AccountImagesHttpService} from '@http-account-images';
import {AccountDetails, EditAccountDetails, PostImage, UploadImageStatus} from '@model-account';

export interface StoreState {
  accountDetails: AccountDetails;
  postImages: PostImage[],
  uploadImageStatus: UploadImageStatus
}

const initialState: StoreState = {
  accountDetails: {
    accountName: '',
    description: '',
    followers: 0,
    following: 0,
    postsCount: 0
  },
  postImages: [],
  uploadImageStatus: UploadImageStatus.LOADED
};

@Injectable({
  providedIn: 'root'
})
export class DataStore extends ComponentStore<StoreState> {

  readonly accountDetails$: Observable<AccountDetails> = this.select(
    (state) => state.accountDetails
  );

  readonly postImages$: Observable<PostImage[]> = this.select(
    (state) => state.postImages
  );

  readonly uploadStatus$: Observable<UploadImageStatus> = this.select(
    (state) => state.uploadImageStatus
  );

  readonly selectAccountName$ = this.select((state) => state.accountDetails.accountName);

  readonly selectAccountDescription$ = this.select((state) => state.accountDetails.description);

  constructor(private accountDetailsHttpService: AccountDetailsHttpService,
              private accountImagesHttpService: AccountImagesHttpService) {
    super(initialState);
  }

  updateUploadImageStatus(status: UploadImageStatus) {
    this.patchState({uploadImageStatus: status});
  }

  fetchAccountDetails = this.effect<void>(trigger$ =>
    trigger$.pipe(
      switchMap(() =>
        this.accountDetailsHttpService.getAccountDetails().pipe(
          tapResponse({
            next: (accountDetails) => this.patchState({accountDetails}),
            error: (error: HttpErrorResponse) => console.log(error.message)
          })
        )
      )
    )
  );

  fetchAllPosts = this.effect<void>(trigger$ =>
    trigger$.pipe(
      switchMap(() =>
        this.accountImagesHttpService.getAllPosts().pipe(
          tapResponse({
            next: (postImages) => this.patchState({postImages}),
            error: (error: HttpErrorResponse) => console.log(error.message)
          })
        )
      )
    )
  );

  deletePostImage = this.effect<number>(trigger$ =>
    trigger$.pipe(
      switchMap((postId) =>
        this.accountImagesHttpService.deletePost(postId).pipe(
          tapResponse({
            next: () => {
              this.patchState((state: StoreState) => ({
                postImages: state.postImages.filter(postImage => postImage.id !== postId),
                accountDetails: {
                  ...state.accountDetails,
                  postsCount: state.accountDetails.postsCount - 1
                }
              }));
            },
            error: (error: HttpErrorResponse) => console.log(error.message)
          })
        )
      )
    )
  );

  uploadPostImage = this.effect<File>(trigger$ =>
    trigger$.pipe(
      switchMap((file) =>
        this.accountImagesHttpService.uploadImage(file).pipe(
          tapResponse({
            next: (postImage) => {
              this.patchState((state: StoreState) => ({
                ...state,
                postImages: [...state.postImages, postImage],
                accountDetails: {
                  ...state.accountDetails,
                  postsCount: state.accountDetails.postsCount + 1
                },
                uploadImageStatus: UploadImageStatus.LOADED
              }));
            },
            error: (error: HttpErrorResponse) => console.log(error.message)
          })
        )
      )
    )
  );

  updateAccountDetails = this.effect<EditAccountDetails>(trigger$ =>
    trigger$.pipe(
      switchMap((updateData) =>
        this.accountDetailsHttpService.updateAccountDetails(updateData).pipe(
          tapResponse({
            next: (newAccountDetails) => {
              this.patchState((state: StoreState) => ({
                ...state,
                accountDetails: {
                  ...state.accountDetails,
                  ...newAccountDetails
                }
              }));
            },
            error: (error: HttpErrorResponse) => console.log(error.message)
          })
        )
      )
    )
  );

}

