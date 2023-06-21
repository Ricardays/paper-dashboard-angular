import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError, Observable, take} from "rxjs";

@Component({
  selector: 'app-appointment',
  templateUrl: './appointment.component.html',
  styleUrls: ['./appointment.component.scss']
})
export class AppointmentComponent implements OnInit {

  protected headers: HttpHeaders;
  appointments : Array<any>;

  env = environment;


  constructor(protected httpClient: HttpClient,) { }

  ngOnInit(): void {

    this.load();
  }

  load(): void {
    this.httpClient.get(this.env.urlApi + '/appointment', {headers: this.headers})
      .pipe(
        take(1),
        catchError(err => this.handleErr(err))
      ).subscribe(
      (resp) => {
        console.log(resp);
        this.appointments = resp;
      }
    )
  }

  protected handleErr(err): Observable<any> {
    console.error('API Error:', err);
    throw err;
  }


}
