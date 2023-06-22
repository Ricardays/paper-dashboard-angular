import { Component, OnInit } from '@angular/core';
import {TableData} from "../../shared/interfaces/tableData";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../environments/environment";
import {catchError, Observable, take} from "rxjs";
import {Router} from "@angular/router";

@Component({
  selector: 'app-medic',
  templateUrl: './medic.component.html',
  styleUrls: ['./medic.component.scss']
})
export class MedicComponent implements OnInit {

  protected headers: HttpHeaders;
  medics : Array<any>;

  env = environment;


  constructor(protected httpClient: HttpClient,
              private router: Router,) { }

  ngOnInit(): void {

    this.load();
  }

  load(): void {
    this.httpClient.get(this.env.urlApi + '/medic', {headers: this.headers})
      .pipe(
        take(1),
        catchError(err => this.handleErr(err))
      ).subscribe(
        (resp) => {
          console.log(resp);
          this.medics = resp;
        }
      )
  }

  protected handleErr(err): Observable<any> {
    console.error('API Error:', err);
    throw err;
  }

  redirectAdd(){
    this.router.navigate(['/medic/add'])
  }

}
