import { Injectable } from '@angular/core';

import { HttpClient, HttpHeaders } from '@angular/common/http';

     

import {  Observable, throwError } from 'rxjs';

import { catchError } from 'rxjs/operators';

  

import { Post } from './post';

  

@Injectable({

  providedIn: 'root'

})

export class PostService {

  private apiURL = "http://127.0.0.1:8000/api";

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  constructor(private httpClient: HttpClient) { }

  //index
  getAll(): Observable<any> {
    return this.httpClient.get(this.apiURL + '/posts/')
    .pipe(
      catchError(this.errorHandler)
    )
  }

  //myindex
  getMine(): Observable<any> {
    return this.httpClient.get(this.apiURL + '/myposts/')
    .pipe(
      catchError(this.errorHandler)
    )
  }

  //store
  create(post:FormData): Observable<any> {
    return this.httpClient.post(this.apiURL + '/posts/', JSON.stringify(post), this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }  

  //show
  find(id:number): Observable<any> {
    return this.httpClient.get(this.apiURL + '/posts/' + id)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  //update
  update(id:number, post:Post): Observable<any> {
    return this.httpClient.put(this.apiURL + '/posts/' + id, JSON.stringify(post), this.httpOptions)
    .pipe( 
      catchError(this.errorHandler)
    )
  }

  //delete
  delete(id:number){
    return this.httpClient.delete(this.apiURL + '/posts/' + id, this.httpOptions)
    .pipe(
      catchError(this.errorHandler)
    )
  }

  //like
  likePost(id: number): Observable<any> {
    return this.httpClient.post(this.apiURL+'/posts/like/'+id, this.httpOptions)
      .pipe(
        catchError(this.errorHandler)
      );
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