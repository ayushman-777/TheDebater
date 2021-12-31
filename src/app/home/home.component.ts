import {Component, OnInit} from '@angular/core';
import {SubtopicService} from '../shared/services/subtopic.service';
import {Router} from "@angular/router";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit {
  sideBarOpen = true;
  value = 'Recently Added';
  menuList = [
    {id: 'home', icon: 'home', title: 'Recently Added'},
    {id: 'world', icon: 'dashboard', title: 'World'},
    {id: 'localnews', icon: '', title: 'Local News'},
    {id: 'technology', icon: '', title: 'Technology'},
    {id: 'busineess', icon: '', title: 'Business'},
    {id: 'health', icon: '', title: 'Health'},
    {id: 'addsubtopic', icon: '', title: 'Add Sub-topic'},
  ];
  topics = [
    'World',
    'Local News',
    'Technology',
    'Business',
    'Health'
  ]
  subtopic: any;
  allSubtopics: any;

  constructor(public router: Router, private subtopicService: SubtopicService) {
  }

  ngOnInit(): void {
    this.allSubtopics = this.subtopicService.getAllSubtopics();
    this.router.navigate(['/home']);
  }

  sideBarToggle() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  menuSelected(menu: any) {
    this.value = menu.title;
    if (this.value != 'Add Sub-topic') {
      this.allSubtopics.subscribe((list: any) => {
        this.subtopic = list.filter((ele: any) => ele.topicName === this.topics.indexOf(this.value));
      });
    }
    this.router.navigateByUrl(menu.id);
  }

  openTimeline() {
    this.value = '';
    this.subtopic = null;
  }

  getTopicName(topicName: any) {
    if (topicName == 0)
      return 'World';
    if (topicName == 1)
      return 'Local News';
    if (topicName == 2)
      return 'Technology';
    if (topicName == 3)
      return 'Business';
    else
      return 'Health';
  }
}
