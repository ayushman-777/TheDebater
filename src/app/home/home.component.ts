import { Component, OnInit } from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {

  sideBarOpen = true;
  value = 'Recently Added';
  menuList = [
    { id: 'home', icon: 'home', title: 'Recently Added' },
    { id: 'world', icon: 'dashboard', title: 'World' },
    { id: 'localnews', icon: '', title: 'Local News' },
    { id: 'technology', icon: '', title: 'Technology' },
    { id: 'busineess', icon: '', title: 'Business' },
    { id: 'health', icon: '', title: 'Health' },
    { id: 'addsubtopic', icon: '', title: 'Add Sub-topic' },
  ];

  constructor(public router: Router) {
  }

  ngOnInit(): void {
  }

  sideBarToggle() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  menuSelected(menu: any) {
    this.value = menu.title;
    this.router.navigateByUrl(menu.id);
  }

}
