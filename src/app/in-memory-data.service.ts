import { Injectable } from '@angular/core';
import { InMemoryDbService } from 'angular-in-memory-web-api';
import { Meal } from './meal';

@Injectable({
  providedIn: 'root',
})
export class InMemoryDataService implements InMemoryDbService {
  createDb() {
    const meals = [
      { id: 11, name: 'Chicken Sandwich' },
      { id: 12, name: 'Avocado Toast' },
      { id: 13, name: 'Green Eggs & Ham' },
      { id: 14, name: 'Pizza' },
      { id: 15, name: 'Chicken Wings' }
    ];
    return {meals};
  }

  // Overrides the genId method to ensure that a meal always has an id.
  // If the meals array is empty,
  // the method below returns the initial number (11).
  // if the meals array is not empty, the method below returns the highest
  // meal id + 1.
  genId(meals: Meal[]): number {
    return meals.length > 0 ? Math.max(...meals.map(meal => meal.id)) + 1 : 6;
  }
}
