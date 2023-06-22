import { Component, OnInit } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";


export interface RouteInfo {
    path: string;
    title: string;
    icon: string;
    class: string;
}

export const ROUTES: RouteInfo[] = [
    { path: '/dashboard',     title: 'Dashboard',         icon:'nc-chart-pie-36', class: '' },
    { path: '/appointment',   title: 'Citas',             icon:'nc-bookmark-2',   class: '' },
    { path: '/appointment/add',   title: 'Cita',             icon:'nc-bookmark-2',   class: 'hidden' },
    { path: '/medic',         title: 'Medicos',           icon:'nc-badge',        class: '' },
    { path: '/medic/add',         title: 'Medico',           icon:'nc-badge',        class: 'hidden' },
    { path: '/patient',       title: 'Pacientes',         icon:'nc-single-02',    class: '' },
    { path: '/patient/add',       title: 'Pacientes',         icon:'nc-single-02',    class: 'hidden' },
];

@Component({
    moduleId: module.id,
    selector: 'sidebar-cmp',
    templateUrl: 'sidebar.component.html',
})

export class SidebarComponent implements OnInit {
    public menuItems: any[];
    ngOnInit() {
        this.menuItems = ROUTES.filter(menuItem => menuItem);
    }

    constructor(private router: Router,) { }

    redirectDashboard(){
      this.router.navigate(['/dashboard'])
    }
}
