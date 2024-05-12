import {Injectable} from '@angular/core';
import {ComponentStore, tapResponse} from '@ngrx/component-store';
import {AccountDetails} from '@model-account-details';
import {Observable, switchMap} from 'rxjs';
import {HttpErrorResponse} from '@angular/common/http';
import {AccountDetailsHttpService} from '@http-account-details';
import {AccountImagesHttpService, PostImage} from "@http-account-images";

export interface StoreState {
  accountDetails: AccountDetails;
  postImages: PostImage[]
}

const initialState: StoreState = {
  accountDetails: {
    accountName: '',
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

  constructor(private accountDetailsHttpService: AccountDetailsHttpService,
              private accountImagesHttpService: AccountImagesHttpService) {
    super(initialState);
  }

  fetchAccountDetails = this.effect<string>(trigger$ =>
    trigger$.pipe(
      switchMap((accountName) =>
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

}
