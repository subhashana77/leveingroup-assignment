import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Constants} from "../const/constants";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  constructor(private httpClient: HttpClient) { }

  createPost(data: any): Observable<any> {
    return this.httpClient.post(Constants.API_URL + '/posts/upload-post', data);
  }

  getRandomUsername(): Observable<any> {
    return this.httpClient.get(Constants.API_URL + '/users/random-username');
  }

}
