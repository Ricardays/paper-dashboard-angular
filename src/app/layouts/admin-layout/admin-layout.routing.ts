import { Routes } from '@angular/router';

import { DashboardComponent } from '../../pages/dashboard/dashboard.component';
import { UserComponent } from '../../pages/user/user.component';
import { TableComponent } from '../../pages/table/table.component';
import { TypographyComponent } from '../../pages/typography/typography.component';
import { IconsComponent } from '../../pages/icons/icons.component';
import { NotificationsComponent } from '../../pages/notifications/notifications.component';
import { UpgradeComponent } from '../../pages/upgrade/upgrade.component';
import {MedicComponent} from "../../pages/medic/medic.component";
import {PatientComponent} from "../../pages/patient/patient.component";
import {AppointmentComponent} from "../../pages/appointment/appointment.component";
import {AddAppointmentComponent} from "../../pages/appointment/add/add-appointment.component";
import {AddMedicComponent} from "../../pages/medic/add/add-medic.component";
import {AddPatientComponent} from "../../pages/patient/add/add-patient.component";

export const AdminLayoutRoutes: Routes = [
    { path: 'dashboard',      component: DashboardComponent },
    { path: 'appointment',    component: AppointmentComponent },
    { path: 'appointment/add',    component: AddAppointmentComponent },
    { path: 'medic',          component: MedicComponent },
    { path: 'medic/add',          component: AddMedicComponent },
    { path: 'patient',        component: PatientComponent },
    { path: 'patient/add',        component: AddPatientComponent },
    { path: 'user',           component: UserComponent },
    { path: 'table',          component: TableComponent },
    { path: 'typography',     component: TypographyComponent },
    { path: 'icons',          component: IconsComponent },
    { path: 'notifications',  component: NotificationsComponent },
    { path: 'upgrade',        component: UpgradeComponent }
];
