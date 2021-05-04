// this class participates in the dependency injection system
import { Injectable } from '@angular/core';

import { Observable, of } from 'rxjs';

import { HttpClient, HttpHeaders } from '@angular/common/http';

import { catchError, map, tap } from 'rxjs/operators';

import { Meal } from './meal';
import { MEALS } from './mock-meals';
import { MessageService } from "./message.service";

@Injectable({
  providedIn: 'root'
})
export class MealService {

  private mealsUrl = 'api/meals';  // URL to web api

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  getMeals(): Observable<Meal[]> {
    return this.http.get<Meal[]>(this.mealsUrl)
      .pipe(
        tap(_ => this.log('fetched meals')),
        catchError(this.handleError<Meal[]>('getMeals', []))
      );
  }

  getMeal(id: number): Observable<Meal> {
    // For now, assume that a meal with the specified `id` always exists.
    // Error handling will be added in the next step of the tutorial.
    const url = `${this.mealsUrl}/${id}`;
    return this.http.get<Meal>(url).pipe(
      tap(_ => this.log(`fetched meal id=${id}`)),
      catchError(this.handleError<Meal>(`getMeal id=${id}`))
    );
  }

  /** PUT: update the meal on the server */
  updateMeal(meal: Meal): Observable<any> {
    return this.http.put(this.mealsUrl, meal, this.httpOptions).pipe(
      tap(_ => this.log(`updated meal id=${meal.id}`)),
      catchError(this.handleError<any>('updateMeal'))
    );
  }

    /** POST: add a new meal to the server */
  addMeal(meal: Meal): Observable<Meal> {
    return this.http.post<Meal>(this.mealsUrl, meal, this.httpOptions).pipe(
      tap((newMeal: Meal) => this.log(`added meal w/ id=${newMeal.id}`)),
      catchError(this.handleError<Meal>('addMeal'))
    );
  }

  deleteMeal(id: Number): Observable<Meal> {
    const url = `${this.mealsUrl}/${id}`;

    return this.http.delete<Meal>(url, this.httpOptions).pipe(
      tap(_ => this.log(`deleted meal id=${id}`)),
      catchError(this.handleError<Meal>('deleteMeal'))
    );
  }

  /* GET meals whose name contains search term */
  searchMeals(term: string): Observable<Meal[]> {
    if(!term.trim()) {
      // if not search term, return empty hero array
      return of([]);
    }
    return this.http.get<Meal[]>(`${this.mealsUrl}/?name=${term}`).pipe(
      tap(x => x.length ?
        this.log(`found meals matching "${term}"`) :
        this.log(`no meals matching "${term}"`)),
      catchError(this.handleError<Meal[]>('searchMeals', []))
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {

      // TODO: send the error to remote logging infrastructure
      console.error(error); // log to console instead

      // TODO: better job of transforming error for user consumption
      this.log(`${operation} failed: ${error.message}`);

      // Let the app keep running by returning an empty result.
      return of(result as T);
    };
  }

  //Notice that you keep injecting the MessageService but since you'll call it so frequently, wrap it in a private log() method:
  /** Log a mealService message with the MessageService */
  private log(message: string) {
    this.messageService.add(`MealService: ${message}`);
  }

  // service-in-service scenario, we're injecting MessageService into the mealService
  constructor(
    private http: HttpClient,
    private messageService: MessageService) { }
}
