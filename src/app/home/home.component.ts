import {Component, OnDestroy, OnInit} from '@angular/core';
import {SubtopicService} from '../shared/services/subtopic.service';
import {Router} from "@angular/router";
import {AuthService} from "../shared/services/auth.service";
import {BehaviorSubject, Subscription} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html'
})
export class HomeComponent implements OnInit, OnDestroy {
  sideBarOpen = true;
  value = 'Recently Added';

  subscriptions: Subscription[] = [];

  menuList = new BehaviorSubject<Array<any>>([
    {id: 'home', icon: 'travel_explore', title: 'Recently Added'},
    {id: 'world', icon: 'public', title: 'World'},
    {id: 'india', icon: 'flag', title: 'India'},
    {id: 'technology', icon: 'memory', title: 'Technology'},
    {id: 'business', icon: 'business', title: 'Business'},
    {id: 'health', icon: 'health_and_safety', title: 'Health'},
    {id: 'science', icon: 'science', title: 'Science'},
    {id: 'sports', icon: 'pool', title: 'Sports'},
    {id: 'entertainment', icon: 'local_movies', title: 'Entertainment'}
  ]);
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

  constructor(public router: Router, private subtopicService: SubtopicService, public auth: AuthService) { }

  ngOnInit(): void {
    this.router.navigate(['/home']);
    if (this.value == 'Recently Added') {
      this.subscriptions.push(this.subtopicService.getAllSubtopics().subscribe((list: any) => {
        this.allSubtopics = list;
        this.subtopic = list.slice(0, 10);
      }));
    }
    this.addAddArticle();
  }

  ngOnDestroy() {
    this.subscriptions.forEach(x => x.unsubscribe());
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

  openTimeline(id: string) {
    this.value = '';
    this.subtopic = null;
    this.router.navigate(['/timeline', id]);
  }

  private addAddArticle() {
    this.subscriptions.push(this.auth.user$.subscribe(user => {
      const temp = {id: 'addarticle', icon: 'add_box', title: 'Add An Article'};
      if (this.auth.canEdit(user))
        this.subscriptions.push(this.menuList.subscribe(list => {
          list.push(temp);
          return list;
        }));
    }));
  }
}
