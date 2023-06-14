import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { IngredientPageRoutingModule } from './ingredient-routing.module';

import { IngredientPage } from './ingredient.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    IngredientPageRoutingModule,
  ],
  declarations: [IngredientPage],
})
export class IngredientPageModule {}
