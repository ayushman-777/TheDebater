import {NgModule} from '@angular/core';
import {CommonModule, DatePipe, CurrencyPipe} from '@angular/common';
import {HttpClientModule} from '@angular/common/http';
import {ReactiveFormsModule, FormsModule} from '@angular/forms';
import {AngularFireModule} from '@angular/fire';
import {AngularFireAuthModule} from '@angular/fire/auth';
import {AngularFirestoreModule} from '@angular/fire/firestore';
import {AngularFireStorageModule} from '@angular/fire/storage';
import {AngularFireFunctionsModule} from '@angular/fire/functions';

import {ModalModule} from 'ngx-bootstrap/modal';
import {BsDatepickerModule} from 'ngx-bootstrap/datepicker';
import {TimepickerModule} from 'ngx-bootstrap/timepicker';
import {TooltipModule} from 'ngx-bootstrap/tooltip';

import {firebaseConfig} from 'src/environments/environment';

import {NgSelectModule} from '@ng-select/ng-select';
import {ToastMessageService} from "./services";
import {MatSnackBarModule} from "@angular/material/snack-bar";
import {MatSliderModule} from "@angular/material/slider";
import {MatSidenavModule} from "@angular/material/sidenav";
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatMenuModule} from "@angular/material/menu";
import {MatIconModule} from "@angular/material/icon";
import {MatDividerModule} from "@angular/material/divider";
import {MatListModule} from "@angular/material/list";
import {SideNavComponent} from "./components/side-nav/side-nav.component";
import {HeaderComponent} from "./components/header/header.component";
import {MatButtonModule} from "@angular/material/button";
import {CardSubTopicComponent} from "./components/card-sub-topic/card-sub-topic.component";
import {FileUploadComponent} from "./components/file-upload";
import {StorageService} from "./services/storage.service";
import {AuthService} from "./services/auth.service";
import {ProfileCardComponent} from "./components/profile-card/profile-card.component";
import {MatTooltipModule} from "@angular/material/tooltip";

@NgModule({
  entryComponents: [],
  declarations: [
    SideNavComponent,
    HeaderComponent,
    CardSubTopicComponent,
    FileUploadComponent,
    ProfileCardComponent
  ],
    imports: [
        AngularFireModule.initializeApp(firebaseConfig),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AngularFireStorageModule,
        AngularFireFunctionsModule,
        CommonModule,
        MatSnackBarModule,
        MatSliderModule,
        FormsModule,
        MatSidenavModule,
        MatToolbarModule,
        MatMenuModule,
        MatIconModule,
        MatDividerModule,
        MatListModule,
        HttpClientModule,
        ReactiveFormsModule,
        ModalModule.forRoot(),
        BsDatepickerModule.forRoot(),
        TimepickerModule.forRoot(),
        TooltipModule.forRoot(),
        NgSelectModule,
        MatButtonModule,
        MatTooltipModule
    ],
  exports: [
    SideNavComponent,
    CardSubTopicComponent,
    HeaderComponent,
    FormsModule,
    FileUploadComponent,
    CommonModule,
    MatSidenavModule,
    MatToolbarModule,
    MatMenuModule,
    MatIconModule,
    MatDividerModule,
    MatListModule
  ],
  providers: [
    AuthService,
    DatePipe,
    CurrencyPipe,
    ToastMessageService,
    StorageService
  ]
})
export class SharedModule {
}
