import {Injectable} from '@angular/core';
import {ComponentStore, tapResponse} from '@ngrx/component-store';
import {Observable, switchMap, withLatestFrom} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {AccountDetailsHttpService} from '@http-account-details';
import {AccountImagesHttpService} from "@http-account-images";
import {PostImage, AccountDetails} from "@model-account";

export interface StoreState {
  accountDetails: AccountDetails;
  postImages: PostImage[]
}

const initialState: StoreState = {
  accountDetails: {
    accountName: 'juris_lavs',
    description: '',
    followers: 0,
    following: 0,
    postsCount: 0
  },
  postImages: []
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
  )

  readonly selectAccountName$ = this.select((state) => state.accountDetails.accountName);

  constructor(private accountDetailsHttpService: AccountDetailsHttpService,
              private accountImagesHttpService: AccountImagesHttpService) {
    super(initialState);
  }

  fetchAccountDetails = this.effect<void>(trigger$ =>
    trigger$.pipe(
      withLatestFrom(
        this.selectAccountName$
      ),
      switchMap(([_, accountName]) =>
        this.accountDetailsHttpService.getAccountDetails(accountName).pipe(
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

  uploadPostImage = this.effect<File>(trigger$ =>
    trigger$.pipe(
      withLatestFrom(
        this.selectAccountName$
      ),
      switchMap(([file, accountName]) =>
        this.accountImagesHttpService.uploadImage(file, accountName).pipe(
          tapResponse({
            next: (postImage) => {
              this.patchState((state: StoreState) => ({
                ...state,
                postImages: [...state.postImages, postImage],
                accountDetails: {
                  ...state.accountDetails,
                  postsCount: state.accountDetails.postsCount + 1
                }
              }));
            },
            error: (error: HttpErrorResponse) => console.log(error.message)
          })
        )
      )
    )
  );

  updateAccountDetails = this.effect<FormData>(trigger$ =>
    trigger$.pipe(
      withLatestFrom(
        this.selectAccountName$
      ),
      switchMap(([updateData, accountName]) =>
        this.accountDetailsHttpService.updateAccountDetails(updateData, accountName).pipe(
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

