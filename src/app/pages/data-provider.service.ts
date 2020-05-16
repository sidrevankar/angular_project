import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Data } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class DataProviderService {

  dataObservable;

  constructor(private http: HttpClient) {
    this.dataObservable = this.http.get<Data[]>("assets/data.json");
  }


  getTextMessages(): Observable<Data[]>{
    return this.dataObservable;
  }
}
