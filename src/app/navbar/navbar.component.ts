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
      icon: 'home'
    },
    {
      title: 'Receitas',
      url: '/recipes-list',
      icon: 'list'
    },
    {
      title: 'Usuário',
      url: '/user-profile',
      icon: 'person'
    },
    {
      title: 'Ingredientes',
      url: '/product',
      icon: 'leaf'
    },
    {
      title: 'Produtos',
      url: '/ingredient',
      icon: 'cart'
    },
  ];

  constructor() {}

  ngOnInit() {}
}
