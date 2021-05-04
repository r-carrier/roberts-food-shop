import { NgModule } from '@angular/core';
//gives routing functionality
import { RouterModule, Routes } from '@angular/router';
//somewhere to go to
import { MealsComponent } from './meals/meals.component';
import { MealDetailComponent } from "./meal-detail/meal-detail.component";
import { DashboardComponent } from './dashboard/dashboard.component';

const routes: Routes = [
  { path: '', redirectTo: '/dashboard', pathMatch: 'full'},
  // : indicates that :id is a placeholder for a specific hero id
  { path: 'detail/:id', component: MealDetailComponent },
  { path: 'dashboard', component: DashboardComponent },
  { path: 'meals', component: MealsComponent }
];

@NgModule({
  // forRoot because it's configured at application's root level. forRoot() supplies service providers and directives
  // needed for routing
  imports: [RouterModule.forRoot(routes)],
  //making available throughout application
  exports: [RouterModule]
})
export class AppRoutingModule { }
