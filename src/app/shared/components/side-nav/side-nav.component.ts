import {Component, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {Router} from "@angular/router";

@Component({
  selector: 'app-side-nav',
  templateUrl: './side-nav.component.html',
  styleUrls: []
})
export class SideNavComponent implements OnInit {

  @Input() menuList: any;

  @Output() onMenuSelected = new EventEmitter();
  constructor(public router: Router) { }

  ngOnInit(): void {
  }

}
