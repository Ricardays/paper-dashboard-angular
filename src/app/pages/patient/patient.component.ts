import { Component, OnInit } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError, Observable, take} from "rxjs";

@Component({
  selector: 'app-patient',
  templateUrl: './patient.component.html',
  styleUrls: ['./patient.component.scss']
})
export class PatientComponent implements OnInit {

  protected headers: HttpHeaders;
  patients : Array<any>;

  env = environment;


  constructor(protected httpClient: HttpClient,) { }

  ngOnInit(): void {

    this.load();
  }

  load(): void {
    this.httpClient.get(this.env.urlApi + '/patient', {headers: this.headers})
      .pipe(
        take(1),
        catchError(err => this.handleErr(err))
      ).subscribe(
      (resp) => {
        console.log(resp);
        this.patients = resp;
      }
    )
  }

  protected handleErr(err): Observable<any> {
    console.error('API Error:', err);
    throw err;
  }

}
