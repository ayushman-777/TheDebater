import {NgModule} from "@angular/core";
import {AddSubTopicComponent} from "./add-sub-topic.component";
import {SharedModule} from "../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCardModule} from "@angular/material/card";
import {NgbDatepickerModule} from "@ng-bootstrap/ng-bootstrap";
import {AddSubTopicRoutingModule} from "./add-sub-topic-routing.module";

@NgModule({
  declarations: [AddSubTopicComponent],
  imports: [
    SharedModule,
    AddSubTopicRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    MatFormFieldModule,
    MatCardModule,
    NgbDatepickerModule
  ],
  providers: []
})
export class AddSubTopicModule {
}
