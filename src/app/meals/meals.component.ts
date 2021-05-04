// this component will control the child meal-detail component by sending it a new meal to display
// whenever the user selects it from a list

import { Component, OnInit } from '@angular/core';

import { Meal } from '../meal';
import { MealService } from '../meal.service';
import { MessageService } from '../message.service';

@Component({
  // CSS element selector, matches name of HTML element that identifies component
  selector: 'app-meals',
  templateUrl: './meals.component.html',
  styleUrls: ['./meals.component.css']
})

// always export so you can import somewhere else
export class MealsComponent implements OnInit {
  meals: Meal[] = [];

  constructor(private mealService: MealService) { }

  // lifecycle hook, Angular calls this shortly after creating a component. Good place for initialization logic.
  ngOnInit(): void {
    this.getMeals();
  }

  add(name: string): void {
    name = name.trim();
    if (!name) { return; }
    this.mealService.addMeal({ name } as Meal)
      .subscribe(meal => {
        this.meals.push(meal);
      });
  }

  delete(meal: Meal): void {
    this.meals = this.meals.filter(m => m !== meal);
    this.mealService.deleteMeal(meal.id).subscribe();
  }


  getMeals(): void {
    this.mealService.getMeals()
        // waits for Observable to emit the array of meales--which could happen now or several minutes from now
        .subscribe(meals => this.meals = meals);
  }



}
