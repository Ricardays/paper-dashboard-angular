import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';
import { ToastrModule } from "ngx-toastr";

import { SidebarModule } from './sidebar/sidebar.module';
import { FooterModule } from './shared/footer/footer.module';
import { NavbarModule} from './shared/navbar/navbar.module';
import { FixedPluginModule} from './shared/fixedplugin/fixedplugin.module';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routing';

import { AdminLayoutComponent } from './layouts/admin-layout/admin-layout.component';
import {HttpClientModule} from "@angular/common/http";
import {DatePipe} from "@angular/common";
import { AddAppointmentComponent } from './pages/appointment/add/add-appointment.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { NgSelectModule } from '@ng-select/ng-select';
import { AddMedicComponent } from './pages/medic/add/add-medic.component';
import { AddPatientComponent } from './pages/patient/add/add-patient.component';



@NgModule({
  declarations: [
    AppComponent,
    AdminLayoutComponent,
  ],
  imports: [
    BrowserAnimationsModule,
    RouterModule.forRoot(AppRoutes,{
      useHash: true
    }),
    SidebarModule,
    NavbarModule,
    ToastrModule.forRoot(),
    FooterModule,
    FixedPluginModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,
  ],
  providers: [DatePipe,],
  bootstrap: [AppComponent]
})
export class AppModule { }
