import {NgModule} from "@angular/core";
import {AddSubTopicComponent} from "./add-sub-topic.component";
import {SharedModule} from "../shared/shared.module";
import {AddSubTopicRoutingModule} from "./add-sub-topic-routing.module";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCardModule} from "@angular/material/card";
import {NgbDatepickerModule} from "@ng-bootstrap/ng-bootstrap";

@NgModule({
  declarations: [AddSubTopicComponent],
  imports: [
    SharedModule,
    AddSubTopicRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
    MatFormFieldModule,
    MatCardModule,
    NgbDatepickerModule
  ],
  providers: []
})
export class AddSubTopicModule {}
