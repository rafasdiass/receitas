import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-user-profile',
  templateUrl: './user-profile.page.html',
  styleUrls: ['./user-profile.page.scss'],
})
export class UserProfilePage implements OnInit {
  user = {
    name: '',
    email: '',
    phone: ''
  }

  constructor() { }

  ngOnInit() {
    // Carregar dados do usuário aqui
    // Normalmente, você fará uma chamada de API ou buscará em um serviço
  }

  saveProfile() {
    // Salve os detalhes do perfil aqui
    // Normalmente, você fará uma chamada de API ou salvará em um serviço
    console.log(this.user);
  }
}
