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
  allSubtopicsSubscription: any;
  allSubtopics: any;

  constructor(public router: Router, private subtopicService: SubtopicService) {
  }

  ngOnInit(): void {
    this.allSubtopicsSubscription = this.subtopicService.getAllSubtopics();
    this.router.navigate(['/home']);
    if (this.value == 'Recently Added') {
      this.allSubtopicsSubscription.subscribe((list: any) => {
        this.allSubtopics = list;
        this.subtopic = list.slice(0, 10);
      })
    }
  }

  sideBarToggle() {
    this.sideBarOpen = !this.sideBarOpen;
  }

  menuSelected(menu: any) {
    this.value = menu.title;
    if (this.value == 'Recently Added') {
      this.subtopic = this.allSubtopics.slice(0, 10);
    } else if (this.value != 'Add Sub-topic') {
        this.subtopic = this.allSubtopics.filter((ele: any) => ele.topicName.includes(this.topics.indexOf(this.value)));
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
