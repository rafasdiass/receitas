import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'recipes-list',
    pathMatch: 'full'
  },
  {
    path: 'recipes-list',
    loadChildren: () => import('./recipes-list/recipes-list.module').then( m => m.RecipesListPageModule)
  },
  {
    path: 'recipe-details/:id',
    loadChildren: () => import('./recipe-details/recipe-details.module').then( m => m.RecipeDetailsPageModule)
  },
  {
    path: 'recipe-editor',
    loadChildren: () => import('./recipe-editor/recipe-editor.module').then( m => m.RecipeEditorPageModule)
  },
  {
    path: 'recipe-editor/:id',
    loadChildren: () => import('./recipe-editor/recipe-editor.module').then( m => m.RecipeEditorPageModule)
  },
  {
    path: 'user-profile',
    loadChildren: () => import('./user-profile/user-profile.module').then( m => m.UserProfilePageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
