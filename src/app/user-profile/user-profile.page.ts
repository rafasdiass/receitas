import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {

  user = {
    name: '',
    whatsapp: ''
  };

  constructor(private recipeService: RecipeService) { }

  ngOnInit() {
  }

  saveProfile() {
    this.recipeService.createAuthor({
      name: this.user.name,
      whatsapp: this.user.whatsapp,
    }).subscribe(
      (response) => {
        console.log(response);
        alert('Profile saved successfully');
      },
      (error) => {
        console.error(error);
        alert('An error occurred while saving the profile');
      }
    );
  }
}
