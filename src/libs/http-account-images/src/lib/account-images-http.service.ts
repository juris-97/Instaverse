import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Observable} from "rxjs";
import {PostImage} from "@model-account";


@Injectable({
  providedIn: 'root'}
)
export class AccountImagesHttpService {
  constructor(private httpClient: HttpClient) {
  }

  uploadImage(newFile: File): Observable<PostImage> {
    const formData = new FormData();
    formData.append('file', newFile);
    formData.append('filename', newFile.name)
    formData.append('altName', 'Image')
    return this.httpClient.post<PostImage>(`api/posts/save`, formData);
  }

  getAllPosts(): Observable<PostImage[]> {
    return this.httpClient.get<PostImage[]>(`api/posts`);
  }
}
