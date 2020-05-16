import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {

  constructor(private http: HttpClient) {
  }


  getTextMessages(): Observable<Data[]>{
    return this.http.get<Data[]>("assets/data.json");
  }
}
