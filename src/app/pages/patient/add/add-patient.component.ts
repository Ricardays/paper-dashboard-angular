import { Component, OnInit } from '@angular/core';
import {environment} from "../../../../environments/environment";
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {ToastrService} from "ngx-toastr";
import {Router} from "@angular/router";
import {catchError, Observable, take} from "rxjs";

@Component({
  selector: 'app-add-patient',
  templateUrl: './add-patient.component.html',
  styleUrls: ['./add-patient.component.scss']
})
export class AddPatientComponent implements OnInit {

  env = environment;
  protected headers: HttpHeaders;
  submitted: boolean = false;

  patientForm = new FormGroup({
    name: new FormControl(null, [Validators.required]),
    lastName: new FormControl(null, [Validators.required]),
    birthdate: new FormControl(null, [Validators.required]),
    phone: new FormControl(null, [Validators.required]),
    email: new FormControl(null, [Validators.required]),
    address: new FormControl(null ),
    observations: new FormControl(null ),
  });

  constructor(protected httpClient: HttpClient,
              private toastr: ToastrService,
              private router: Router) { }

  ngOnInit(): void {
  }



  submit():void {
    this.submitted = true;

    // Check if form is valid
    if (this.patientForm.valid) {
      if (true) {
        // Case new
        console.log(this.patientForm.value)
        let body = {
          nombre: this.patientForm.value.name,
          apellido: this.patientForm.value.lastName,
          fechaNacimiento: this.patientForm.value.birthdate,
          telefono: this.patientForm.value.phone,
          correo: this.patientForm.value.email,
          direccion: this.patientForm.value.address,
          observaciones: this.patientForm.value.observations,
        }
        console.log(body);
        this.httpClient.post(this.env.urlApi + '/patient', body, {headers: this.headers})
          .pipe(
            take(1),
            catchError(err => this.handleErr(err))
          ).subscribe((resp) => {
          console.log(resp);
          this.toastr.success(
            '<span data-notify="icon" class="nc-icon nc-satisfied"></span><span data-notify="message">Paciente creado satisfactoriamente</span>',
            "",
            {
              timeOut: 4000,
              closeButton: true,
              enableHtml: true,
              toastClass: "alert alert-success alert-with-icon",
              positionClass: "toast-top-right"
            }
          );
          this.router.navigate(['/patient']);

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

  redirectList(){
    this.router.navigate(['/patient'])
  }

}
