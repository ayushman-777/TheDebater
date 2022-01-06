import {Component, OnInit, Input} from "@angular/core";

@Component({
  selector: 'app-card-sub-topic',
  templateUrl: 'card-sub-topic.component.html'
})
export class CardSubTopicComponent implements OnInit {
  @Input() heading: any;
  constructor() { }

  ngOnInit(): void {
  }
}
