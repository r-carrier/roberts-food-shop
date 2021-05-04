import { Component, OnInit } from '@angular/core';
import { Meal } from '../meal';
import { MealService } from '../meal.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: [ './dashboard.component.css' ]
})
export class DashboardComponent implements OnInit {
  meals: Meal[] = [];

  constructor(private mealService: MealService) { }

  ngOnInit() {
    this.getMeals();
  }

  getMeals(): void {
    this.mealService.getMeals()
      .subscribe(meals => this.meals = meals.slice(1, 4));
  }
}
