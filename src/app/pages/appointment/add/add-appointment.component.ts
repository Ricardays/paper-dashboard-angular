import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {catchError, Observable, take} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";


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

  constructor(protected httpClient: HttpClient,
              private toastr: ToastrService,
              private router: Router) { }

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
          medico: this.appointmentForm.value.medic,
          paciente: this.appointmentForm.value.patient,
          fechaCita: this.appointmentForm.value.date + 'T' + this.appointmentForm.value.hour + ':00'
        }
        console.log(body);
        this.httpClient.post(this.env.urlApi + '/appointment', body, {headers: this.headers})
          .pipe(
            take(1),
            catchError(err => this.handleErr(err))
          ).subscribe((resp) => {
            console.log(resp);
            this.toastr.success(
              '<span data-notify="icon" class="nc-icon nc-satisfied"></span><span data-notify="message">Cita creada Satisfactoriamente</span>',
              "",
              {
                timeOut: 4000,
                closeButton: true,
                enableHtml: true,
                toastClass: "alert alert-success alert-with-icon",
                positionClass: "toast-top-right"
              }
            );
            this.router.navigate(['/appointment']);

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

  redirectList(){
    this.router.navigate(['/appointment'])
  }

}
