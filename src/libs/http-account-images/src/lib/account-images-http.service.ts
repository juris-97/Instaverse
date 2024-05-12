import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable, of} from "rxjs";
import {PostImage} from "./model/post-image";


@Injectable({
  providedIn: 'root'}
)
export class AccountImagesHttpService {
  constructor(private httpClient: HttpClient) {
  }

  uploadImage(newFile: File, fileName: string): Observable<void> {
    const formData = new FormData();
    formData.append('file', newFile);
    formData.append('filename', fileName)
    formData.append('altName', 'dupa')
    this.httpClient.post<void>(`api/posts/save`, formData).subscribe();
    return of()
  }

  getAllPosts(): Observable<PostImage[]> {
    return this.httpClient.get<PostImage[]>(`api/posts`);
  }
}
