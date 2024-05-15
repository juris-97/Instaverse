import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AccountDetails, EditAccountDetails} from "@model-account";

@Injectable({
  providedIn: 'root'
})
export class AccountDetailsHttpService {
  constructor(private httpClient: HttpClient) {
  }

  getAccountDetails(): Observable<AccountDetails> {
    return this.httpClient.get<AccountDetails>(`api/account/details`)
  }

  updateAccountDetails(editAccountDetails: EditAccountDetails): Observable<AccountDetails> {
    return this.httpClient.put<AccountDetails>(`/api/account/details/update`, editAccountDetails);
  }

}
