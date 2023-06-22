import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import {catchError, Observable, take} from "rxjs";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {environment} from "../../../../environments/environment";
import {ToastrService} from "ngx-toastr";
import {ActivatedRoute, Router} from "@angular/router";


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
  statuses: Array<any> = [
    'Pendiente',
    'Confirmado',
    'Completado',
    'Cancelado'
  ]
  selectedMedic = {};
  selectedPatient = {};
  selectedStatus = {};
  selectedAppointment = {};

  selectedId;


  appointmentForm = new FormGroup({
    date: new FormControl(null, [Validators.required]),
    hour: new FormControl(null, [Validators.required]),
    patient: new FormControl(''),
    medic: new FormControl(''),
    status: new FormControl(''),
  });

  constructor(protected httpClient: HttpClient,
              private toastr: ToastrService,
              private router: Router,
              private route: ActivatedRoute,) { }

  ngOnInit(): void {

    this.route.queryParams.subscribe(params => {

      this.selectedId = params.id;
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
      if(this.selectedId){
        this.httpClient.get(this.env.urlApi + '/appointment/findOne?id=' + this.selectedId, {headers: this.headers})
          .pipe(
            take(1),
            catchError(err => this.handleErr(err))
          ).subscribe(
          (resp) => {
            console.log(resp);
            this.selectedAppointment = resp;
            this.setValuesForm(resp);
          }
        )
      }
    })
  }

  submit():void {
    this.submitted = true;

    // Check if form is valid
    if (this.appointmentForm.valid) {
      if (!this.selectedId) {
        // Case new
        console.log(this.appointmentForm.value)
        let body = {
          medico: this.appointmentForm.value.medic,
          paciente: this.appointmentForm.value.patient,
          fechaCita: this.appointmentForm.value.date + 'T' + this.appointmentForm.value.hour + ':00',
          estatus: this.appointmentForm.value.status,
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

        console.log(this.appointmentForm.value)
        let body = {
          idCita: this.selectedId,
          medico: this.appointmentForm.value.medic,
          paciente: this.appointmentForm.value.patient,
          fechaCita: this.appointmentForm.value.date + 'T' + this.appointmentForm.value.hour + ':00',
          estatus: this.appointmentForm.value.status,
        }

        this.httpClient.post(this.env.urlApi + '/appointment', body, {headers: this.headers})
          .pipe(
            take(1),
            catchError(err => this.handleErr(err))
          ).subscribe((resp) => {
          console.log(resp);
          this.toastr.success(
            '<span data-notify="icon" class="nc-icon nc-satisfied"></span><span data-notify="message">Cita editada Satisfactoriamente</span>',
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

  changeStatus(e: any) {
    this.appointmentForm.get('status')?.setValue(e, {
      onlySelf: true,
    });

    this.selectedStatus = e;
  }

  redirectList(){
    this.router.navigate(['/appointment'])
  }

  setValuesForm(resp: any) {
    this.appointmentForm.get('date')?.setValue(resp.fechaCita.substring(0,resp.fechaCita.indexOf('T')));
    this.appointmentForm.get('hour')?.setValue(resp.fechaCita.substring(resp.fechaCita.indexOf('T')+1,resp.fechaCita.length-3));
    this.appointmentForm.get('patient')?.setValue(this.patients.find(x => x.idPaciente == resp.paciente.idPaciente));
    this.appointmentForm.get('medic')?.setValue(this.medics.find(x=> x.idMedico == resp.medico.idMedico));
    this.appointmentForm.get('status')?.setValue(resp.estatus);

  }

}
