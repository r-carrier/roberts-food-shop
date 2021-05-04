import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Location } from '@angular/common';

import { Meal } from '../meal';
import { MealService } from '../meal.service';



@Component({
  selector: 'app-meal-detail',
  templateUrl: './meal-detail.component.html',
  styleUrls: ['./meal-detail.component.css']
})
export class MealDetailComponent implements OnInit {

  // add a meal property, preceded by the @Input() decorator
  // The meal property must be an Input property, annotated with the @Input() decorator,
  // because the external HeroesComponent will bind to it...
  @Input() meal?: Meal;
  //this component only receives a hero object through its hero property and displays it

  constructor(
    // inject ActivatedRoute, MealService and Location services into the constructor, saving their values in private fields
    // holds info about the route to this instance of HeroDetailComponent
    // this component is interested in route's parameters extracted from URL, the "id" parameter of hero to deplay
    private route: ActivatedRoute,
    // gets meal data from remote server and this component will use it to get meal to display
    private mealService: MealService,
    // angular service for interacting with browser, we'll use it later to navigate to view
    private location: Location
  ) { }

  ngOnInit(): void {
    this.getMeal();
  }

  getMeal(): void {
    const id = +this.route.snapshot.paramMap.get('id');
    this.mealService.getMeal(id)
      .subscribe(meal => this.meal = meal);
  }

  goBack(): void {
    this.location.back();
  }

  save(): void {
  this.mealService.updateMeal(this.meal)
    .subscribe(() => this.goBack());
}

}
