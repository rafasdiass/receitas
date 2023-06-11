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
      title: 'Usuario',
      url: '/user-profile',
      icon: 'person'
    },
    // ...
  ];

  constructor() {}

  ngOnInit() {}
}
