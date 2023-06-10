import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // import ReactiveFormsModule here

import { IonicModule } from '@ionic/angular';

import { RecipeEditorPageRoutingModule } from './recipe-editor-routing.module';

import { RecipeEditorPage } from './recipe-editor.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RecipeEditorPageRoutingModule
  ],
  declarations: [RecipeEditorPage]
})
export class RecipeEditorPageModule {}
