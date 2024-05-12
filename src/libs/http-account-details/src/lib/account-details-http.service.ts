import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {AccountDetails} from "@model-account-details";

@Injectable({
  providedIn: 'root'
})
export class AccountDetailsHttpService {
  constructor(private httpClient: HttpClient) {
  }

  getAccountDetails(accountName: string): Observable<AccountDetails> {
    return this.httpClient.get<AccountDetails>(`api/account/details/${accountName}`)
  }

}
