import { Component, OnInit } from '@angular/core';
import { RecipeService } from '../services/recipe.service';
import { UserProfileService } from '../services/userprofile.service';

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

  constructor(
    private recipeService: RecipeService,
    private userProfileService: UserProfileService
  ) { }

  ngOnInit() {
  }

  saveProfile() {
    this.userProfileService.createAuthor({
      name: this.user.name,
      whatsapp: this.user.whatsapp,
    }).subscribe(
      (response: any) => {
        console.log(response);
        this.userProfileService.setAuthorId(response.id); // A suposição aqui é que a resposta tem uma propriedade 'id' que é o author_id.
        alert('Profile saved successfully');
      },
      (error) => {
        console.error(error);
        alert('An error occurred while saving the profile');
      }
    );
  }
}
