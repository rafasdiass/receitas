import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { RecipeCreatorPage } from './recipe-creator.page';

const routes: Routes = [
  {
    path: '',
    component: RecipeCreatorPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class RecipeCreatorPageRoutingModule {}
