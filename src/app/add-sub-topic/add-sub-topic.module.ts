import {NgModule} from "@angular/core";
import {AddSubTopicComponent} from "./add-sub-topic.component";
import {SharedModule} from "../shared/shared.module";
import {ReactiveFormsModule} from "@angular/forms";
import {NgSelectModule} from "@ng-select/ng-select";
import {MatFormFieldModule} from "@angular/material/form-field";
import {MatCardModule} from "@angular/material/card";
import {AddSubTopicRoutingModule} from "./add-sub-topic-routing.module";
import {NgpImagePickerModule} from "ngp-image-picker";

@NgModule({
  declarations: [AddSubTopicComponent],
  imports: [
    SharedModule,
    AddSubTopicRoutingModule,
    ReactiveFormsModule,
    NgSelectModule,
    MatFormFieldModule,
    MatCardModule,
    NgpImagePickerModule
  ],
  providers: []
})
export class AddSubTopicModule {
}
