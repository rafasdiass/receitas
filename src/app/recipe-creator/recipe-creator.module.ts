import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // Importar ReactiveFormsModule aqui

import { IonicModule } from '@ionic/angular';

import { RecipeCreatorPageRoutingModule } from './recipe-creator-routing.module';

import { RecipeCreatorPage } from './recipe-creator.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,  // Adicionar ReactiveFormsModule aqui
    IonicModule,
    RecipeCreatorPageRoutingModule
  ],
  declarations: [RecipeCreatorPage]
})
export class RecipeCreatorPageModule {}
