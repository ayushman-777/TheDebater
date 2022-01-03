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
    {id: 'home', icon: 'travel_explore', title: 'Recently Added'},
    {id: 'world', icon: 'public', title: 'World'},
    {id: 'india', icon: 'flag', title: 'India'},
    {id: 'technology', icon: 'memory', title: 'Technology'},
    {id: 'business', icon: 'business', title: 'Business'},
    {id: 'health', icon: 'health_and_safety', title: 'Health'},
    {id: 'science', icon: 'science', title: 'Science'},
    {id: 'sports', icon: 'pool', title: 'Sports'},
    {id: 'entertainment', icon: 'local_movies', title: 'Entertainment'},
    {id: 'addarticle', icon: 'add_box', title: 'Add An Article'}
  ];
  topics = [
    'World',
    'India',
    'Technology',
    'Business',
    'Health',
    'Science',
    'Sports',
    'Entertainment'
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
      return 'India';
    if (topicName == 2)
      return 'Technology';
    if (topicName == 3)
      return 'Business';
    else
      return 'Health';
  }
}
