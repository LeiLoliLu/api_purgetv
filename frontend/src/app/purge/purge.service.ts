import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

     

import {  Observable, throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';

  

import { Purge } from './purge';

  

@Injectable({

  providedIn: 'root'

})

export class PurgeService {

  private apiURL = "http://127.0.0.1:8000/api";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }


  constructor(private httpClient: HttpClient) { }

  //index
  getAll(): Observable<any> {
    return this.httpClient.get(this.apiURL + '/purges/')
    .pipe(
      catchError(this.errorHandler)
    )
  }

  //store
  create(purge: FormData): Observable<any> {
    const headers = new HttpHeaders();
    headers.append('Content-Type','multipart/form-data');
    headers.append('Accept','application/json');
    return this.httpClient.post(this.apiURL + '/purges/', purge, {headers:headers})
      .pipe(
        catchError(this.errorHandler)
      );
    
  }

  //show
  find(id:number): Observable<any> {
    return this.httpClient.get(this.apiURL + '/purges/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  //update
  update(id:number, purge:Purge): Observable<any> {
    return this.httpClient.put(this.apiURL + '/purge/' + id, JSON.stringify(purge), this.httpOptions)
    .pipe( 
      catchError(this.errorHandler)
    )
  }

  //delete
  delete(id:Number){
    return this.httpClient.delete<Purge>(this.apiURL + '/purge/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }


  errorHandler(error:any) {
    let errorMessage = '';
    if(error.error instanceof ErrorEvent) {
      errorMessage = error.error.message;
    } else {
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    return throwError(errorMessage);
 }
}