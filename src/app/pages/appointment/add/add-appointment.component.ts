import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {catchError, Observable, take} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../environments/environment";


@Component({
  selector: 'app-add-appointment',
  templateUrl: './add-appointment.component.html',
  styleUrls: ['./add-appointment.component.scss']
})
export class AddAppointmentComponent implements OnInit {

  env = environment;
  protected headers: HttpHeaders;
  submitted: boolean = false;
  patients: Array<any> = [];
  medics: Array<any> = [];
  selectedMedic = {};
  selectedPatient = {};


  appointmentForm = new FormGroup({
    date: new FormControl(null, [Validators.required]),
    hour: new FormControl(null, [Validators.required]),
    patient: new FormControl(''),
    medic: new FormControl(''),
  });

  constructor(protected httpClient: HttpClient,) { }

  ngOnInit(): void {

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

  submit():void {
    this.submitted = true;

    // Check if form is valid
    if (this.appointmentForm.valid) {
      if (true) {
        // Case new
        console.log(this.appointmentForm.value)
        let body = {
          medic: this.appointmentForm.value.medic,
          patient: this.appointmentForm.value.patient,
          date: this.appointmentForm.value.date + 'T' + this.appointmentForm.value.hour + ':00',
        }
        console.log(body);
        this.httpClient.post(this.env.urlApi + '/appointment', body, {headers: this.headers})
          .pipe(
            take(1),
            catchError(err => this.handleErr(err))
          ).subscribe((resp) => {
            console.log(resp);
        });

      } else {
        // Edit

        // let value = this.netplanForm.value;
        //
        // value.bwUp = value.bwUp.toString() + 'mbit';
        // value.bwDwn = value.bwDwn.toString() + 'mbit';
        // value.ceilUp = value.ceilUp.toString() + 'mbit';
        // value.ceilDwn = value.ceilDwn.toString() + 'mbit';
        //
        // this.netplanService.update(value).subscribe((res) => {
        //   // Update list
        //   this.list();
        //
        //   // Close aside
        //   this.actionAside();
        // });
      }
    }

  }

  protected handleErr(err): Observable<any> {
    console.error('API Error:', err);
    throw err;
  }

  changeMedic(e: any) {
    this.appointmentForm.get('medic')?.setValue(e, {
      onlySelf: true,
    });

    this.selectedMedic = e;
  }

  changePatient(e: any) {
    this.appointmentForm.get('patient')?.setValue(e, {
      onlySelf: true,
    });

    this.selectedPatient = e;
  }

}
