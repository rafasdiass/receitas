import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.scss'],
})
export class NavbarComponent implements OnInit {
  pages = [
    {
      title: 'Home',
      url: '/home',
      icon: 'home',
    },

    {
      title: 'Usuário',
      url: '/user-profile',
      icon: 'person',
    },
        {
      title: 'Ingredientes',
      url: '/ingredient',
      icon: 'cart',
    },
    {
      title: 'Produtos',
      url: '/product',
      icon: 'leaf',
    },
    {
      title: 'Receitas',
      url: '/recipes-list',
      icon: 'list',
    }
  ];

  constructor() {}

  ngOnInit() {}
}
